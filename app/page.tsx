import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";
import ScrollReveal from "@/components/ui/ScrollReveal";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Events from "@/components/sections/Events";
import Sermons from "@/components/sections/Sermons";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

const Navbar = dynamic(() => import("@/components/layout/Navbar"), { ssr: false });
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
