"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen text-white">

      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/bg.jpg"   // put image inside /public/bg.jpg
          alt="background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6 border-b border-white/10">
        <h1 className="text-2xl font-bold tracking-wide">
          AI Studio
        </h1>

        <div className="flex gap-6 text-sm font-medium">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/dashboard/upload">Upload</Link>
          <Link href="/dashboard/videos">Videos</Link>
          <Link href="/dashboard/analytics">Analytics</Link>
        </div>

        <Link
          href="/dashboard"
          className="bg-white text-black px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-200 transition"
        >
          Enter App
        </Link>
      </nav>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center text-center h-[80vh] px-6">
        <h2 className="text-5xl font-bold max-w-3xl leading-tight">
          Create, Enhance & Manage Videos with AI
        </h2>

        <p className="mt-6 max-w-xl text-gray-300 text-lg">
          Upload videos, process them using AI, track analytics and manage your
          content — all in one place.
        </p>

        <div className="flex gap-4 mt-10">
          <Link
            href="/dashboard/upload"
            className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition"
          >
            Upload Video
          </Link>

          <Link
            href="/dashboard"
            className="border border-white/40 px-6 py-3 rounded-xl hover:bg-white/10 transition"
          >
            Open Dashboard
          </Link>
        </div>
      </main>
    </div>
  );
}