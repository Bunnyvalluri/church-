"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { Languages } from "lucide-react";

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === "en" ? "te" : "en")}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all border border-gray-200 dark:border-gray-700 hover:border-purple-300 group"
      aria-label="Toggle Language"
    >
      <Languages className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400" />
      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 group-hover:text-purple-700 dark:group-hover:text-purple-300">
        {language === "en" ? "TE" : "EN"}
      </span>
    </button>
  );
}
