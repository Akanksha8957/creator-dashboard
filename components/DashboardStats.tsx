import { Users, TrendingUp, Heart } from "lucide-react";
import { Card } from "./ui/Card";

interface StatsProps {
    totalCreators: number;
    totalFollowers: number;
    avgEngagement: number;
}

export default function DashboardStats({ totalCreators, totalFollowers, avgEngagement }: StatsProps) {
    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <Card>
                <div className="flex items-center">
                    <div className="p-4 bg-blue-100/50 rounded-xl">
                        <Users className="h-8 w-8 text-blue-600" />
                    </div>
                    <div className="ml-5">
                        <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">Total Creators</p>
                        <p className="text-3xl font-bold text-slate-900 mt-1">{totalCreators}</p>
                    </div>
                </div>
            </Card>

            <Card>
                <div className="flex items-center">
                    <div className="p-4 bg-pink-100/50 rounded-xl">
                        <Heart className="h-8 w-8 text-pink-600" />
                    </div>
                    <div className="ml-5">
                        <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">Total Followers</p>
                        <p className="text-3xl font-bold text-slate-900 mt-1">{totalFollowers.toLocaleString()}</p>
                    </div>
                </div>
            </Card>

            <Card>
                <div className="flex items-center">
                    <div className="p-4 bg-emerald-100/50 rounded-xl">
                        <TrendingUp className="h-8 w-8 text-emerald-600" />
                    </div>
                    <div className="ml-5">
                        <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">Avg. Engagement</p>
                        <p className="text-2xl font-bold text-slate-900 mt-1">{avgEngagement}%</p>
                    </div>
                </div>
            </Card>
        </div>
    );
}
