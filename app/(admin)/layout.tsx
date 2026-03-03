import type { Metadata } from "next";
import { DM_Sans, Syne } from "next/font/google";
import "../globals.css";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { NotificationProvider } from "@/components/ui/notification-context";

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
            <body className={`${dmSans.variable} ${syne.variable} antialiased min-h-screen bg-black text-white flex`}>
                <NotificationProvider>
                    <AdminSidebar />
                    <main className="flex-1 h-screen overflow-y-auto bg-black/50 p-8">
                        {children}
                    </main>
                </NotificationProvider>
            </body>
        </html>
    );
}
