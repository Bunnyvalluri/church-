export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm transition-all duration-300">
      <div className="relative">
        {/* Apple-style spinner */}
        <div className="w-12 h-12">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className={`absolute top-0 left-[22px] w-[3px] h-[12px] rounded-full bg-gray-400 dark:bg-gray-500 origin-[50%_24px] animate-spinner-fade`}
              style={{
                transform: `rotate(${i * 30}deg)`,
                animationDelay: `${-1.2 + i * 0.1}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
