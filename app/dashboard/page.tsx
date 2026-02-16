import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOptions);

  // If logged in → go to dashboard
  if (session) {
    redirect("/dashboard");
  }

  // If not logged in → show landing
  return (
    <div className="relative min-h-screen text-white overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">

      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10">
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'linear-gradient(to right, #4f4f4f2e 1px, transparent 1px), linear-gradient(to bottom, #4f4f4f2e 1px, transparent 1px)',
            backgroundSize: '14px 24px'
          }}
        />
        
        {/* Floating gradient orbs */}
        <div 
          className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          style={{
            animation: 'blob 7s infinite'
          }}
        />
        <div 
          className="absolute top-0 -right-4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          style={{
            animation: 'blob 7s infinite 2s'
          }}
        />
        <div 
          className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          style={{
            animation: 'blob 7s infinite 4s'
          }}
        />
      </div>

      {/* Navbar */}
      <nav className="relative flex justify-between items-center px-8 py-6 border-b border-white/10 backdrop-blur-sm bg-black/20">
       {session && (
  <div className="mx-auto max-w-5xl mt-8 px-6">
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
      <h3 className="text-xl font-semibold mb-4">
        Welcome back USER
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Link
          href="/dashboard"
          className="bg-purple-500/80 hover:bg-purple-500 rounded-xl p-4 text-center transition"
        >
          Dashboard
        </Link>

        <Link
          href="/dashboard/upload"
          className="bg-pink-500/80 hover:bg-pink-500 rounded-xl p-4 text-center transition"
        >
          Upload Video
        </Link>

        <Link
          href="/dashboard/videos"
          className="bg-indigo-500/80 hover:bg-indigo-500 rounded-xl p-4 text-center transition"
        >
          My Videos
        </Link>

        <Link
          href="/dashboard/analytics"
          className="bg-blue-500/80 hover:bg-blue-500 rounded-xl p-4 text-center transition"
        >
          Analytics
        </Link>
      </div>
    </div>
  </div>
)}
      </nav>

      {/* Hero Section */}
      <main className="relative flex flex-col items-center justify-center text-center min-h-[85vh] px-6">
        
        {/* Status Badge */}
        <div className="mb-8 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm inline-flex items-center gap-2 hover:bg-white/15 transition-all duration-300">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="font-medium">New: AI-Powered Video Analytics</span>
        </div>

        {/* Main Heading */}
        <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold max-w-5xl leading-tight mb-6">
          <span className="inline-block bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
            Transform Your Videos
          </span>
          <br />
          <span className="inline-block bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            With AI Power
          </span>
        </h2>

        {/* Subtitle */}
        <p className="mt-6 text-lg sm:text-xl text-gray-300 max-w-2xl leading-relaxed">
          Upload videos, process them with cutting-edge AI, and track real-time analytics —
          all inside one powerful creator dashboard.
        </p>

        {/* Feature Pills */}
        <div className="flex flex-wrap justify-center gap-3 mt-10 max-w-2xl">
          <div className="group px-5 py-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:scale-105 transition-all duration-300 cursor-default">
            <div className="flex items-center gap-2">
              <span className="text-2xl group-hover:scale-110 transition-transform duration-300">🎬</span>
              <span className="font-semibold text-sm">Smart Upload</span>
            </div>
          </div>
          <div className="group px-5 py-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:scale-105 transition-all duration-300 cursor-default">
            <div className="flex items-center gap-2">
              <span className="text-2xl group-hover:scale-110 transition-transform duration-300">🤖</span>
              <span className="font-semibold text-sm">AI Processing</span>
            </div>
          </div>
          <div className="group px-5 py-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:scale-105 transition-all duration-300 cursor-default">
            <div className="flex items-center gap-2">
              <span className="text-2xl group-hover:scale-110 transition-transform duration-300">📊</span>
              <span className="font-semibold text-sm">Live Analytics</span>
            </div>
          </div>
          <div className="group px-5 py-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:scale-105 transition-all duration-300 cursor-default">
            <div className="flex items-center gap-2">
              <span className="text-2xl group-hover:scale-110 transition-transform duration-300">⚡</span>
              <span className="font-semibold text-sm">Lightning Fast</span>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-12">
          <Link
            href="/register"
            className="group relative overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl font-semibold shadow-lg shadow-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/60 transition-all duration-300 hover:scale-105"
          >
            <span className="relative z-10 flex items-center gap-2">
              Get Started Free
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>

          <Link
            href="/login"
            className="group px-8 py-4 rounded-xl border-2 border-white/30 hover:bg-white/10 hover:border-white/50 backdrop-blur-sm transition-all duration-300 hover:scale-105 font-semibold"
          >
            <span className="flex items-center gap-2">
              Sign In
              <svg className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </Link>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 flex flex-wrap justify-center items-center gap-6 sm:gap-8 text-sm text-gray-400">
          <div className="flex items-center gap-2 hover:text-gray-300 transition-colors duration-300">
            <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">No credit card required</span>
          </div>
          <div className="flex items-center gap-2 hover:text-gray-300 transition-colors duration-300">
            <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">Free forever plan</span>
          </div>
          <div className="flex items-center gap-2 hover:text-gray-300 transition-colors duration-300">
            <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">Cancel anytime</span>
          </div>
        </div>

      </main>
    </div>
  );
}