import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";
import Navbar from "@/components/layout/Navbar";

// Critical components loaded immediately
// Everything else lazy loaded
const About = dynamic(() => import("@/components/sections/About"), { ssr: true });
const Services = dynamic(() => import("@/components/sections/Services"), { ssr: true });
const Events = dynamic(() => import("@/components/sections/Events"), { ssr: true });
const Sermons = dynamic(() => import("@/components/sections/Sermons"), { ssr: true });
const Testimonials = dynamic(() => import("@/components/sections/Testimonials"), { ssr: true });
const Contact = dynamic(() => import("@/components/sections/Contact"), { ssr: true });
const Footer = dynamic(() => import("@/components/layout/Footer"), { ssr: true });
const AIChat = dynamic(() => import("@/components/ai/AIChat"), { ssr: false }); // Chat is client-only interactive

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Events />
      <Sermons />
      <Testimonials />
      <Contact />
      <Footer />
      <AIChat />
    </main>
  );
}
