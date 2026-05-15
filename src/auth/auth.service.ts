import { BadRequestException, Injectable, OnModuleInit, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./schemas/user.schema";
import { RegisterDto } from "./dto/register.dto";
import axios from "axios";
import * as cheerio from "cheerio";

@Injectable()
export class AuthService implements OnModuleInit {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    // Automatically runs when the application starts
    async onModuleInit() {
        console.log("🔄 Starting automatic MLA directory synchronization...");
        await this.syncMlaDirectory();
    }

    // --- AUTOMATIC CRAWLER PIPELINE ---
    async syncMlaDirectory() {
        try {
            const targetUrl = "https://www.niyamasabha.nic.in/index.php/content/member_contacts";
            const { data } = await axios.get(targetUrl, {
                headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
            });

            const $ = cheerio.load(data);
            const rawMlaRecords: any[] = [];

            $("table tbody tr").each((index, element) => {
                const columns = $(element).find("td");
                if (columns.length >= 5) {
                    const rawNameAndConstituency = $(columns[1]).text().trim(); 
                    const phoneText = $(columns[3]).text().trim(); 
                    const email = $(columns[4]).text().trim();

                    const nameParts = rawNameAndConstituency.split("(");
                    const name = nameParts[0]?.trim();
                    const constituency = nameParts[1]?.replace(")", "")?.trim();

                    const phoneMatch = phoneText.match(/(9|8|7|6)\d{9}/);
                    const cleanPhone = phoneMatch ? phoneMatch[0] : "Not Provided";

                    if (email && constituency) {
                        rawMlaRecords.push({
                            name: name || "Hon. MLA",
                            email: email,
                            phone: cleanPhone,
                            constituency: constituency,
                            district: "Kerala State", 
                            role: "mla",
                            password: "defaultPassword123" // Placeholder password
                        });
                    }
                }
            });

            console.log(`🌐 Scraper found ${rawMlaRecords.length} MLAs online. Syncing to MongoDB...`);

            for (const mla of rawMlaRecords) {
                await this.userModel.findOneAndUpdate(
                    { email: mla.email }, 
                    { $set: mla },        
                    { upsert: true, new: true } 
                );
            }

            console.log("✅ Database sync complete. MLA profiles are up-to-date.");

        } catch (error: any) {
            console.error("❌ Automation Sync Error:", error.message);
        }
    }

    // --- AUTHENTICATION METHODS (Fixes your TS2339 Compiler Errors) ---
    async register(dto: RegisterDto) {
        const existing = await this.userModel.findOne({ email: dto.email });
        if (existing) {
            throw new BadRequestException('Email already exists');
        }
        const newUser = new this.userModel(dto);
        return newUser.save();
    }

    async login(loginDto: any) {
        const user = await this.userModel.findOne({ email: loginDto.email });

        if (!user || user.password !== loginDto.password) {
            throw new UnauthorizedException('Invalid email or password');
        }

        if (user.role !== loginDto.role) {
            throw new UnauthorizedException(`Access Denied: You are not registered as ${loginDto.role}`);
        }

        return {
            message: 'Login successful',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                district: user.district,
                constituency: user.constituency,
                place: user.place,
                role: user.role
            }
        };
    }
}