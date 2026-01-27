"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { Calendar, MapPin, Clock, Users, ArrowRight } from "lucide-react";

export default function Events() {
  const { t } = useLanguage();

  return (
    <section id="events" className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            {t.events.title.split(" ")[0]}{" "}
            <span className="text-gradient">{t.events.title.split(" ").slice(1).join(" ")}</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {t.events.subtitle}
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.events.list.map((event, index) => (
            <div
              key={index}
              className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-200 dark:border-gray-700"
            >
              {/* Event Header */}
              <div className={`h-2 bg-gradient-to-r ${event.color}`} />

              {/* Event Content */}
              <div className="p-6">
                {/* Category Badge */}
                <div className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${event.color} text-white text-xs font-semibold mb-4`}>
                  {event.category}
                </div>

                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {event.title}
                </h3>

                {/* Event Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                    <Calendar className="h-5 w-5 text-purple-600" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                    <Clock className="h-5 w-5 text-purple-600" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                    <MapPin className="h-5 w-5 text-purple-600" />
                    <span>{event.location}</span>
                  </div>
                </div>

                {/* Register Button */}
                <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 flex items-center justify-center gap-2 group-hover:scale-105">
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
            className="inline-block px-8 py-4 bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 border-2 border-purple-600 dark:border-purple-400 rounded-lg font-semibold hover:bg-purple-600 hover:text-white dark:hover:bg-purple-600 dark:hover:text-white transition-all duration-300 hover:scale-105"
          >
            {t.events.viewAll}
          </a>
        </div>
      </div>
    </section>
  );
}
