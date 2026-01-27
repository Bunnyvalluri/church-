"use client";

import Link from "next/link";
import { Church, Facebook, Instagram, Youtube, Twitter, Mail, Phone, MapPin } from "lucide-react";

const footerLinks = {
  about: [
    { name: "Our Story", href: "/about/story" },
    { name: "Leadership", href: "/about/leadership" },
    { name: "Our Beliefs", href: "/about/beliefs" },
    { name: "Ministries", href: "/about/ministries" },
    { name: "Mission & Vision", href: "/about/mission" },
  ],
  resources: [
    { name: "Sermons", href: "/sermons" },
    { name: "Events Calendar", href: "/events" },
    { name: "Blog & Articles", href: "/blog" },
    { name: "Prayer Requests", href: "/prayer" },
    { name: "Bible Study", href: "/resources/bible-study" },
    { name: "Media Library", href: "/resources/media" },
  ],
  getInvolved: [
    { name: "Join a Small Group", href: "/get-involved/small-groups" },
    { name: "Volunteer", href: "/get-involved/volunteer" },
    { name: "Serve", href: "/get-involved/serve" },
    { name: "Give Online", href: "/give" },
    { name: "Become a Member", href: "/membership" },
  ],
  connect: [
    { name: "Contact Us", href: "#contact" },
    { name: "Visit Us", href: "#about" },
    { name: "Service Times", href: "#services" },
    { name: "Locations", href: "#about" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative bg-gray-900 text-gray-300">
      {/* Gradient Top Border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500" />
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <Church className="h-8 w-8 text-purple-400" />
              <div className="flex flex-col">
                <span className="font-bold text-lg leading-tight text-white">
                  Kingdom of Christ
                </span>
                <span className="text-xs text-gray-400">
                  Ministries
                </span>
              </div>
            </Link>
            <p className="text-gray-400 mb-6">
              A place where faith meets community. Join us in worship, prayer, and
              growing together in Christ.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-purple-600 flex items-center justify-center transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-purple-600 flex items-center justify-center transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-purple-600 flex items-center justify-center transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-purple-600 flex items-center justify-center transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* About Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">About</h3>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-purple-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-purple-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Involved Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Get Involved</h3>
            <ul className="space-y-3">
              {footerLinks.getInvolved.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-purple-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Connect</h3>
            <ul className="space-y-4">
              {footerLinks.connect.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-purple-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-6 border-t border-gray-800">
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                <Phone className="h-4 w-4 text-purple-400" />
                <a href="tel:+919640943777" className="hover:text-purple-400 transition-colors">
                  +91 96409 43777
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Mail className="h-4 w-4 text-purple-400" />
                <a href="mailto:info@kingdomofchrist.org" className="hover:text-purple-400 transition-colors">
                  info@kingdomofchrist.org
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Kingdom of Christ Ministries. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="/privacy" className="hover:text-purple-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-purple-400 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
