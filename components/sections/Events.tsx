"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { Calendar, MapPin, Clock, Users, ArrowRight } from "lucide-react";

export default function Events() {
  const { t } = useLanguage();

  return (
    <section id="events" className="py-24 bg-slate-50 dark:bg-transparent relative z-10 transition-colors duration-300">
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white tracking-tight">
            {t.events.title.split(" ")[0]}{" "}
            <span className="text-gradient">{t.events.title.split(" ").slice(1).join(" ")}</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-white/70">
            {t.events.subtitle}
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.events.list.map((event, index) => (
            <div
              key={index}
              className="group bg-white dark:bg-white/[0.02] rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] dark:hover:shadow-2xl dark:hover:shadow-purple-500/10 transition-all duration-500 hover:-translate-y-2 border border-slate-100 dark:border-white/[0.05] dark:backdrop-blur-3xl"
            >
              {/* Event Header */}
              <div className={`h-2 bg-gradient-to-r ${event.color}`} />

              {/* Event Content */}
              <div className="p-6">
                {/* Category Badge */}
                <div className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${event.color} text-white text-xs font-semibold mb-4`}>
                  {event.category}
                </div>

                <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
                  {event.title}
                </h3>

                {/* Event Details */}
                <div className="space-y-4 mb-8 font-medium">
                  <div className="flex items-center gap-3 text-slate-600 dark:text-white/70">
                    <Calendar className="h-5 w-5 text-purple-600" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600 dark:text-white/70">
                    <Clock className="h-5 w-5 text-purple-600" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600 dark:text-white/70">
                    <MapPin className="h-5 w-5 text-purple-600" />
                    <span>{event.location}</span>
                  </div>
                </div>

                {/* Register Button */}
                <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 flex items-center justify-center gap-2 group-hover:scale-105 active:scale-95">
                  {t.events.register}
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Events */}
        <div className="mt-16 text-center">
          <a
            href="/events"
            className="inline-block px-8 py-4 bg-white dark:bg-white/[0.02] text-purple-600 dark:text-purple-300 border border-purple-600/20 dark:border-purple-400/20 rounded-2xl font-semibold hover:bg-purple-50 dark:hover:bg-purple-900/20 dark:hover:border-purple-400/40 transition-all duration-300 hover:scale-105 backdrop-blur-md"
          >
            {t.events.viewAll}
          </a>
        </div>
      </div>
    </section>
  );
}
