import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MethodBar from "@/components/MethodBar";
import Intro from "@/components/Intro";
import Programs from "@/components/Programs";
import Method from "@/components/Method";
import ValueProps from "@/components/ValueProps";
import About from "@/components/About";
import Results from "@/components/Results";
import Gallery from "@/components/Gallery";
import InstagramSection from "@/components/InstagramSection";
import CTAFinal from "@/components/CTAFinal";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <MethodBar />
      <Intro />
      <Programs />
      <Method />
      <ValueProps />
      <About />
      <Results />
      <Gallery />
      <InstagramSection />
      <CTAFinal />
      <Contact />
      <Footer />

      {/* WhatsApp CTA sticky para mobile */}
      <a
        href="https://api.whatsapp.com/send?phone=51947864029&text=Hola%20Isamu%2C%20quiero%20solicitar%20mi%20evaluaci%C3%B3n."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 left-1/2 z-40 -translate-x-1/2 rounded-full bg-hinomaru px-6 py-3 font-display text-xs font-bold uppercase tracking-[0.12em] text-ivory shadow-2xl transition active:scale-95 md:hidden"
      >
        💬 Escríbenos por WhatsApp
      </a>
    </main>
  );
}
