---
title: "New Year, New You: The Void Alchemist Portfolio (Powered by Gemini)"
published: true
tags: devchallenge, googleaichallenge, portfolio, gemini, nextjs
---

*This is a submission for the [New Year, New You Portfolio Challenge Presented by Google AI](https://dev.to/challenges/new-year-new-you-google-ai-2025-12-31)*

## About Me
Hi, I'm **Ernest Kojo Owusu Essien**, a Software Engineer specializing in Backend Systems and AI. I build systems that think. My goal for 2026 is to push the boundaries of web experiences by merging rigorous backend logic with immersive, cinematic frontend designs.

## Portfolio
<!-- 
PASTE YOUR GOOGLE CLOUD RUN LINK BELOW
Example: https://ai-portfolio-xyz-uc.a.run.app 
-->
[View Live Portfolio](https://ai-portfolio-48210516724.us-central1.run.app)

{% embed https://ai-portfolio-48210516724.us-central1.run.app %}

## How I Built It
I didn't just want a static resume; I wanted a living, breathing digital space.

### The Stack
- **Framework**: [Next.js 14](https://nextjs.org/) (App Router) for performance and SEO.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) for a custom "Void Alchemist" design system.
- **Animation**: [Framer Motion](https://www.framer.com/motion/) for the floating sigils and parallax effects.
- **Deployment**: **Google Cloud Run** via Docker containers.

### Google AI Integration (The Brain) 🧠
The centerpiece of this portfolio is the **AI Agent** (bottom right). It's not a generic chatbot.
1.  **Gemini Flash**: I used the `gemini-1.5-flash` model via the Google AI SDK for snappy, intelligent responses.
2.  **RAG (Retrieval-Augmented Generation)**: The AI has access to my actual project documentation (markdown files in my repo). When you ask about "Episcope" or "MedForecast", it reads the detailed docs to give you specific, accurate answers about my architecture and tech stack.
3.  **Persona**: I engineered the system prompt to behave like a professional partner—switching between "Recruiter Mode" (concise, metrics-focused) and "Dev Mode" (technical, architectural) based on context.

## What I'm Most Proud Of
1.  **The "Atmosphere"**: I built a multi-layered background system. Floating code "sigils" drift in the void, but I added a **translucent atmospheric layer** between them and the content. This creates a fake depth-of-field effect that makes the text readable while keeping the background immersive.
2.  **Obsidian UI**: I aimed for a "premium dark mode" look—glassmorphism with deep black tints, subtle white borders, and neon cyan accents.
3.  **The Code**: It's robust. The contact form uses Web3Forms, the animations are optimized, and the entire app acts as a standalone artifact ready for cloud scaling.

<!-- Don't forget to include the dev label! -->
--labels dev-tutorial=devnewyear2026
