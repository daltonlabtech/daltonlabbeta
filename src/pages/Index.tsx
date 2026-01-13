import HeroSection from "@/components/sections/HeroSection";
import AIEmployeesSection from "@/components/sections/AIEmployeesSection";
import PhilosophySection from "@/components/sections/PhilosophySection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import AudioDemoSection from "@/components/sections/AudioDemoSection";
import SocialProofSection from "@/components/sections/SocialProofSection";
import FAQSection from "@/components/sections/FAQSection";
import OtherSolutionsSection from "@/components/sections/OtherSolutionsSection";
import FinalCTASection from "@/components/sections/FinalCTASection";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <AIEmployeesSection />
      <PhilosophySection />
      <HowItWorksSection />
      <AudioDemoSection />
      <SocialProofSection />
      <FAQSection />
      <OtherSolutionsSection />
      <FinalCTASection />
    </main>
  );
};

export default Index;
