"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { Music, Users2, Heart, BookHeart, Mic2, Calendar } from "lucide-react";

export default function Services() {
  const { t, language } = useLanguage();

  const services = [
    {
      icon: Users2,
      title: language === 'te' ? "ఉదయం ఆరాధన (వాచ్ టవర్)" : "Worship (Watch Tower)",
      time: language === 'te' ? "ఆదివారం ఉదయం 5:45" : "Sunday 5:45 AM",
      description: language === 'te' ? "వాక్యం ద్వారా దేవుని తెలుసుకోవడానికి మా మొదటి ఆరాధనలో చేరండి." : "Join our early morning Watch Tower service to seek God.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Music,
      title: language === 'te' ? "ఆరాధన (సండే సర్వీస్)" : "Worship (Sunday Service)",
      time: language === 'te' ? "ఆదివారం ఉదయం 8:30" : "Sunday 8:30 AM",
      description: language === 'te' ? "శక్తివంతమైన ఆరాధన మరియు దేవుని వాక్యాన్ని వినడానికి మాతో చేరండి." : "Join us for powerful worship and the word of God.",
      color: "from-purple-500 to-indigo-500",
    },
    {
      icon: BookHeart,
      title: language === 'te' ? "యువజన ఆరాధన (యూత్ సర్వీస్)" : "Worship (Youth Service)",
      time: language === 'te' ? "ఆదివారం ఉదయం 10:30" : "Sunday 10:30 AM",
      description: language === 'te' ? "సీనియర్ పాస్టర్ గంగారెడ్డి గారి ప్రత్యేక బైబిల్ ప్రవచనము మరియు సమావేశం." : "Special Sunday service and Bible message by Senior Pastor Gangareddy.",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Mic2,
      title: language === 'te' ? "ఆరాధన (ప్రేయర్)" : "Worship (Prayer)",
      time: language === 'te' ? "బుధవారం సా. 6:30" : "Wednesday 6:30 PM",
      description: language === 'te' ? "మధ్యవార ప్రార్థన కూడిక." : "Mid-week evening prayer meeting.",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: Heart,
      title: language === 'te' ? "హీలింగ్ ఆరాధన" : "Healing Worship",
      time: language === 'te' ? "ప్రతీ నెల 3వ శుక్రవారం సా. 4:00" : "3rd Friday 4:00 PM",
      description: language === 'te' ? "దేవుని స్వస్థత శక్తిని అనుభవించండి." : "Experience the healing power of God in this special service.",
      color: "from-pink-500 to-rose-500",
    },
    {
      icon: Calendar,
      title: language === 'te' ? "ఉపవాస ప్రార్థన" : "Fasting Prayer",
      time: language === 'te' ? "ప్రతి గురువారం ఉదయం 7 & 10" : "Thursday 7:00 AM & 10:00 AM",
      description: language === 'te' ? "ఉపవాస ప్రార్థన ద్వారా ఆత్మీయ బలం. (సంప్రదించండి: 91215 23544)" : "Spiritual strengthening through fasting prayer. (Contact: 91215 23544)",
      color: "from-indigo-500 to-purple-500",
    },
  ];

  return (
    <section id="services" className="py-24 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            {t.services.title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {t.services.subtitle}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="group relative bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                {/* Content */}
                <div className="relative z-10">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                    {service.title}
                  </h3>

                  <div className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${service.color} text-white text-sm font-medium mb-4`}>
                    {service.time}
                  </div>

                  <p className="text-gray-600 dark:text-gray-300">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            {t.services.ctaDesc}
          </p>
          <a
            href="#contact"
            className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105"
          >
            {t.services.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
