import About from "@/components/portfolio/About";
import Contact from "@/components/portfolio/Contact";
import CustomCursor from "@/components/portfolio/CustomCursor";
import Footer from "@/components/portfolio/Footer";
import Hero from "@/components/portfolio/Hero";
import InteractiveBackground from "@/components/portfolio/InteractiveBackground";
import { LanguageProvider } from "@/components/portfolio/LanguageProvider";
import Loader from "@/components/portfolio/Loader";
import Navbar from "@/components/portfolio/Navbar";
import Projects from "@/components/portfolio/Projects";
import Skills from "@/components/portfolio/Skills";
import TerminalPanel from "@/components/portfolio/TerminalPanel";

export default function Home() {
  return (
    <LanguageProvider>
      <Loader />
      <InteractiveBackground />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <TerminalPanel />
        <Contact />
      </main>
      <Footer />
    </LanguageProvider>
  );
}
