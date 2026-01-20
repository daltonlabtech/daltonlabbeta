import Header from "@/components/Header";
import HeroSection from "@/components/sections/HeroSection";
import ProspectionSection from "@/components/sections/ProspectionSection";
import PhilosophySection from "@/components/sections/PhilosophySection";
import SquadPlansSection from "@/components/sections/SquadPlansSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import AudioDemoSection from "@/components/sections/AudioDemoSection";
import SocialProofSection from "@/components/sections/SocialProofSection";
import FAQSection from "@/components/sections/FAQSection";
import OtherSolutionsSection from "@/components/sections/OtherSolutionsSection";
import FinalCTASection from "@/components/sections/FinalCTASection";
import Footer from "@/components/sections/Footer";
import NewtonChatButton from "@/components/NewtonChatButton";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <ProspectionSection />
      <PhilosophySection />
      <SquadPlansSection />
      <HowItWorksSection />
      <AudioDemoSection />
      <SocialProofSection />
      <FAQSection />
      <OtherSolutionsSection />
      <FinalCTASection />
      <Footer />
      <NewtonChatButton />
    </main>
  );
};

export default Index;
