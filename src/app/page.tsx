// src/app/page.tsx

import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import UploadPDFWidget from "@/components/UploadPDFWidget";



export default function HomePage() {
  return (
    <main className="bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Hero Section */}
      <section id="hero">
        <HeroSection />
      </section>

      {/* Upload PDF Widget */}
      <section id="upload">
        <UploadPDFWidget />
      </section>

      {/* Chat Section */}
      <section id="chat">
        <ChatWidget />
      </section>

      {/* About Section */}
      <section id="about">
        <AboutSection />
      </section>

      {/* Skills Section */}
      <section id="skills">
        <SkillsSection />
      </section>

      {/* Projects Section */}
      <section id="projects">
        <ProjectsSection />
      </section>

      {/* Contact Section */}
      <section id="contact">
        <ContactSection />
      </section>

      <Footer />
    </main>
  );
}

