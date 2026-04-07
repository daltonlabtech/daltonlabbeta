import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { trackPageView } from "@/lib/analytics";
import Header from "@/components/Header";
import Footer from "@/components/sections/Footer";
import AboutSection from "@/components/sections/AboutSection";

const QuemSomos = () => {
  const { t } = useTranslation();

  useEffect(() => {
    const pageTitle = t('pages.quemSomos.title');
    document.title = pageTitle;
    trackPageView('/quem-somos', pageTitle);
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', t('pages.quemSomos.description'));
    }
  }, [t]);

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <AboutSection />
      <Footer />
    </main>
  );
};

export default QuemSomos;
