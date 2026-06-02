import About from "@/components/portfolio/About";
import Contact from "@/components/portfolio/Contact";
import CustomCursor from "@/components/portfolio/CustomCursor";
import Footer from "@/components/portfolio/Footer";
import Hero from "@/components/portfolio/Hero";
import InteractiveBackground from "@/components/portfolio/InteractiveBackground";
import Loader from "@/components/portfolio/Loader";
import Navbar from "@/components/portfolio/Navbar";
import Skills from "@/components/portfolio/Skills";
import TerminalPanel from "@/components/portfolio/TerminalPanel";
import { LanguageProvider } from "../i18n/LanguageProvider";
import ProjectsSection from "./projects/ProjectsSection";

export default function PortfolioPage() {
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
        <ProjectsSection />
        <TerminalPanel />
        <Contact />
      </main>
      <Footer />
    </LanguageProvider>
  );
}
