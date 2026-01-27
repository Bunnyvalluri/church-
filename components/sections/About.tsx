"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { Church, Heart, Users, BookOpen } from "lucide-react";

export default function About() {
  const { t } = useLanguage();

  const values = [
    {
      icon: Church,
      title: t.about.values.worship,
      description: t.about.values.worshipDesc,
      color: "from-purple-500 to-indigo-500",
    },
    {
      icon: Heart,
      title: t.about.values.community,
      description: t.about.values.communityDesc,
      color: "from-pink-500 to-rose-500",
    },
    {
      icon: Users,
      title: t.about.values.fellowship,
      description: t.about.values.fellowshipDesc,
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: BookOpen,
      title: t.about.values.teaching,
      description: t.about.values.teachingDesc,
      color: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <section id="about" className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            {t.about.title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {t.about.subtitle}
          </p>
        </div>

        {/* Mission Statement */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 border border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              {t.about.missionTitle}
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              {t.about.missionText}
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div
                key={index}
                className="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-200 dark:border-gray-700"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${value.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Church Info */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl p-8 md:p-12 text-white">
            {/* Pastor Info */}
            <div className="text-center mb-8 pb-8 border-b border-white/20">
              <h3 className="text-3xl font-bold mb-2">{t.about.pastor}</h3>
              <p className="text-2xl text-yellow-200">{t.about.pastorName}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">{t.hero.ctaPrimary}</h3>
                <p className="text-purple-100 mb-2">
                  15-201, Vivekananda Nagar, Srinivas Nagar
                </p>
                <p className="text-purple-100 mb-2">
                  Jeedimetla, Hyderabad
                </p>
                <p className="text-purple-100 mb-4">
                  Telangana 500055
                </p>
                <p className="text-lg font-semibold">
                  📞 +91 96409 43777
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4">{t.services.title}</h3>
                <div className="space-y-3 text-purple-100">
                  <div className="bg-white/10 rounded-lg p-3">
                    <p className="font-semibold text-yellow-200">📍 {t.services.shapur.title.split(" ")[0]}</p>
                    <p className="text-sm">{t.services.friday} & {t.services.sunday}: 6:00 PM</p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3">
                    <p className="font-semibold text-yellow-200">📍 {t.services.subhash.title.split(" ")[0]} {t.services.subhash.title.split(" ")[1]}</p>
                    <p className="text-sm">{t.services.sunday}: 5:45 AM - 8:30 AM</p>
                    <p className="text-sm">{t.services.subhash.second}</p>
                    <p className="text-sm">{t.services.subhash.thursday}</p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3">
                    <p className="font-semibold text-yellow-200">📍 {t.services.bahadur.title.split(" ")[0]}</p>
                    <p className="text-sm">{t.services.sunday}: 11:00 AM - 2:00 PM</p>
                    <p className="text-sm">{t.services.bahadur.tuesday}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
