import React from "react";

export default function Spinner({ message = "Loading..." }) {
  return (
    <div className="flex items-center justify-center py-10 text-gray-600">
      <svg
        className="w-6 h-6 mr-2 text-blue-500 animate-spin"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8H4z"
        ></path>
      </svg>
      <span className="text-sm">{message}</span>
    </div>
  );
}
