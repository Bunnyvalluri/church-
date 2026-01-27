import type { Metadata } from "next";
import Link from "next/link";
import { Heart, Phone, Mail, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Prayer Requests | Kingdom of Christ Ministries",
  description: "Submit your prayer request and receive prayer support from our church family",
};

export default function PrayerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero */}
      <section className="relative py-20 bg-gradient-to-r from-purple-600 to-indigo-600 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white text-sm mb-6 animate-bounce-in">
              <Heart className="h-4 w-4" />
              <span>We're Here for You</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in-up">
              Prayer Requests
            </h1>
            <p className="text-xl text-purple-100 animate-fade-in-up animate-delay-200">
              We believe in the power of prayer
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">

            {/* Intro */}
            <div className="text-center mb-12 animate-fade-in-up">
              <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                Our prayer team is here to stand with you in faith. Submit your prayer request below,
                and we will lift you up in prayer.
              </p>
            </div>

            {/* How It Works */}
            <div className="grid md:grid-cols-4 gap-6 mb-16 stagger-children">
              {[
                { step: "1", title: "Submit", desc: "Share your prayer request" },
                { step: "2", title: "Receive", desc: "Our team gets notified" },
                { step: "3", title: "Pray", desc: "We pray for you" },
                { step: "4", title: "Updates", desc: "Receive encouragement" },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                    {item.step}
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Prayer Form */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl mb-12 animate-scale-in">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Submit Your Prayer Request
              </h2>
              <form className="space-y-6">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                    Prayer Category
                  </label>
                  <select className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all">
                    <option>Select a category</option>
                    <option>Health & Healing</option>
                    <option>Family & Relationships</option>
                    <option>Financial Needs</option>
                    <option>Spiritual Growth</option>
                    <option>Guidance & Direction</option>
                    <option>Thanksgiving & Praise</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                    Prayer Request
                  </label>
                  <textarea
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="Share your prayer request..."
                  ></textarea>
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="anonymous"
                    className="mt-1 w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                  />
                  <label htmlFor="anonymous" className="text-gray-700 dark:text-gray-300">
                    Keep my prayer request anonymous (only visible to prayer team)
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-2xl transition-all duration-300 hover:scale-105 hover-lift"
                >
                  Submit Prayer Request
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="grid md:grid-cols-3 gap-6 stagger-children">
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl p-6 text-center">
                <Phone className="h-8 w-8 text-purple-600 dark:text-purple-400 mx-auto mb-3" />
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Call Us</h3>
                <a href="tel:+919640943777" className="text-purple-600 dark:text-purple-400 hover:underline">
                  +91 96409 43777
                </a>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl p-6 text-center">
                <Mail className="h-8 w-8 text-purple-600 dark:text-purple-400 mx-auto mb-3" />
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Email Us</h3>
                <a href="mailto:prayer@kingdomofchrist.org" className="text-purple-600 dark:text-purple-400 hover:underline">
                  prayer@kingdomofchrist.org
                </a>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl p-6 text-center">
                <Clock className="h-8 w-8 text-purple-600 dark:text-purple-400 mx-auto mb-3" />
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">24/7 Support</h3>
                <p className="text-gray-600 dark:text-gray-400">Always here for you</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Prayer Meeting Times */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-indigo-600">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Join Our Prayer Meetings
            </h2>
            <div className="grid md:grid-cols-2 gap-6 text-left mb-8">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
                <h3 className="font-bold text-white mb-2">Thursday Evening</h3>
                <p className="text-purple-100">Subhash Nagar Location</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
                <h3 className="font-bold text-white mb-2">2nd Tuesday</h3>
                <p className="text-purple-100">Bahadurpally Location</p>
              </div>
            </div>
            <Link
              href="/#contact"
              className="inline-block px-8 py-4 bg-white text-purple-900 rounded-xl font-semibold hover:shadow-2xl transition-all duration-300 hover:scale-105 hover-lift"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
