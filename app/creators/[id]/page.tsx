"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Instagram, Youtube, Twitter, TrendingUp, RefreshCw, Loader2 } from "lucide-react";
import AnalyticsChart from "@/components/AnalyticsChart";
import CreatorStats from "@/components/CreatorStats";
import { Card } from "@/components/ui/Card";

interface Analytics {
    id: string;
    followers: number;
    engagement_rate: number;
    avg_likes: number;
    avg_comments: number;
    historical_data: { date: string; followers: number; engagement_rate: number }[];
    last_updated: string;
}

interface Creator {
    id: string;
    name: string;
    platform: string;
    username: string;
    profile_image_url?: string;
    analytics?: Analytics;
}

const PlatformIcon = ({ platform }: { platform: string }) => {
    switch (platform.toLowerCase()) {
        case "instagram":
            return <Instagram className="h-6 w-6 text-pink-600" />;
        case "youtube":
            return <Youtube className="h-6 w-6 text-red-600" />;
        case "x":
        case "twitter":
            return <Twitter className="h-6 w-6 text-blue-400" />;
        default:
            return null;
    }
};

const getPlatformUrl = (platform: string, username: string) => {
    const cleanUsername = username.replace("@", "");
    switch (platform.toLowerCase()) {
        case "instagram":
            return `https://instagram.com/${cleanUsername}`;
        case "youtube":
            return `https://youtube.com/@${cleanUsername}`;
        case "x":
        case "twitter":
            return `https://x.com/${cleanUsername}`;
        default:
            return "#";
    }
};

export default function CreatorDetailsPage() {
    const { id } = useParams();
    const [creator, setCreator] = useState<Creator | null>(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState("");

    const fetchCreator = async () => {
        try {
            const response = await api.get(`/creators/${id}`);
            setCreator(response.data);

            // If no analytics, try to fetch them or refresh them automatically?
            // The requirement says "Page combines creator identity + analytics data".
            // Our backend /creators/:id returns CreatorWithAnalytics.
            // If analytics is null, we might need to trigger a refresh or handle it.
            if (!response.data.analytics) {
                // Optionally trigger first refresh
                handleRefresh();
            }

        } catch {
            setError("Failed to load creator details");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) fetchCreator();
    }, [id]);

    const handleRefresh = async () => {
        setRefreshing(true);
        try {
            const response = await api.post(`/analytics/refresh/${id}`);
            // Update local state deeply
            setCreator(prev => prev ? { ...prev, analytics: response.data } : null);
        } catch (err) {
            console.error("Failed to refresh analytics");
        } finally {
            setRefreshing(false);
        }
    };

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
            </div>
        );
    }

    if (error || !creator) {
        return <div className="text-center text-red-500 mt-10">{error || "Creator not found"}</div>;
    }

    const analytics = creator.analytics;

    return (
        <>
            {/* Header Section (Notus Style) */}
            <div className="relative bg-sky-600 pb-32 pt-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-6">
                        <Link
                            href="/creators"
                            className="inline-flex items-center text-sm font-medium text-white/80 hover:text-white"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Creators
                        </Link>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="flex items-center">
                            <div className="relative h-20 w-20 flex-shrink-0">
                                {creator.profile_image_url ? (
                                    <Image
                                        src={creator.profile_image_url}
                                        alt={creator.name}
                                        fill
                                        className="rounded-full object-cover ring-4 ring-white/30 shadow-lg"
                                        unoptimized
                                    />
                                ) : (
                                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 text-white ring-4 ring-white/30 shadow-lg backdrop-blur-sm">
                                        <span className="text-3xl font-bold">{creator.name.charAt(0)}</span>
                                    </div>
                                )}
                            </div>
                            <div className="ml-5">
                                <h1 className="text-3xl font-bold text-white tracking-tight">{creator.name}</h1>
                                <div className="mt-1 flex items-center space-x-4 text-sky-100">
                                    <div className="flex items-center">
                                        <div className="p-1.5 bg-white/10 rounded-full mr-2">
                                            {creator.platform.toLowerCase() === 'instagram' && <Instagram size={14} />}
                                            {creator.platform.toLowerCase() === 'youtube' && <Youtube size={14} />}
                                            {(creator.platform.toLowerCase() === 'twitter' || creator.platform.toLowerCase() === 'x') && <Twitter size={14} />}
                                        </div>
                                        <a href={`https://${creator.platform}.com/${creator.username}`} target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline decoration-white/50 underline-offset-4 font-medium transition-all">
                                            @{creator.username}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 md:mt-0 flex space-x-3">
                            <button onClick={() => window.open(`https://${creator.platform}.com/${creator.username}`, '_blank')} className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium text-sm transition-colors border border-white/10">
                                Visit Profile
                            </button>

                        </div>
                    </div>
                </div>
            </div>

            {/* Overlapping Content Section */}
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-24 pb-12">

                {/* Stats Cards */}
                <div className="mb-8">
                    {analytics ? (
                        <CreatorStats
                            totalFollowers={analytics.followers}
                            engagementRate={analytics.engagement_rate}
                            avgLikes={analytics.avg_likes}
                        />
                    ) : (
                        <div className="text-center py-12 bg-white rounded-lg shadow">
                            <p className="text-gray-500">No analytics data available. Click "Refresh Analytics" to generate data.</p>
                            <button
                                onClick={handleRefresh}
                                disabled={refreshing}
                                className="mt-4 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50"
                            >
                                <RefreshCw className={`-ml-0.5 mr-1.5 h-5 w-5 ${refreshing ? "animate-spin" : ""}`} aria-hidden="true" />
                                {refreshing ? "Refreshing..." : "Refresh Analytics"}
                            </button>
                        </div>
                    )}
                </div>

                {/* Main Content Grid */}
                {analytics && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Dark Chart (Main) */}
                        <div className="lg:col-span-2">
                            <div className="rounded-xl bg-slate-800 shadow-xl overflow-hidden border border-slate-700/50">
                                <div className="p-6">
                                    <div className="flex justify-between items-end mb-4">
                                        <div>
                                            <h6 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">
                                                Overview
                                            </h6>
                                            <h2 className="text-white text-xl font-bold">
                                                Followers Growth
                                            </h2>
                                        </div>
                                        <div className="text-right hidden sm:block">
                                            <span className="text-emerald-400 font-semibold text-sm flex items-center justify-end">
                                                <TrendingUp size={14} className="mr-1" />
                                                +3.48%
                                            </span>
                                            <span className="text-slate-500 text-xs mt-1 block">Since last month</span>
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        <AnalyticsChart
                                            data={analytics.historical_data}
                                            dataKey="followers"
                                            color="#38bdf8" // Sky-400
                                            theme="dark"
                                            className="h-[350px]"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Light Chart (Secondary) */}
                        <div className="lg:col-span-1">
                            <div className="rounded-xl bg-white shadow-lg overflow-hidden border border-slate-100 h-full">
                                <div className="p-6 h-full flex flex-col">
                                    <div className="mb-4">
                                        <h6 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">
                                            Performance
                                        </h6>
                                        <h2 className="text-slate-800 text-xl font-bold">
                                            Engagement
                                        </h2>
                                    </div>
                                    <div className="flex-1 min-h-[250px] relative">
                                        <AnalyticsChart
                                            data={analytics.historical_data}
                                            dataKey="engagement_rate"
                                            color="#10b981" // Emerald-500
                                            theme="light"
                                            className="absolute inset-0"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
