"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { PORTFOLIO_DATA } from "@/lib/portfolio-data";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
import { revalidateTag } from "next/cache";


// --- REVALIDATION ACTIONS ---

export async function revalidateProjects() {
    revalidateTag('projects');
}

export async function revalidateSkills() {
    revalidateTag('skills');
}

export async function revalidateExperience() {
    revalidateTag('experience');
}

const SYSTEM_PROMPT = `
You are an AI Assistant for Ernest Kojo Owusu Essien's portfolio.
Your goal is to represent Ernest to recruiters, clients, and developers.

DATA ABOUT ERNEST:
${JSON.stringify(PORTFOLIO_DATA, null, 2)}

CURRENT DATE: ${new Date().toDateString()}

GUIDELINES:
- Be professional, friendly, and concise.
- If asked about technical skills, refer to the skills section and project usage.
- If asked about a specific project, provide details from the project description and explain the tech stack.
- You can assume different personas:
  - RECRUITER MODE: Focus on years of experience, key achievements, and stack proficiency.
  - CLIENT MODE: Focus on value delivery, problem-solving, and reliability.
  - DEV MODE: usage specific technical terms, explain architecture decisions.
- If you don't know something, admit it and suggest contacting Ernest directly via email.
- **IMPORTANT**: Do NOT start every response with "That is a great question" or similar generic pleasantries. Be direct, natural, and varied in your conversational style. Match the user's tone.
- **STRICT BOUNDARY**: You are ONLY to answer questions related to Ernest's portfolio, skills, projects, and professional background. If the user asks about ANY other topic (e.g., general knowledge, sports, cooking, history, etc.), you MUST politely decline and say something like: "I can't help with that, but I'd be happy to answer questions about Ernest's work or skills."
`;

import fs from "fs/promises";
import path from "path";

async function getProjectDocs() {
    try {
        const docsDir = path.join(process.cwd(), "lib", "project-docs");
        const files = await fs.readdir(docsDir);

        let docsContent = "\n\nDETAILED PROJECT DOCUMENTATION:\n";

        for (const file of files) {
            if (file.endsWith(".md")) {
                const content = await fs.readFile(path.join(docsDir, file), "utf-8");
                docsContent += `\n--- PROJECT: ${file.replace(".md", "").toUpperCase()} ---\n${content}\n`;
            }
        }
        return docsContent;
    } catch (e) {
        console.error("Error reading project docs:", e);
        return "";
    }
}

const rateLimitMap = new Map<string, { count: number; windowStart: number; blockedUntil?: number }>();

import { headers } from "next/headers";

export async function chatWithGemini(messages: { role: "user" | "model"; parts: string }[]) {
    try {
        // 1. Identify User by IP
        const headersList = headers();
        const ip = headersList.get("x-forwarded-for") || "unknown-ip";

        // 2. Check Rate Limit
        const now = Date.now();
        const userRecord = rateLimitMap.get(ip) || { count: 0, windowStart: now };

        // Check if blocked
        if (userRecord.blockedUntil && now < userRecord.blockedUntil) {
            const remainingMinutes = Math.ceil((userRecord.blockedUntil - now) / 60000);
            return `RATE_LIMIT_EXCEEDED: You have exceeded your 5 messages per min. Please try again in ${remainingMinutes} minute${remainingMinutes > 1 ? 's' : ''}.`;
        }

        // Reset window if minute passed
        if (now - userRecord.windowStart > 60000) {
            userRecord.count = 0;
            userRecord.windowStart = now;
            userRecord.blockedUntil = undefined; // Clear block if time passed (though block check handles this)
        }

        // Increment count
        userRecord.count++;

        // Check against limit (5 per minute)
        if (userRecord.count > 5) {
            // Apply 3 Minute Block
            userRecord.blockedUntil = now + 3 * 60 * 1000;
            rateLimitMap.set(ip, userRecord);
            return `RATE_LIMIT_EXCEEDED: You have exceeded your 5 messages per min. Please try again in 3 minutes.`;
        }

        rateLimitMap.set(ip, userRecord);


        if (!process.env.GEMINI_API_KEY) {
            return "I'm currently in demo mode (API Key missing). Please contact Ernest to see my full capabilities!";
        }

        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
        const projectDocs = await getProjectDocs();

        const fullSystemPrompt = SYSTEM_PROMPT + projectDocs;

        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: fullSystemPrompt + "\n\nHello, who are you?" }],
                },
                {
                    role: "model",
                    parts: [{ text: "I am Ernest's AI Assistant. I can help you learn more about his work, skills, and experience." }],
                },
                ...messages.slice(0, -1).map(m => ({
                    role: m.role,
                    parts: [{ text: m.parts }]
                }))
            ],
        });

        const lastMessage = messages[messages.length - 1].parts;
        const result = await chat.sendMessage(lastMessage);
        const response = await result.response;
        const text = response.text();

        return text;
    } catch (error) {
        console.error("Gemini API Error:", error);
        return "Sorry, I encountered an error connecting to my brain. Please try again later.";
    }
}
