import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "../globals.css";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

const outfit = Outfit({
    subsets: ["latin"],
    variable: "--font-outfit",
    display: "swap",
});

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
    title: "Admin Portal | Void Alchemist",
    description: "Admin Dashboard",
};

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${outfit.variable} antialiased min-h-screen bg-black text-white flex`}>
                <AdminSidebar />
                <main className="flex-1 h-screen overflow-y-auto bg-black/50 p-8">
                    {children}
                </main>
            </body>
        </html>
    );
}
