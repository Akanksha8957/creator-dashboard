"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import CreatorCard from "@/components/CreatorCard";
import Link from "next/link";
import { Plus, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface Creator {
    id: string;
    _id?: string;
    name: string;
    platform: string;
    username: string;
    profile_image_url?: string;
}

export default function CreatorsPage() {
    const [creators, setCreators] = useState<Creator[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCreators = async () => {
            try {
                const response = await api.get("/creators");
                setCreators(response.data);
            } catch (error) {
                console.error("Failed to fetch creators", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCreators();
    }, []);

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
            transition: { duration: 0.4 }
        }
    };

    return (
        <>
            {/* Blue Header Section */}
            <div className="relative bg-sky-600 pb-32 pt-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center justify-between"
                    >
                        <div>
                            <h1 className="text-3xl font-bold text-white tracking-tight">Your Creators</h1>
                            <p className="text-sky-100 mt-2">Manage and track your creator portfolio.</p>
                        </div>
                        <Link
                            href="/creators/add"
                            className="inline-flex items-center rounded-xl bg-white/10 px-4 py-2.5 text-sm font-semibold text-white shadow-lg backdrop-blur-sm hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-0.5 border border-white/10"
                        >
                            <Plus className="-ml-0.5 mr-2 h-5 w-5" aria-hidden="true" />
                            Add Creator
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Content Section with Overlap */}
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-24 pb-12">
                {loading ? (
                    <div className="mt-8 flex h-64 items-center justify-center bg-white rounded-2xl shadow-lg">
                        <div className="flex flex-col items-center">
                            <Loader2 className="h-10 w-10 animate-spin text-indigo-600 mb-4" />
                            <p className="text-slate-500 font-medium">Loading creators...</p>
                        </div>
                    </div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                    >
                        {creators.length === 0 ? (
                            <motion.div variants={itemVariants} className="col-span-full text-center py-12 bg-white rounded-2xl border-2 border-dashed border-slate-200 shadow-sm">
                                <p className="text-slate-500 text-lg">No creators found. Add one to see analytics!</p>
                            </motion.div>
                        ) : (
                            creators.map((creator) => (
                                <motion.div key={creator.id || creator._id} variants={itemVariants}>
                                    <CreatorCard creator={creator} />
                                </motion.div>
                            ))
                        )}
                    </motion.div>
                )}
            </div>
        </>
    );
}
