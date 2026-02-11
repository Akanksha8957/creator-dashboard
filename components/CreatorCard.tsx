"use client";

import Link from "next/link";
import { Instagram, Youtube, Twitter, Trash2, ExternalLink } from "lucide-react";
import Image from "next/image";
import api from "@/lib/api";
import { Card } from "./ui/Card";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";
import { useState } from "react";

interface Analytics {
    followers: number;
    engagement_rate: number;
}

interface Creator {
    id: string;
    _id?: string;
    name: string;
    platform: string;
    username: string;
    profile_image_url?: string;
    analytics?: Analytics;
}

interface CreatorCardProps {
    creator: Creator;
}

const PlatformIcon = ({ platform }: { platform: string }) => {
    switch (platform.toLowerCase()) {
        case "instagram":
            return <Instagram className="h-5 w-5 text-pink-600" />;
        case "youtube":
            return <Youtube className="h-5 w-5 text-red-600" />;
        case "x":
        case "twitter":
            return <Twitter className="h-5 w-5 text-blue-400" />;
        default:
            return null;
    }
};

const PlatformBadge = ({ platform }: { platform: string }) => {
    let variant: "default" | "success" | "warning" | "error" | "info" = "default";
    switch (platform.toLowerCase()) {
        case "instagram": variant = "error"; break; // Pinkish
        case "youtube": variant = "error"; break; // Red
        case "twitter": variant = "info"; break; // Blue
        case "x": variant = "info"; break;
    }

    return <Badge variant={variant} className="capitalize">{platform}</Badge>
}

export default function CreatorCard({ creator }: CreatorCardProps) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (confirm("Are you sure you want to delete this creator?")) {
            setIsDeleting(true);
            try {
                await api.delete(`/creators/${creator.id || creator._id}`);
                window.location.reload();
            } catch {
                alert("Failed to delete creator");
                setIsDeleting(false);
            }
        }
    };

    return (
        <Card className="group relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl" noPadding>
            <Link href={`/creators/${creator.id || creator._id}`} className="block h-full">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="relative h-16 w-16 flex-shrink-0">
                            {creator.profile_image_url ? (
                                <Image
                                    src={creator.profile_image_url}
                                    alt={creator.name}
                                    fill
                                    className="rounded-full object-cover ring-4 ring-white shadow-md group-hover:scale-105 transition-transform duration-300"
                                    unoptimized
                                />
                            ) : (
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white ring-4 ring-white shadow-md group-hover:scale-105 transition-transform duration-300">
                                    <span className="text-2xl font-bold">{creator.name.charAt(0)}</span>
                                </div>
                            )}
                            <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-sm">
                                <PlatformIcon platform={creator.platform} />
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Followers</p>
                            <p className="text-2xl font-bold text-slate-900">
                                {creator.analytics?.followers ? creator.analytics.followers.toLocaleString() : "0"}
                            </p>
                        </div>
                    </div>

                    <div className="mb-2">
                        <h3 className="text-lg font-bold text-slate-900 truncate group-hover:text-indigo-600 transition-colors">
                            {creator.name}
                        </h3>
                        <p className="text-sm font-medium text-slate-500 truncate">@{creator.username}</p>
                    </div>
                </div>

                {/* Hover Action Strip */}
                <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 flex justify-between items-center group-hover:bg-indigo-50/50 transition-colors">
                    <span className="text-xs font-semibold text-indigo-600 flex items-center">
                        View Analytics <ExternalLink className="ml-1 h-3 w-3" />
                    </span>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleDelete}
                        className="text-slate-400 hover:text-red-500 hover:bg-red-50 -mr-2"
                        isLoading={isDeleting}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </Link>
        </Card>
    );
}
