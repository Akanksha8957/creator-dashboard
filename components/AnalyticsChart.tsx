"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface AnalyticsChartProps {
    data: Record<string, any>[];
    dataKey: string;
    color?: string;
    className?: string;
    theme?: "light" | "dark";
}

export default function AnalyticsChart({
    data,
    dataKey,
    color = "#8884d8",
    className = "h-[300px]",
    theme = "light"
}: AnalyticsChartProps) {
    const isDark = theme === "dark";
    const axisColor = isDark ? "#94a3b8" : "#64748B";
    const gridColor = isDark ? "#334155" : "#E2E8F0";

    return (
        <div className={className}>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={data}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <defs>
                        <linearGradient id={`color${dataKey}-${theme}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={color} stopOpacity={isDark ? 0.5 : 0.3} />
                            <stop offset="95%" stopColor={color} stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                    <XAxis
                        dataKey="date"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: axisColor, fontSize: 12 }}
                        dy={10}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: axisColor, fontSize: 12 }}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: isDark ? '#0f172a' : '#1E293B',
                            borderColor: isDark ? '#1e293b' : '#334155',
                            borderRadius: '8px',
                            color: '#F8FAFC',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                        itemStyle={{ color: '#F8FAFC' }}
                    />
                    <Area
                        type="monotone"
                        dataKey={dataKey}
                        stroke={color}
                        fillOpacity={1}
                        fill={`url(#color${dataKey}-${theme})`}
                        strokeWidth={2}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
