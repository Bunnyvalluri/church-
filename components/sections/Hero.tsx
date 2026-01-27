"use client";

import { ArrowRight, Calendar, Users, Heart, Sparkles } from "lucide-react";
import Link from "next/link";

import { useLanguage } from "@/components/providers/LanguageProvider";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-900 via-purple-700 to-indigo-900"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        {/* Floating orbs with glow */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl animate-float" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-float animate-delay-500" />
        <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-indigo-500/25 rounded-full blur-3xl animate-float animate-delay-1000" />
        <div className="absolute bottom-40 right-1/3 w-64 h-64 bg-purple-400/20 rounded-full blur-3xl animate-pulse-slow" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-sm mb-8 animate-bounce-in shadow-lg shadow-purple-500/20">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="font-medium">{t.hero.prayerBoxSub}</span>
            <Sparkles className="h-4 w-4 text-yellow-300 animate-pulse" />
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 animate-fade-in-up">
            {t.hero.welcome}{" "}
            <span className="block mt-4 bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200 bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
              Kingdom of Christ Ministries
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-purple-100 mb-12 max-w-2xl mx-auto animate-fade-in-up animate-delay-200 leading-relaxed">
            {t.hero.subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-scale-in animate-delay-300">
            <Link
              href="#events"
              className="group px-8 py-4 bg-white text-purple-900 rounded-xl font-semibold hover:shadow-2xl hover:shadow-white/30 transition-all duration-300 hover:scale-110 hover:-translate-y-1 flex items-center justify-center gap-2 hover-lift"
            >
              {t.nav.events}
              <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
            <Link
              href="#contact"
              className="px-8 py-4 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white rounded-xl font-semibold hover:bg-white/20 hover:border-white/50 transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover-lift"
            >
              {t.hero.ctaPrimary}
            </Link>
          </div>

          {/* Stats - Staggered Animation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto stagger-children perspective">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all duration-500 hover:scale-105 hover:-translate-y-2 card-flip shadow-xl shadow-purple-900/20">
              <Users className="h-10 w-10 text-yellow-300 mx-auto mb-4 animate-bounce-in" />
              <div className="text-4xl font-bold text-white mb-2 animate-glow">1000+</div>
              <div className="text-purple-200 text-sm font-medium">Active Members</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all duration-500 hover:scale-105 hover:-translate-y-2 card-flip shadow-xl shadow-purple-900/20">
              <Calendar className="h-10 w-10 text-green-300 mx-auto mb-4 animate-bounce-in animate-delay-100" />
              <div className="text-4xl font-bold text-white mb-2 animate-glow">50+</div>
              <div className="text-purple-200 text-sm font-medium">Events Yearly</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all duration-500 hover:scale-105 hover:-translate-y-2 card-flip shadow-xl shadow-purple-900/20">
              <Heart className="h-10 w-10 text-pink-300 mx-auto mb-4 animate-bounce-in animate-delay-200" />
              <div className="text-4xl font-bold text-white mb-2 animate-glow">24/7</div>
              <div className="text-purple-200 text-sm font-medium">Prayer Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center p-2 backdrop-blur-sm">
          <div className="w-1.5 h-3 bg-white rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}
