export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gray-950">
      {/* Ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* Animated cross/logo */}
        <div className="relative w-16 h-16">
          {/* Vertical bar */}
          <div
            className="absolute left-1/2 top-0 -translate-x-1/2 w-2 h-full rounded-full bg-gradient-to-b from-purple-400 to-indigo-500"
            style={{ animation: "pulse 1.5s ease-in-out infinite" }}
          />
          {/* Horizontal bar */}
          <div
            className="absolute top-1/3 left-0 w-full h-2 rounded-full bg-gradient-to-r from-purple-400 to-amber-400"
            style={{ animation: "pulse 1.5s ease-in-out infinite 0.2s" }}
          />
          {/* Center glow */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-amber-400 rounded-full blur-sm"
            style={{ animation: "pulse 1s ease-in-out infinite" }}
          />
        </div>

        {/* Church name */}
        <div className="text-center">
          <p className="text-white font-bold text-lg tracking-wide">Kingdom of Christ</p>
          <p className="text-purple-400 text-xs tracking-[0.3em] uppercase">Ministries</p>
        </div>

        {/* Progress bar */}
        <div className="w-40 h-0.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 via-amber-400 to-indigo-500 rounded-full"
            style={{ animation: "loading-bar 1.5s ease-in-out infinite" }}
          />
        </div>
      </div>

      <style>{`
        @keyframes loading-bar {
          0% { width: 0%; margin-left: 0; }
          50% { width: 70%; margin-left: 15%; }
          100% { width: 0%; margin-left: 100%; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
