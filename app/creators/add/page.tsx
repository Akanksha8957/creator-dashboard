"use client";

import { useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { UploadCloud, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";

export default function AddCreatorPage() {
    const [name, setName] = useState("");
    const [platform, setPlatform] = useState("Instagram");
    const [username, setUsername] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const formData = new FormData();
        formData.append("name", name);
        formData.append("platform", platform);
        formData.append("username", username);
        if (image) {
            formData.append("image", image);
        }

        try {
            await api.post("/creators/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            router.push("/creators");
        } catch (err: unknown) {
            const errorMessage = (err as { response?: { data?: { detail?: string } } })?.response?.data?.detail || "Failed to add creator";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {/* Blue Header Section */}
            <div className="relative bg-sky-600 pb-32 pt-12">
                <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-6">
                        <Link
                            href="/creators"
                            className="inline-flex items-center text-sky-100 hover:text-white transition-colors"
                        >
                            <ArrowLeft className="h-5 w-5 mr-2" />
                            Back to Creators
                        </Link>
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Add New Creator</h1>
                    <p className="text-sky-100 mt-2">Enter creator details to start tracking analytics.</p>
                </div>
            </div>

            {/* Content Section with Overlap */}
            <div className="relative mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 -mt-20 pb-12">
                <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
                    <div className="space-y-6">
                        {/* Display Name */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-1">Display Name</label>
                            <input
                                type="text"
                                id="name"
                                required
                                className="block w-full rounded-lg border-slate-200 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm p-3 border transition-colors bg-slate-50 focus:bg-white"
                                placeholder="e.g. John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        {/* Platform */}
                        <div>
                            <label htmlFor="platform" className="block text-sm font-semibold text-slate-700 mb-1">Platform</label>
                            <select
                                id="platform"
                                className="block w-full rounded-lg border-slate-200 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm p-3 border transition-colors bg-slate-50 focus:bg-white"
                                value={platform}
                                onChange={(e) => setPlatform(e.target.value)}
                            >
                                <option value="Instagram">Instagram</option>
                                <option value="YouTube">YouTube</option>
                                <option value="X">X (Twitter)</option>
                            </select>
                        </div>

                        {/* Username */}
                        <div>
                            <label htmlFor="username" className="block text-sm font-semibold text-slate-700 mb-1">Username / Handle</label>
                            <div className="relative rounded-md shadow-sm">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <span className="text-slate-400 sm:text-sm font-medium">@</span>
                                </div>
                                <input
                                    type="text"
                                    id="username"
                                    required
                                    className="block w-full rounded-lg border-slate-200 pl-8 focus:border-sky-500 focus:ring-sky-500 sm:text-sm p-3 border transition-colors bg-slate-50 focus:bg-white"
                                    placeholder="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Image Upload */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Profile Image</label>
                            <div className="mt-1 flex justify-center rounded-xl border-2 border-dashed border-slate-300 px-6 pt-10 pb-10 hover:bg-slate-50 transition-colors group relative cursor-pointer">
                                <div className="space-y-1 text-center">
                                    <div className="mx-auto h-12 w-12 text-sky-500 bg-sky-50 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                                        <UploadCloud className="h-6 w-6" />
                                    </div>
                                    <div className="text-sm text-slate-600">
                                        <label
                                            htmlFor="file-upload"
                                            className="relative cursor-pointer rounded-md font-medium text-sky-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-sky-500 focus-within:ring-offset-2 hover:text-sky-500"
                                        >
                                            <span>Click to upload</span>
                                            <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleImageChange} accept="image/*" />
                                        </label>
                                        <span className="pl-1">or drag and drop</span>
                                    </div>
                                    <p className="text-xs text-slate-400">PNG, JPG, GIF up to 5MB</p>
                                    {image && (
                                        <div className="mt-4 flex items-center justify-center text-sm text-emerald-600 font-semibold bg-emerald-50 py-1 px-3 rounded-full">
                                            ✓ {image.name}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {error && (
                        <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-lg text-red-600 text-sm flex items-center">
                            <span className="mr-2">⚠️</span> {error}
                        </div>
                    )}

                    <div className="mt-8">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex w-full justify-center items-center rounded-xl bg-sky-600 px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-sky-200 hover:bg-sky-500 hover:shadow-sky-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200 transform hover:-translate-y-0.5"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                                    Adding Creator...
                                </>
                            ) : "Add Creator"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
