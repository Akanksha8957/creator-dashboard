"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { LayoutDashboard, Users, LogOut, Settings, User } from "lucide-react";

export default function Sidebar() {
    const { user, logout } = useAuth();
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path || pathname.startsWith(`${path}/`);

    if (!user) return null;

    return (
        <aside className="peer fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transition-transform duration-300 ease-in-out hidden md:block">
            <div className="flex h-full flex-col">
                {/* Logo */}
                <div className="flex h-20 items-center px-6 border-b border-slate-800">
                    <div className="h-8 w-8 rounded-lg bg-indigo-500 flex items-center justify-center mr-3">
                        <span className="text-white font-bold text-lg">C</span>
                    </div>
                    <span className="text-xl font-bold tracking-tight">CreatorAnalytics</span>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 space-y-2 py-6">
                    <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Main</p>
                    <Link
                        href="/dashboard"
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive("/dashboard")
                            ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                            : "text-slate-400 hover:text-white hover:bg-slate-800"
                            }`}
                    >
                        <LayoutDashboard className="h-5 w-5" />
                        Dashboard
                    </Link>
                    <Link
                        href="/creators"
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive("/creators")
                            ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                            : "text-slate-400 hover:text-white hover:bg-slate-800"
                            }`}
                    >
                        <Users className="h-5 w-5" />
                        Creators
                    </Link>
                </nav>

                {/* User Profile */}
                <div className="border-t border-slate-800 p-4">
                    <div className="flex items-center gap-3 mb-4 px-2">
                        <div className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 border border-slate-700">
                            <User className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">
                                {user.name || "User"}
                            </p>
                            <p className="text-xs text-slate-500 truncate">{user.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={logout}
                        className="flex w-full items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                    >
                        <LogOut className="h-5 w-5" />
                        Sign Out
                    </button>
                </div>
            </div>
        </aside>
    );
}
