import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Sidebar from "@/components/Sidebar";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Creator Analytics Dashboard",
    description: "Manage and analyze your favorite creator's performance",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>

                <AuthProvider>
                    <div className="flex min-h-screen bg-slate-50">
                        <Sidebar />
                        <main className="flex-1 w-full p-8 sm:p-10 lg:p-12 transition-all duration-300 ease-in-out md:peer-[.peer]:ml-64">
                            {children}
                        </main>
                    </div>
                </AuthProvider>
            </body>
        </html>
    );
}
