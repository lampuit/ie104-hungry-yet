import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex h-96 flex-col items-center justify-center">
      <div className="flex items-center space-x-2">
        <svg
          className="h-8 w-8 animate-spin text-amber-500"
          xmlns="http://www.w3.org/2000/svg"
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
        <span className="text-lg font-semibold text-amber-500">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
