"use client";
import React from "react";

export default function CardWrapper({ children, className = "", delay = 0 }) {
  return (
    <div
      className={`relative h-full bg-[#1a1c35] rounded-3xl p-1 transition-transform duration-300 transform hover:scale-[1.02] hover:shadow-2xl will-change-transform ${className}`}
      style={{
        animationDelay: `${delay}s`,
        background:
          "linear-gradient(45deg, rgba(26,28,53,0.9), rgba(17,18,36,0.9))",
        transformOrigin: "center center",
      }}
    >
      <div className="absolute inset-0.5 rounded-[22px] bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative bg-[#1a1c35] rounded-[22px] p-6 h-full">
        {children}
      </div>
    </div>
  );
}
