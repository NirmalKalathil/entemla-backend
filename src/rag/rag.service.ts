import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../auth/schemas/user.schema'; // Adjust import path if needed
import axios from 'axios';
import * as cheerio from 'cheerio';

@Injectable()
export class RagService implements OnModuleInit {
  // Local runtime memory to store automatically crawled website pages
  private platformKnowledgeBase: Array<{ url: string; content: string }> = [];

  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async onModuleInit() {
    console.log('🌐 Starting automatic platform knowledge ingestion...');
    await this.crawlEntireWebsite('http://127.0.0.1:3000'); // Point this to your frontend or website root URL
  }

  // --- 1. AUTOMATIC SITE LEARNER (CRAWLER) ---
  async crawlEntireWebsite(baseUrl: string) {
    try {
      // Pages to look for and learn automatically
      const targetPages = ['/', '/about', '/help', '/faq', '/complaints/public'];
      this.platformKnowledgeBase = [];

      for (const page of targetPages) {
        const fullUrl = `${baseUrl}${page}`;
        try {
          const { data } = await axios.get(fullUrl, { timeout: 5000 });
          const $ = cheerio.load(data);

          // Strip away scripts, headers, and navbars to grab only the pure text content
          $('script, style, nav, footer, header').remove();
          const pureText = $('body').text().replace(/\s+/g, ' ').trim();

          if (pureText.length > 50) {
            this.platformKnowledgeBase.push({ url: page, content: pureText });
          }
        } catch (err) {
          // If a page isn't up yet or fails, it skips gracefully without crashing the app
          console.log(`⚠️ Could not automatically crawl page: ${page}`);
        }
      }

      console.log(`📚 Success! Automatically learned ${this.platformKnowledgeBase.length} sections from your website content.`);
    } catch (error: any) {
      console.error('❌ Failed to execute site-wide crawling:', error.message);
    }
  }

  // --- 2. THE SMART QUERY FILTER & ROUTER ---
  async askQuestion(question: string, lang: string) {
    const lowercaseQuery = question.toLowerCase();

    // CUSTOMER SUPPORT DATA FOR OUTSIDE QUESTIONS
    const customerSupportMessage = 
      "I'm sorry, but I can only assist with inquiries related to the EnteMLA platform, political representation, and local grievance reporting. " +
      "For general queries or platform assistance, please reach out to our Official Customer Support team at support@entemla.in or call us at +91 471 2345678.";

    // STEP A: Check if the question is looking for an MLA
    if (lowercaseQuery.includes('mla') || lowercaseQuery.includes('constituency') || lowercaseQuery.includes('phone') || lowercaseQuery.includes('number')) {
      // Find matching MLA from MongoDB
      const matchedMla = await this.userModel.findOne({
        role: 'mla',
        $or: [
          { constituency: { $regex: new RegExp(lowercaseQuery.replace('mla', '').trim(), 'i') } },
          { name: { $regex: new RegExp(lowercaseQuery, 'i') } }
        ]
      });

      if (matchedMla) {
        return `The current MLA for ${matchedMla.constituency} is ${matchedMla.name}. Contact Number: ${matchedMla.phone}, Email: ${matchedMla.email}.`;
      }
    }

    // STEP B: Search through your automatically crawled web context
    let matchedWebContext = this.platformKnowledgeBase
      .filter(page => {
        // Simple word-matching heuristic to find relevant pages
        const keywords = lowercaseQuery.split(' ');
        return keywords.some(word => word.length > 3 && page.content.toLowerCase().includes(word));
      })
      .map(page => page.content)
      .join('\n\n');

    // STEP C: INTENT CHECKING (Block outside questions)
    // If there is no MLA found and no crawled text contains keywords matching the question, it's an outside query!
    const basicPlatformKeywords = ['login', 'register', 'complaint', 'grievance', 'password', 'account', 'user', 'how', 'status', 'help', 'entemla'];
    const isPlatformRelated = basicPlatformKeywords.some(keyword => lowercaseQuery.includes(keyword));

    if (!isPlatformRelated && !matchedWebContext) {
      // Drop everything and return customer support info directly without calling Gemini/Groq
      return customerSupportMessage;
    }

    // STEP D: CONSTRUCT PROMPT FOR VALID PLATFORM QUESTIONS
    const systemInstruction = `
      You are the official EnteMLA Platform Assistant. Your job is to answer user questions regarding platform procedures using ONLY the provided website context below.
      
      RULES:
      1. Use the provided context to explain processes step-by-step.
      2. If you cannot find the answer in the context, politely provide this support message: "${customerSupportMessage}"
      3. Do not make up answers or hallucinate outside information.
    `;

    const userPayload = `
      Website Context:
      ${matchedWebContext || "No direct text match found on crawled pages."}

      User Question: ${question}
    `;

    // Send context + strict instructions to your LLM API caller block (Gemini/Groq)
    // Ensure you set temperature to 0 when initializing your LLM client!
    
    // const response = await this.yourLlmCallerFunction(systemInstruction, userPayload);
    // return response;
    
    return `[Mock AI Response Engine Processed with Context Length: ${matchedWebContext.length} characters]`;
  }
}