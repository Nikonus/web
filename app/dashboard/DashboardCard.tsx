"use client";

import Link from "next/link";
import { ReactNode } from "react";

interface Props {
  title: string;
  value: string;
  href: string;
  buttonText: string;
  icon?: ReactNode;
}

export default function DashboardCard({
  title,
  value,
  href,
  buttonText,
  icon,
}: Props) {
  return (
    <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 flex flex-col justify-between">
      
      {/* Top */}
      <div>
        <div className="flex items-center justify-between">
          <p className="text-gray-400">{title}</p>
          {icon}
        </div>

        <h3 className="text-3xl font-bold mt-3">{value}</h3>
      </div>

      {/* Button */}
      <Link
        href={href}
        className="mt-6 inline-flex items-center justify-center rounded-lg bg-white text-black px-4 py-2 text-sm font-medium hover:bg-gray-200 transition"
      >
        {buttonText}
      </Link>
    </div>
  );
}