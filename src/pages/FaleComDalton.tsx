import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/sections/Footer";
import dBranco from "@/assets/d-branco.png";

const FaleComDalton = () => {
  const { t } = useTranslation();
  const [countdown, setCountdown] = useState(3);
  const externalUrl = "https://chat.daltonlab.ai/";

  useEffect(() => {
    document.title = t('pages.faleComDalton.title');
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', t('pages.faleComDalton.description'));
    }
  }, [t]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = externalUrl;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <div className="flex-1 flex items-center justify-center px-6 py-24">
        <div className="text-center max-w-lg">
          {/* Logo */}
          <img 
            src={dBranco} 
            alt="Dalton Lab" 
            className="h-16 md:h-20 mx-auto mb-8"
          />
          
          {/* SEO H1 */}
          <h1 className="font-inter text-3xl md:text-4xl lg:text-5xl text-foreground font-light mb-4">
            {t('pages.faleComDalton.h1')}
          </h1>
          
          <p className="font-inter text-base md:text-lg text-foreground/70 mb-8">
            {t('pages.faleComDalton.subtitle')}
          </p>

          {/* Countdown */}
          <div className="mb-8">
            <p className="font-inter text-sm text-foreground/50">
              {t('pages.faleComDalton.redirecting')} {countdown}s
            </p>
          </div>

          {/* Manual CTA */}
          <a 
            href={externalUrl}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-base transition-all duration-300 hover:opacity-90"
            style={{ backgroundColor: '#F5F3F0', color: '#000000' }}
          >
            {t('pages.faleComDalton.cta')}
            <ArrowRight className="w-4 h-4" />
          </a>
          
          <p className="mt-4 font-inter text-xs text-foreground/40">
            {t('pages.faleComDalton.orClickHere')}
          </p>
        </div>
      </div>
      
      <Footer />
    </main>
  );
};

export default FaleComDalton;
