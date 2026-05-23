import React from "react";

const Loading = ({
  label = "Loading messages...",
  fullScreen = false,
}) => {
  const wrapperClass = fullScreen
    ? "min-h-[100dvh] w-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"
    : "w-full py-10 md:py-14";

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={label}
      className={`flex flex-col items-center justify-center gap-8 ${wrapperClass}`}
    >
      {/* Chat-style skeleton preview */}
      <div className="w-full max-w-sm px-6 space-y-3" aria-hidden="true">
        <div className="flex justify-start">
          <div className="relative h-11 w-[72%] overflow-hidden rounded-2xl rounded-bl-sm bg-slate-700/50">
            <div className="loading-shimmer absolute inset-0" />
          </div>
        </div>

        <div className="flex justify-end">
          <div className="relative h-9 w-[48%] overflow-hidden rounded-2xl rounded-br-sm bg-blue-600/25">
            <div className="loading-shimmer absolute inset-0 [animation-delay:0.2s]" />
          </div>
        </div>

        <div className="flex justify-start">
          <div className="relative h-14 w-[85%] overflow-hidden rounded-2xl rounded-bl-sm bg-slate-700/50">
            <div className="loading-shimmer absolute inset-0 [animation-delay:0.4s]" />
          </div>
        </div>

        <div className="flex justify-end">
          <div className="relative h-10 w-[60%] overflow-hidden rounded-2xl rounded-br-sm bg-blue-600/25">
            <div className="loading-shimmer absolute inset-0 [animation-delay:0.6s]" />
          </div>
        </div>
      </div>

      {/* Indicator + label */}
      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="loading-dot h-2 w-2 rounded-full bg-blue-400" />
          <span className="loading-dot h-2 w-2 rounded-full bg-blue-500 [animation-delay:0.15s]" />
          <span className="loading-dot h-2 w-2 rounded-full bg-purple-400 [animation-delay:0.3s]" />
        </div>

        <p className="text-sm font-medium text-slate-400 tracking-wide animate-pulse">
          {label}
        </p>
      </div>
    </div>
  );
};

export default Loading;
