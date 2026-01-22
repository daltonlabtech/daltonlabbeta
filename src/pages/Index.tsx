import Header from "@/components/Header";
import HeroSection from "@/components/sections/HeroSection";
import ProspectionSection from "@/components/sections/ProspectionSection";
import InsightsSection from "@/components/sections/InsightsSection";
import AudioDemoSection from "@/components/sections/AudioDemoSection";
import SocialProofSection from "@/components/sections/SocialProofSection";
import FAQSection from "@/components/sections/FAQSection";
import Footer from "@/components/sections/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <ProspectionSection />
      <InsightsSection />
      <AudioDemoSection />
      <SocialProofSection />
      <FAQSection />
      <Footer />
    </main>
  );
};

export default Index;
