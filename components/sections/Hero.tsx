"use client";

import { ArrowRight, Calendar, Users, Heart, Sparkles, Cross } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function Hero() {
  const { t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 50, damping: 15 },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] dark:opacity-5" />
        {/* Colorful Floating orbs tailored to the brand (Purple/Gold) */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 left-[-10%] w-[40rem] h-[40rem] bg-gradient-to-r from-purple-600/30 to-indigo-600/30 rounded-full blur-[120px] mix-blend-screen" 
        />
        <motion.div 
          animate={{ scale: [1, 1.1, 1], x: [0, -40, 0], y: [0, -50, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[-10%] right-[-5%] w-[35rem] h-[35rem] bg-gradient-to-r from-amber-500/20 to-orange-400/20 rounded-full blur-[120px] mix-blend-screen" 
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 pt-28 pb-16 sm:py-32 mt-16">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="flex justify-center mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-full text-foreground shadow-2xl shadow-amber-500/10 hover:border-amber-500/30 transition-colors duration-300">
              <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-500 animate-pulse" />
              <span className="font-medium tracking-wide text-xs sm:text-sm md:text-base">{t.hero.prayerBoxSub}</span>
              <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-500 animate-pulse" />
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-[6rem] font-black text-foreground mb-4 sm:mb-6 tracking-tighter leading-[1.1] drop-shadow-sm font-outfit"
          >
            {t.hero.welcome}{" "}
            <span className="block mt-1 sm:mt-2 bg-gradient-to-r from-purple-600 via-amber-500 to-indigo-600 bg-clip-text text-transparent pb-2 bg-[length:200%_auto] animate-shimmer">
              Kingdom of Christ
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            variants={itemVariants}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed font-medium px-2 sm:px-0"
          >
            {t.hero.subtitle}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 sm:gap-5 justify-center mb-12 sm:mb-20 px-4 sm:px-0">
            <Link
              href="#events"
              className="group relative px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full font-bold overflow-hidden shadow-2xl shadow-purple-500/25 transition-all hover:scale-105 text-sm sm:text-base"
            >
              <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full -translate-x-full transition-transform duration-500 ease-out skew-x-12" />
              <span className="relative flex items-center justify-center gap-2">
                {t.nav.events}
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link
              href="#contact"
              className="px-6 sm:px-8 py-3.5 sm:py-4 bg-white/5 dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-white/10 text-foreground rounded-full font-bold hover:bg-gray-50 dark:hover:bg-white/10 transition-all hover:scale-105 text-sm sm:text-base"
            >
              {t.hero.ctaPrimary}
            </Link>
          </motion.div>

          {/* Stats - Staggered Animation */}
          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto px-2 sm:px-0"
          >
            {[
              { icon: Users, count: "1000+", label: "Active Members", color: "from-purple-500 to-indigo-500", shadow: "shadow-purple-500/20" },
              { icon: Calendar, count: "50+", label: "Events Yearly", color: "from-amber-400 to-orange-500", shadow: "shadow-amber-500/20" },
              { icon: Heart, count: "24/7", label: "Prayer Support", color: "from-rose-400 to-red-500", shadow: "shadow-rose-500/20" }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                className="relative group rounded-3xl p-[1px] bg-gradient-to-b from-white/40 to-white/10 dark:from-white/10 dark:to-transparent"
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10 bg-white/5 dark:bg-white/5" />
                <div className="bg-white/40 dark:bg-black/40 backdrop-blur-xl rounded-3xl p-5 sm:p-8 h-full border border-white/20 dark:border-white/5 shadow-2xl shadow-black/5 flex flex-col items-center">
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-lg ${stat.shadow} group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-black text-foreground mb-1 font-outfit">{stat.count}</div>
                  <div className="text-muted-foreground font-semibold uppercase tracking-widest text-xs text-center">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-foreground/20 rounded-full flex items-start justify-center p-1 backdrop-blur-sm">
          <motion.div 
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 bg-foreground/50 rounded-full" 
          />
        </div>
      </motion.div>
    </section>
  );
}
