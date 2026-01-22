import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { CursorEffect } from "@/components/cursor-effect";
import { GrainOverlay } from "@/components/grain-overlay";
import { FloatingSigils } from "@/components/floating-sigils";
import { AtmosphereLayer } from "@/components/atmosphere-layer";
import { CosmicFacts } from "@/components/cosmic-facts";
import { Footer } from "@/components/footer";
import "../globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: "Ernest Kojo Owusu Essien | AI-Powered Portfolio",
  description: "Software Engineer & AI Innovator. Experience the future of portfolios.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${outfit.variable} antialiased min-h-screen selection:bg-accent selection:text-white`}>
        {/* <GrainOverlay /> */}
        <CursorEffect />
        {/* Global Sigils Background */}
        <FloatingSigils />
        <AtmosphereLayer />
        {/* Floating Facts */}
        <CosmicFacts />
        {children}
        <Footer />
      </body>
    </html>
  );
}
