"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { Mail, Lock, ArrowLeft } from "lucide-react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);
        try {
            await login(email, password);
            router.push("/dashboard");
        } catch {
            setError("Invalid email or password");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen w-full bg-white">
            {/* Left Side - Form */}
            <div className="flex w-full flex-col justify-center px-8 sm:px-12 lg:w-1/2 lg:px-20 xl:px-24">
                <div className="mx-auto w-full max-w-sm">
                    <div className="mb-10">
                        <Link href="/" className="inline-flex items-center text-sm text-slate-500 hover:text-indigo-600 transition-colors mb-8">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Home
                        </Link>
                        <div className="flex items-center gap-2 text-indigo-600 mb-6">
                            <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                                <span className="text-white font-bold text-lg">C</span>
                            </div>
                            <span className="text-xl font-bold text-slate-900">CreatorAnalytics</span>
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Welcome back</h2>
                        <p className="text-slate-500 mt-2">Enter your details to access your account.</p>
                    </div>

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-slate-700">Email</label>
                            <div className="relative">
                                <Input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="pl-10 h-11 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg bg-slate-50 focus:bg-white transition-colors"
                                />
                                <Mail className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-slate-700">Password</label>
                            <div className="relative">
                                <Input
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="pl-10 h-11 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg bg-slate-50 focus:bg-white transition-colors"
                                />
                                <Lock className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                            </div>
                        </div>

                        {error && (
                            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-600 flex items-center">
                                <span className="mr-2">⚠️</span> {error}
                            </div>
                        )}

                        <Button
                            type="submit"
                            className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-lg shadow-indigo-200 transition-all duration-200 transform hover:-translate-y-0.5"
                            disabled={isLoading}
                        >
                            {isLoading ? "Signing in..." : "Sign In"}
                        </Button>

                        <div className="text-center text-sm pt-4">
                            <span className="text-slate-500">Don't have an account? </span>
                            <Link href="/register" className="font-semibold text-indigo-600 hover:text-indigo-500 hover:underline">
                                Sign up for free
                            </Link>
                        </div>
                    </form>
                </div>
            </div>

            {/* Right Side - Brand/Hero */}
            <div className="hidden lg:flex w-1/2 bg-indigo-600 relative items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600 to-violet-600 opacity-90"></div>

                <div className="relative z-10 max-w-lg text-center px-12 text-white">
                    <h2 className="text-4xl font-bold mb-6">Unlock Creator Insights</h2>
                    <p className="text-indigo-100 text-lg leading-relaxed">
                        Track growth, analyze engagement, and optimize your content strategy with our powerful analytics dashboard.
                    </p>
                </div>
            </div>
        </div>
    );
}
