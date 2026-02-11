"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { LogOut, User, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/Button";

export default function Navbar() {
    const { user, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    if (!user) return null;

    const isActive = (path: string) => pathname === path;
    const activeClass = "inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 border-b-2 border-indigo-500";
    const inactiveClass = "inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900 hover:border-gray-300 border-b-2 border-transparent transition-colors";

    const mobileActiveClass = "block border-l-4 border-indigo-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700";
    const mobileInactiveClass = "block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700";

    return (
        <nav className="fixed top-0 w-full z-50 glass border-b border-gray-200/50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 justify-between items-center">
                    <div className="flex items-center">
                        <Link href="/dashboard" className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                                <span className="text-white font-bold text-lg">C</span>
                            </div>
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                                CreatorAnalytics
                            </span>
                        </Link>
                        <div className="hidden sm:ml-10 sm:flex sm:space-x-8">
                            <Link
                                href="/dashboard"
                                className={isActive("/dashboard") ? activeClass : inactiveClass}
                            >
                                Dashboard
                            </Link>
                            <Link
                                href="/creators"
                                className={isActive("/creators") ? activeClass : inactiveClass}
                            >
                                Creators
                            </Link>
                        </div>
                    </div>

                    <div className="hidden sm:flex sm:items-center sm:space-x-4">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100/50 border border-gray-200">
                            <User className="h-4 w-4 text-gray-600" />
                            <span className="text-sm font-medium text-gray-700">
                                {user.name || user.email}
                            </span>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={logout}
                            className="text-gray-500 hover:text-red-600 hover:bg-red-50"
                        >
                            <LogOut className="h-5 w-5" />
                        </Button>
                    </div>

                    <div className="flex items-center sm:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
                        >
                            {isMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="sm:hidden glass border-t border-gray-200">
                    <div className="space-y-1 pb-3 pt-2">
                        <Link
                            href="/dashboard"
                            className={isActive("/dashboard") ? mobileActiveClass : mobileInactiveClass}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Dashboard
                        </Link>
                        <Link
                            href="/creators"
                            className={isActive("/creators") ? mobileActiveClass : mobileInactiveClass}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Creators
                        </Link>
                    </div>
                    <div className="border-t border-gray-200 pb-3 pt-4">
                        <div className="flex items-center px-4">
                            <div className="flex-shrink-0">
                                <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                                    <User className="h-5 w-5" />
                                </div>
                            </div>
                            <div className="ml-3">
                                <div className="text-base font-medium text-gray-800">
                                    {user.name || "User"}
                                </div>
                                <div className="text-sm font-medium text-gray-500">
                                    {user.email}
                                </div>
                            </div>
                        </div>
                        <div className="mt-3 space-y-1 px-2">
                            <Button
                                variant="ghost"
                                className="w-full justify-start text-red-600 hover:bg-red-50"
                                onClick={logout}
                            >
                                <LogOut className="mr-2 h-5 w-5" />
                                Sign out
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
