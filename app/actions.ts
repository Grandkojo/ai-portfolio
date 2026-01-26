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
- **CONTEXT ONLY**: Your knowledge is strictly limited to the provided data about Ernest (Projects, Skills, Experience). Do NOT answer general questions, do NOT solve coding problems, and do NOT provide external knowledge that is not in the context.
- **NO CODE GENERATION**: Do NOT write code, debug code, or solve technical interview questions. If asked, politely explain that you are only here to discuss Ernest's portfolio.
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
import { checkRateLimit } from "@/lib/db";

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

import { headers } from "next/headers";

export async function chatWithGemini(messages: { role: "user" | "model"; parts: string }[]) {
    try {
        // 1. Identify User by IP
        const headersList = headers();
        const forwardedFor = headersList.get("x-forwarded-for");
        const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "unknown-ip";

        // 2. Check Rate Limit (Firestore)
        const rateLimit = await checkRateLimit(ip);

        if (rateLimit.blocked) {
            return `RATE_LIMIT_EXCEEDED: ${rateLimit.message}`;
        }

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

export async function getUserLocation() {
    try {
        const headersList = headers();
        const forwardedFor = headersList.get("x-forwarded-for");
        // If local, might be ::1 or 127.0.0.1, which ipapi won't like. 
        // fallback to fetch without IP (server IP) if no forwarded header, or handle localhost.
        const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : null;

        let url = 'https://ipapi.co/json/';
        if (ip && ip !== '::1' && ip !== '127.0.0.1') {
            url = `https://ipapi.co/${ip}/json/`;
        }

        const response = await fetch(url);
        if (!response.ok) return null;

        const data = await response.json();
        return data.country_code;
    } catch (error) {
        console.error("Location Error:", error);
        return null;
    }
}
