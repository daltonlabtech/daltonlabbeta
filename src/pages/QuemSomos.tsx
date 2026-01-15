import Header from "@/components/Header";
import Footer from "@/components/sections/Footer";
import NewtonChatButton from "@/components/NewtonChatButton";
import AboutSection from "@/components/sections/AboutSection";

const QuemSomos = () => {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <AboutSection />
      <Footer />
      <NewtonChatButton />
    </main>
  );
};

export default QuemSomos;
