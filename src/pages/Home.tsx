import AboutSection from "@/components/AboutSection";
import BackgroundOrbs from "@/components/BackgroundOrbs";
import CertificationsSection from "@/components/CertificationsSection";
import ContactSection from "@/components/ContactSection";
import ExperienceSection from "@/components/ExperienceSection";
import ScrollProgress from "@/components/ScrollProgress";
import FeaturedProjectSection from "@/components/FeaturedProjectSection";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SkillsSection from "@/components/SkillsSection";
import { useActiveSection } from "@/hooks/useActiveSection";

const navItems = [
  { id: "about", label: "About" },
  { id: "project", label: "Project" },
  { id: "experience", label: "Experience" },
  { id: "certifications", label: "Certifications" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
] as const;

const observedSectionIds = navItems.map((n) => n.id);

export default function Home() {
  const activeId = useActiveSection(observedSectionIds);

  return (
    <div className="min-h-screen bg-[#0B0F14] text-zinc-100">
      <BackgroundOrbs />
      <ScrollProgress />
      <Header navItems={[...navItems]} activeId={activeId} />

      <main className="pt-16">
        <HeroSection />
        <AboutSection />
        <FeaturedProjectSection />
        <ExperienceSection />
        <CertificationsSection />
        <SkillsSection />
        <ContactSection />
        <Footer />
      </main>
    </div>
  );
}
