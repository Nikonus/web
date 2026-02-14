"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import axiosInstance from "@/lib/axios";
import Link from "next/link";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) return;

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      setError(null);
      setLoading(true);

      await axiosInstance.post("/api/login", { email, password });

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="h-[100vh] items-center flex justify-center px-5 lg:px-0">
        <div className="max-w-screen-xl bg-white border shadow sm:rounded-lg flex justify-center flex-1">

          <div className="flex-1 bg-blue-900 text-center hidden md:flex">
            <div
              className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
              style={{
                backgroundImage:
                  "url(https://www.tailwindtap.com/assets/common/marketing.svg)",
              }}
            ></div>
          </div>

          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div className="flex flex-col items-center">

              <div className="text-center">
                <h1 className="text-2xl xl:text-4xl font-extrabold text-blue-900">
                  User Sign in
                </h1>
                <p className="text-[12px] text-gray-500">
                  Hey enter your details to sign in to your account
                </p>
              </div>

              <div className="w-full flex-1 mt-8">
                <div className="mx-auto max-w-xs flex flex-col gap-4">

                  {error && (
                    <p className="text-red-500 text-sm text-center">
                      {error}
                    </p>
                  )}

                  <input
                    className="w-full px-5 py-3 rounded-lg font-medium text-black bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <input
                    className="w-full px-5 py-3 rounded-lg font-medium text-black bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-5 tracking-wide font-semibold bg-blue-900 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg
                      className="w-6 h-6 -ml-2"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                      <circle cx="8.5" cy="7" r="4" />
                      <polyline points="16 11 12 7 8 11" />
                    </svg>
                    <span className="ml-3">
                      {loading ? "Signing In..." : "Sign In"}
                    </span>
                  </button>

                  <p className="mt-6 text-xs text-gray-600 text-center">
                    Don't have an account?{" "}
                    <Link href="/register">
                      <span className="text-blue-900 font-semibold cursor-pointer">
                        Sign up
                      </span>
                    </Link>
                  </p>

                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </form>
  );
}

export default LoginPage;