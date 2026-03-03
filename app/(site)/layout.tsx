import type { Metadata } from "next";
import { DM_Sans, Syne } from "next/font/google";
import { CursorEffect } from "@/components/cursor-effect";
import { GrainOverlay } from "@/components/grain-overlay";
import { FloatingSigils } from "@/components/floating-sigils";
import { AtmosphereLayer } from "@/components/atmosphere-layer";
import { CosmicFacts } from "@/components/cosmic-facts";
import { Footer } from "@/components/footer";
import { DynamicIslandNav } from "@/components/dynamic-island-nav";
import { NotificationProvider } from "@/components/ui/notification-context";
import "../globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-dm-sans",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
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
      <body className={`${dmSans.variable} ${syne.variable} antialiased min-h-screen selection:bg-accent selection:text-white`}>
        <NotificationProvider>
          {/* <GrainOverlay /> */}
          <CursorEffect />
          {/* Global Sigils Background */}
          <FloatingSigils />
          <AtmosphereLayer />
          {/* Floating Facts */}
          {/* <CosmicFacts /> */}
          <DynamicIslandNav />
          {children}
          <Footer />
        </NotificationProvider>
      </body>
    </html>
  );
}
