"use client";

import { Play, Calendar, User, Eye, X } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

const sermons = [
  {
    title: "The Power of Faith",
    pastor: "Pastor John David",
    date: "Jan 21, 2026",
    views: "1.2K",
    thumbnail: "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=800&q=80",
    duration: "45:30",
    category: "Faith",
    videoId: "M57yrL-0tSs", // Real working video
  },
  {
    title: "Walking in Love",
    pastor: "Pastor Sarah Johnson",
    date: "Jan 14, 2026",
    views: "980",
    thumbnail: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=800&q=80",
    duration: "38:15",
    category: "Love",
    videoId: "wz0z7-6-m1Q",
  },
  {
    title: "Hope in Difficult Times",
    pastor: "Pastor John David",
    date: "Jan 7, 2026",
    views: "1.5K",
    thumbnail: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&q=80",
    duration: "42:00",
    category: "Hope",
    videoId: "F7U5d9W8Z8k",
  },
  {
    title: "The Grace of God",
    pastor: "Pastor Michael Brown",
    date: "Dec 31, 2025",
    views: "2.1K",
    thumbnail: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&q=80",
    duration: "50:20",
    category: "Grace",
    videoId: "K-C2O7bEopg",
  },
  {
    title: "Living with Purpose",
    pastor: "Pastor Sarah Johnson",
    date: "Dec 24, 2025",
    views: "1.8K",
    thumbnail: "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=800&q=80",
    duration: "44:45",
    category: "Purpose",
    videoId: "J_M37s4w1oA",
  },
  {
    title: "The Joy of Salvation",
    pastor: "Pastor John David",
    date: "Dec 17, 2025",
    views: "1.3K",
    thumbnail: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=80",
    duration: "39:30",
    category: "Salvation",
    videoId: "T4b-I5D-ksw",
  },
];

import { useLanguage } from "@/components/providers/LanguageProvider";

export default function Sermons() {
  const { t } = useLanguage();
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  return (
    <section id="sermons" className="py-24 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            {t.sermons.title.split(" ")[0]}{" "}
            <span className="text-gradient">{t.sermons.title.split(" ").slice(1).join(" ")}</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {t.sermons.subtitle}
          </p>
        </div>

        {/* Sermons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sermons.map((sermon, index) => (
            <div
              key={index}
              className="group bg-gray-50 dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-200 dark:border-gray-700"
            >
              {/* Thumbnail */}
              <div
                className="relative h-48 overflow-hidden cursor-pointer"
                onClick={() => setSelectedVideo(sermon.videoId)}
              >
                <Image
                  src={sermon.thumbnail}
                  alt={sermon.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {/* Play Overlay */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                    <Play className="h-8 w-8 text-purple-600 ml-1" fill="currentColor" />
                  </div>
                </div>
                {/* Duration Badge */}
                <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/70 text-white text-xs font-semibold rounded">
                  {sermon.duration}
                </div>
                {/* Category Badge */}
                <div className="absolute top-3 left-3 px-3 py-1 bg-purple-600 text-white text-xs font-semibold rounded-full">
                  {sermon.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {sermon.title}
                </h3>

                {/* Meta Info */}
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-purple-600" />
                    <span>{sermon.pastor}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-purple-600" />
                      <span>{sermon.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4 text-purple-600" />
                      <span>{sermon.views} {t.sermons.views}</span>
                    </div>
                  </div>
                </div>

                {/* Watch Button */}
                <button
                  onClick={() => setSelectedVideo(sermon.videoId)}
                  className="mt-4 w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 flex items-center justify-center gap-2 transform active:scale-95"
                >
                  <Play className="h-5 w-5" fill="currentColor" />
                  {t.sermons.watch}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Sermons */}
        <div className="mt-16 text-center">
          <a
            href="/sermons"
            className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105"
          >
            {t.sermons.viewAll}
          </a>
        </div>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl animate-scale-in">
            {/* Close Button */}
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Video Player (Placeholder) */}
            <div className="relative pt-[56.25%] bg-gray-900">
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
                title="Sermon Video"
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
