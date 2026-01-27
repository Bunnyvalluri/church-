"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-14 h-7 bg-gray-200 dark:bg-gray-700 rounded-full" />
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative w-14 h-7 bg-gradient-to-r from-purple-500 to-indigo-500 dark:from-indigo-600 dark:to-purple-600 rounded-full p-1 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50 dark:hover:shadow-indigo-500/50 group"
      aria-label="Toggle theme"
    >
      {/* Toggle Circle */}
      <div
        className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-md transform transition-all duration-300 flex items-center justify-center ${theme === "dark" ? "translate-x-7" : "translate-x-0"
          }`}
      >
        {theme === "dark" ? (
          <Moon className="w-3 h-3 text-indigo-600" />
        ) : (
          <Sun className="w-3 h-3 text-purple-600" />
        )}
      </div>

      {/* Background Icons */}
      <div className="flex items-center justify-between px-1">
        <Sun className="w-3 h-3 text-white/70" />
        <Moon className="w-3 h-3 text-white/70" />
      </div>
    </button>
  );
}
