---
title: "New Year, New You: The Void Alchemist Portfolio (Powered by Gemini)"
published: true
tags: devchallenge, googleaichallenge, portfolio, gemini, nextjs
---

*This is a submission for the [New Year, New You Portfolio Challenge Presented by Google AI](https://dev.to/challenges/new-year-new-you-google-ai-2025-12-31)*

## About Me
Hi, I'm **Ernest Kojo Owusu Essien**, a Software Engineer specializing in Backend Systems and AI. I build systems that think. My goal for 2026 is to push the boundaries of web experiences by merging rigorous backend logic with immersive, cinematic frontend designs. I don't just build websites; I build digital artifacts.

## Portfolio
<!-- 
PASTE YOUR GOOGLE CLOUD RUN LINK BELOW
Example: https://ai-portfolio-xyz-uc.a.run.app 
-->
[View Live Portfolio](https://ai-portfolio-48210516724.us-central1.run.app)

{% embed https://ai-portfolio-48210516724.us-central1.run.app %}

## How I Built It
I didn't just want a static resume; I wanted a living, breathing digital space that I can manage and evolve without touching code for every content update.

### The Stack
- **Framework**: [Next.js 14](https://nextjs.org/) (App Router) for performance, SEO, and server actions.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) for a custom "Void Alchemist" design system.
- **Backend & Database**: **Firebase (Firestore & Auth)**. I moved beyond static data to a real-time database to manage my projects and messages.
- **AI**: **Gemini 1.5 Flash** via the Google AI SDK.
- **Deployment**: **Google Cloud Run** via Docker containers for serverless scalability.

### Key Features
1.  **AI Integration (The Brain)**: The "Void Alchemist" AI agent (bottom right) is powered by Gemini. It uses **RAG (Retrieval-Augmented Generation)** to access my actual markdown documentation, allowing it to answer specific technical questions about my work with high accuracy.
2.  **Admin Dashboard (The Control Room)**: I built a secured Admin Panel (`/admin`) using **NextAuth** and **Firebase**.
    -   **Message Management**: Contact form submissions are saved to Firestore and can be read/deleted directly from the dashboard.
    -   **Dynamic Content**: My projects and skills are managed via the dashboard, allowing me to update my portfolio instantly.
3.  **Immersive UI**: Used Framer Motion for the particle network, floating sigils, and "atmosphere" layer to create a depth-of-field effect that feels premium and cinematic.

## What I'm Most Proud Of
1.  **The Full-Stack Admin Ecosystem**: I'm most proud of moving away from hardcoded JSON files. Building a full Admin Dashboard where I can see messages from recruiters and manage my project showcase makes this a true production-grade application, not just a static template.
2.  **The AI "Persona"**: Tuning the Gemini prompt was an art. It switches seamlessly between "Recruiter Mode" (concise, metrics) and "Dev Mode" (technical deep-dives), making it feel like a real extension of myself.
3.  **Cloud Run Deployment**: Getting the Docker container optimized and deployed on Cloud Run was a seamless experience. The app scales down to zero when not in use, which is perfect for a portfolio.

<!-- Don't forget to include the dev label! -->
--labels dev-tutorial=devnewyear2026
