"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import DashboardStats from "@/components/DashboardStats";
import AnalyticsChart from "@/components/AnalyticsChart";
import { Loader2, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { motion } from "framer-motion";

interface DashboardData {
    total_creators: number;
    total_followers: number;
    avg_engagement_rate: number;
    performance_data: {
        name: string;
        history: { date: string; followers: number; engagement_rate: number }[];
    }[];
}

export default function DashboardPage() {
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("/analytics/dashboard");
                setData(response.data);
            } catch (err) {
                setError("Failed to load dashboard data");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex h-[80vh] items-center justify-center">
                <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
            </div>
        );
    }

    if (error) {
        return <div className="text-center text-red-500 mt-10 p-4 bg-red-50 rounded-lg">{error}</div>;
    }

    if (!data) return null;

    const aggregatedHistory = data.performance_data.length > 0
        ? data.performance_data[0].history.map((day, index) => {
            const totalForDay = data.performance_data.reduce((sum, creator) => {
                const historyItem = creator.history[index];
                return sum + (historyItem ? historyItem.followers : 0);
            }, 0);
            return {
                date: day.date,
                followers: totalForDay
            };
        })
        : [];

    const aggregatedEngagement = data.performance_data.length > 0
        ? data.performance_data[0].history.map((day, index) => {
            const totalEngagement = data.performance_data.reduce((sum, creator) => {
                const historyItem = creator.history[index];
                return sum + (historyItem ? historyItem.engagement_rate : 0);
            }, 0);
            return {
                date: day.date,
                engagement_rate: parseFloat((totalEngagement / data.performance_data.length).toFixed(2))
            };
        })
        : [];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Blue Header Section */}
            <div className="relative bg-sky-600 pb-32 pt-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <motion.div variants={itemVariants}>
                        <h1 className="text-3xl font-bold text-white tracking-tight">Dashboard Overview</h1>
                        <p className="text-sky-100 mt-2">Track your team's performance and growth.</p>
                    </motion.div>
                </div>
            </div>

            {/* Content Section with Overlap */}
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-24 pb-12 space-y-8">

                {/* Stats */}
                <motion.div variants={itemVariants}>
                    <DashboardStats
                        totalCreators={data.total_creators}
                        totalFollowers={data.total_followers}
                        avgEngagement={data.avg_engagement_rate}
                    />
                </motion.div>

                {/* Charts Grid */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                    {aggregatedHistory.length > 0 && (
                        <motion.div variants={itemVariants}>
                            <div className="rounded-xl bg-slate-800 shadow-xl overflow-hidden border border-slate-700/50">
                                <div className="p-6">
                                    <div className="flex justify-between items-end mb-4">
                                        <div>
                                            <h6 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">
                                                Overview
                                            </h6>
                                            <h3 className="text-xl font-bold text-white">Total Followers Growth</h3>
                                        </div>
                                        <div className="text-right hidden sm:block">
                                            <span className="text-slate-500 text-xs mt-1 block">Last 30 Days</span>
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        <AnalyticsChart
                                            data={aggregatedHistory}
                                            dataKey="followers"
                                            color="#38bdf8" // Sky-400
                                            theme="dark"
                                            className="h-[350px]"
                                        />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {data.performance_data.length > 0 && (
                        <motion.div variants={itemVariants}>
                            <div className="rounded-xl bg-white shadow-lg overflow-hidden border border-slate-100 h-full">
                                <div className="p-6 h-full flex flex-col">
                                    <div className="mb-4">
                                        <h6 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">
                                            Performance
                                        </h6>
                                        <h3 className="text-xl font-bold text-slate-900">Engagement Trend</h3>
                                    </div>
                                    <div className="flex-1 min-h-[250px] relative">
                                        <AnalyticsChart
                                            data={aggregatedEngagement}
                                            dataKey="engagement_rate"
                                            color="#10b981"
                                            theme="light"
                                            className="absolute inset-0"
                                        />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
