import type { Metadata } from "next";
import { Inter, DM_Serif_Display } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import "../globals.css";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

const dmSerif = DM_Serif_Display({
    subsets: ["latin"],
    weight: "400",
    variable: "--font-dm-serif",
    display: "swap",
});

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
    title: "Ernest Essien — Software Engineer & AI",
    description:
        "Software Engineer specializing in Backend Systems & AI. Building intelligent solutions where code meets creativity.",
    openGraph: {
        title: "Ernest Essien — Software Engineer & AI",
        description: "Software Engineer specializing in Backend Systems & AI.",
        images: [
            {
                url: "/og-light.png",
                width: 1200,
                height: 630,
                alt: "Ernest Essien — Software Engineer & AI",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Ernest Essien — Software Engineer & AI",
        description: "Software Engineer specializing in Backend Systems & AI.",
        images: ["/og-light.png"],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.variable} ${dmSerif.variable} font-sans antialiased`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange={false}
                >
                    <Navbar />
                    {children}
                    <Footer />
                </ThemeProvider>
            </body>
        </html>
    );
}
