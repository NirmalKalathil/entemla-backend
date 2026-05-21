import { Injectable, OnModuleInit, Logger, Inject, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { Cron, CronExpression } from '@nestjs/schedule';
import { KnowledgeBase } from './kb.schema';
import { RagService } from './rag.service';
import mlaJsonData from '../data/mlas.json'; // 1. Renamed import to avoid naming conflicts

@Injectable()
export class KbService implements OnModuleInit {
  private readonly logger = new Logger(KbService.name);

  constructor(
    @InjectModel('KnowledgeBase')
    private readonly kbModel: Model<KnowledgeBase>,

    @Inject(forwardRef(() => RagService))
    private readonly ragService: RagService,
  ) {}

  async onModuleInit() {
    this.logger.log('🌐 KB Service initialized');
    await this.seedInitialKnowledge();
    
    // Delay initial crawl to let the app fully start
    setTimeout(() => this.crawlEntireWebsite('http://localhost:5173/'), 8000);
  }

  private async seedInitialKnowledge() {
    // 2. Kept your local procedural guide text chunks
    const proceduralData = [
      {
        content: `How to file a complaint in EnteMLA:\n1. Login to your EnteMLA account.\n2. Click on "New Grievance" or "File Complaint".\n3. Select the department and category.\n4. Fill in the complaint details with proper description.\n5. Upload supporting documents if any.\n6. Submit the complaint.\nYou will receive a tracking ID via SMS and email.`,
        source: 'procedure-file-complaint'
      },
      {
        content: `How to track complaint:\n1. Login to EnteMLA.\n2. Go to "My Complaints" section.\n3. Enter your tracking ID or select the complaint.\n4. View current status and updates.`,
        source: 'procedure-track-complaint'
      },
      {
        content: 'EnteMLA office hours are Monday to Saturday, 10 AM to 5 PM.',
        source: 'manual-hours',
      },
      {
        content: 'To file a complaint, log in and click the file complaint in home page. Fill in the details and submit.',
        source: 'manual-complaint',
      },
      {
        content: 'You can track your complaint status using the unique tracking ID sent after submission.',
        source: 'manual-tracking',
      },
    ];

    // 3. Merged the static JSON array elements together with the procedural items
    const combinedSeedData = [...proceduralData, ...mlaJsonData];

    this.logger.log(`🌱 Seeding ${combinedSeedData.length} records into KB...`);

    for (const item of combinedSeedData) {
      await this.kbModel.updateOne(
        { source: item.source },
        { $set: { ...item, updatedAt: new Date() } },
        { upsert: true }
      );

      await this.ragService.embedAndStore(item.content, item.source);
    }

    this.logger.log('✅ Initial seed knowledge loaded into KB and Vector Store');
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async scheduledCrawl() {
    this.logger.log('🔄 Starting scheduled daily crawl...');
    await this.crawlEntireWebsite('http://localhost:5173/');
  }

  async crawlEntireWebsite(baseUrl: string) {
    const targetPages = ['/', '/about', '/help', '/faq', '/contact', '/complaints', '/services'];

    this.logger.log(`🌐 Starting full website crawl for ${targetPages.length} pages...`);

    for (const page of targetPages) {
      const fullUrl = `${baseUrl}${page}`;
      try {
        const { data } = await axios.get(fullUrl, {
          headers: { 'User-Agent': 'Mozilla/5.0 (compatible; EnteMLA-Bot/1.0)' },
          timeout: 12000,
        });

        const $ = cheerio.load(data);

        // Remove unwanted elements
        $('script, style, nav, footer, header, aside, .sidebar, .menu, .nav').remove();

        // Better content extraction
        const textChunks: string[] = [];
        
        $('main, article, .content, #content, .post, section').each((_, section) => {
          $(section).find('h1, h2, h3, p, li, td, th').each((_, el) => {
            const text = $(el).text().trim().replace(/\s+/g, ' ');
            if (text.length > 40) textChunks.push(text);
          });
        });

        // Fallback: body text if no chunks found
        if (textChunks.length === 0) {
          const bodyText = $('body').text().replace(/\s+/g, ' ').trim();
          if (bodyText.length > 100) textChunks.push(bodyText);
        }

        let totalIngested = 0;
        for (const chunk of textChunks) {
          const result = await this.kbModel.updateOne(
            { content: chunk },
            {
              $set: {
                content: chunk,
                source: fullUrl,
                updatedAt: new Date(),
              },
            },
            { upsert: true }
          );

          if (result.upsertedCount > 0 || result.modifiedCount > 0) {
            await this.ragService.embedAndStore(chunk, fullUrl);
            totalIngested++;
          }
        }

        this.logger.log(`✅ Crawled ${page} → ${totalIngested} chunks ingested`);
      } catch (error) {
        this.logger.warn(`⚠️ Failed to crawl ${page}: ${(error as Error).message}`);
      }
    }

    const totalDocs = await this.kbModel.countDocuments();
    this.logger.log(`📊 Knowledge Base sync completed. Total documents: ${totalDocs}`);
  }

  async getRelevantContext(query: string, limit = 6): Promise<string> {
    if (!query?.trim()) return '';

    const keywords = query.toLowerCase().split(/\s+/).filter(w => w.length > 2);

    const results = await this.kbModel
      .find({
        $or: [
          { content: { $regex: keywords.join('|'), $options: 'i' } },
          { source: { $regex: keywords.join('|'), $options: 'i' } },
        ],
      })
      .sort({ updatedAt: -1 })
      .limit(limit)
      .lean();

    return results.map(doc => doc.content).join('\n\n---\n\n');
  }

  async clearKnowledgeBase() {
    await this.kbModel.deleteMany({});
    this.logger.warn('🗑️ Knowledge Base cleared');
  }

  async getStats() {
    return {
      totalDocuments: await this.kbModel.countDocuments(),
      lastUpdated: await this.kbModel.findOne().sort({ updatedAt: -1 }).select('updatedAt'),
    };
  }
}