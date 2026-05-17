import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";
import Navbar from "@/components/layout/Navbar";
import ScrollReveal from "@/components/ui/ScrollReveal";

// Critical components loaded immediately
// Everything else lazy loaded
const About = dynamic(() => import("@/components/sections/About"), { ssr: true });
const Services = dynamic(() => import("@/components/sections/Services"), { ssr: true });
const Events = dynamic(() => import("@/components/sections/Events"), { ssr: true });
const Sermons = dynamic(() => import("@/components/sections/Sermons"), { ssr: true });
const Contact = dynamic(() => import("@/components/sections/Contact"), { ssr: true });
const Footer = dynamic(() => import("@/components/layout/Footer"), { ssr: true });
const AIChat = dynamic(() => import("@/components/ai/AIChat"), { ssr: false }); // Chat is client-only interactive

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <ScrollReveal><About /></ScrollReveal>
      <ScrollReveal delay={0.1}><Services /></ScrollReveal>
      <ScrollReveal delay={0.1}><Events /></ScrollReveal>
      <ScrollReveal delay={0.1}><Sermons /></ScrollReveal>
      <ScrollReveal delay={0.1}><Contact /></ScrollReveal>
      <Footer />
      <AIChat />
    </main>
  );
}
