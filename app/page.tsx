"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowRight, MessageCircle, BarChart3, Users, Zap, CheckCircle2, Send } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";

export default function Home() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && user) {
            router.push("/dashboard");
        }
    }, [user, loading, router]);

    // Floating animation variants
    const float: Variants = {
        animate: {
            y: [0, -20, 0],
            transition: {
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    const floatDelayed: Variants = {
        animate: {
            y: [0, -15, 0],
            transition: {
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
            }
        }
    };

    const floatReverse: Variants = {
        animate: {
            y: [0, 20, 0],
            transition: {
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-white via-indigo-50 to-blue-100 overflow-hidden relative">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-[800px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-200/40 via-transparent to-transparent -z-10"></div>

            <section className="relative pt-20 pb-32 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

                {/* Top Badge */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-1.5 shadow-sm mb-8 hover:shadow-md transition-shadow cursor-default"
                >
                    <div className="bg-blue-500 rounded-full p-1 text-white">
                        <Send size={12} fill="currentColor" />
                    </div>
                    <span className="text-sm font-medium text-slate-600">Connect with creator insights</span>
                </motion.div>

                {/* Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-6 max-w-4xl"
                >
                    Creator Analytics <br />
                    <span className="text-blue-600">Made Easy For Growth</span>
                </motion.h1>

                {/* Subtext */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-xl text-slate-500 max-w-2xl mb-10 leading-relaxed"
                >
                    Track performance, analyze engagement, and optimize your content strategy across all platforms. Data-driven growth for modern creators.
                </motion.p>

                {/* CTA Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <Link href="/register">
                        <Button
                            className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-full px-10 py-7 shadow-xl shadow-blue-500/30 hover:shadow-blue-500/40 transition-all transform hover:-translate-y-1"
                        >
                            Start your campaign
                            <div className="bg-white text-blue-600 rounded-full p-1 ml-3">
                                <ArrowRight size={16} />
                            </div>
                        </Button>
                    </Link>
                </motion.div>

                {/* 3D Mockups Container */}
                <div className="relative w-full max-w-5xl h-[600px] mt-20 perspective-1000">

                    {/* Left Card - Tilted */}
                    <motion.div
                        variants={floatDelayed}
                        animate="animate"
                        initial={{ opacity: 0, x: -100, rotate: -10 }}
                        whileInView={{ opacity: 1, x: 0, rotate: -6 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="absolute left-4 md:left-0 top-20 w-[280px] md:w-[320px] bg-white rounded-3xl shadow-2xl p-6 border border-slate-100 z-10 hidden sm:block transform -rotate-6 hover:rotate-0 transition-transform duration-500"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                                <BarChart3 size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-800">Growth Rate</h3>
                                <p className="text-xs text-slate-500">Last 7 Days</p>
                            </div>
                        </div>
                        <div className="h-32 bg-slate-50 rounded-xl flex items-end justify-between p-4 gap-2">
                            {[40, 70, 50, 90, 60, 80].map((h, i) => (
                                <div key={i} className="w-full bg-indigo-500 rounded-t-sm opacity-80" style={{ height: `${h}%` }}></div>
                            ))}
                        </div>
                        <div className="mt-4 flex items-center gap-2 text-green-600 text-sm font-bold bg-green-50 p-2 rounded-lg w-fit">
                            <Zap size={14} /> +24% Increase
                        </div>
                    </motion.div>

                    {/* Right Card - Tilted */}
                    <motion.div
                        variants={floatReverse}
                        animate="animate"
                        initial={{ opacity: 0, x: 100, rotate: 10 }}
                        whileInView={{ opacity: 1, x: 0, rotate: 6 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="absolute right-4 md:right-0 top-40 w-[280px] md:w-[300px] bg-white rounded-3xl shadow-2xl p-6 border border-slate-100 z-10 hidden sm:block transform rotate-6 hover:rotate-0 transition-transform duration-500"
                    >
                        <div className="flex items-start gap-4 mb-4">
                            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 flex-shrink-0">
                                <MessageCircle size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-800">Engagement</h3>
                                <p className="text-xs text-slate-500">Active Discussions</p>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="bg-slate-50 p-3 rounded-2xl rounded-tl-none">
                                <p className="text-xs text-slate-600">Great insights on the last post! 🚀</p>
                            </div>
                            <div className="bg-blue-600 p-3 rounded-2xl rounded-tr-none text-white ml-auto w-fit">
                                <p className="text-xs">Thanks! Analysis showed high retention.</p>
                            </div>
                            <div className="bg-slate-50 p-3 rounded-2xl rounded-tl-none w-fit">
                                <p className="text-xs text-slate-600">Can we export this report?</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Center Phone Mockup */}
                    <motion.div
                        variants={float}
                        animate="animate"
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="absolute left-1/2 -translate-x-1/2 top-0 w-[300px] md:w-[360px] h-[650px] bg-white rounded-[3rem] border-[8px] border-slate-900 shadow-2xl overflow-hidden z-20"
                    >
                        {/* Dynamic Island / Notch */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-slate-900 rounded-b-2xl z-30"></div>

                        {/* Phone Screen Content */}
                        <div className="w-full h-full bg-slate-50 overflow-hidden flex flex-col">
                            {/* App Header */}
                            <div className="bg-white p-6 pt-12 pb-4 border-b border-slate-100 flex justify-between items-center shadow-sm">
                                <div className="font-bold text-lg text-slate-800">Dashboard</div>
                                <div className="w-8 h-8 bg-slate-200 rounded-full"></div>
                            </div>

                            {/* Scrollable Content */}
                            <div className="p-5 space-y-4 overflow-hidden relative">
                                {/* Chart Placeholder */}
                                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                                    <div className="h-4 w-24 bg-slate-100 rounded mb-4"></div>
                                    <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl relative overflow-hidden">
                                        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white/20 skew-y-6 transform origin-bottom-left"></div>
                                    </div>
                                </div>

                                {/* Stats Row */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                                        <div className="w-8 h-8 bg-blue-100 rounded-lg mb-2"></div>
                                        <div className="h-3 w-16 bg-slate-100 rounded mb-1"></div>
                                        <div className="h-5 w-12 bg-slate-200 rounded"></div>
                                    </div>
                                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                                        <div className="w-8 h-8 bg-purple-100 rounded-lg mb-2"></div>
                                        <div className="h-3 w-16 bg-slate-100 rounded mb-1"></div>
                                        <div className="h-5 w-12 bg-slate-200 rounded"></div>
                                    </div>
                                </div>

                                {/* List Items */}
                                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-2 space-y-2">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-xl transition-colors">
                                            <div className="w-10 h-10 rounded-full bg-slate-100"></div>
                                            <div className="flex-1">
                                                <div className="h-3 w-24 bg-slate-100 rounded mb-1"></div>
                                                <div className="h-2 w-16 bg-slate-50 rounded"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Bottom Tab Bar */}
                            <div className="mt-auto bg-white border-t border-slate-100 p-4 flex justify-around items-center">
                                <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
                                <div className="w-6 h-6 bg-slate-200 rounded-full"></div>
                                <div className="w-6 h-6 bg-slate-200 rounded-full"></div>
                            </div>
                        </div>
                    </motion.div>
                </div>

            </section>
        </div>
    );
}
