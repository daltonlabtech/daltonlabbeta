import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import dBranco from '@/assets/d-branco.png';
import { trackOutboundLink } from '@/lib/analytics';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#101823] border-t border-white/10">
      {/* Main Footer */}
      <div className="container-main py-8 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
          {/* Column 1: Suporte */}
          <div>
            <h4 className="font-inter font-semibold text-xs md:text-sm text-white/80 uppercase tracking-wider mb-2 md:mb-4">
              {t('footer.support')}
            </h4>
            <div className="flex flex-col gap-1.5 md:gap-2">
              <a 
                href="mailto:administrativo@daltonlab.ai"
                className="font-inter text-xs md:text-sm text-white/50 hover:text-white transition-colors break-all"
              >
                administrativo@daltonlab.ai
              </a>
            </div>
          </div>

          {/* Column 2: Sobre */}
          <div>
            <h4 className="font-inter font-semibold text-xs md:text-sm text-white/80 uppercase tracking-wider mb-2 md:mb-4">
              {t('footer.about')}
            </h4>
            <div className="flex flex-col gap-1.5 md:gap-2">
              <Link to="/produto" className="font-inter text-xs md:text-sm text-white/50 hover:text-white transition-colors">
                {t('nav.product')}
              </Link>
              <a 
                href="https://chat.daltonlab.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-inter text-xs md:text-sm text-white/50 hover:text-white transition-colors"
              >
                {t('nav.startTransformation')}
              </a>
              <Link to="/quem-somos" className="font-inter text-xs md:text-sm text-white/50 hover:text-white transition-colors">
                {t('nav.about')}
              </Link>
            </div>
          </div>

          {/* Column 3: Redes Sociais */}
          <div>
            <h4 className="font-inter font-semibold text-xs md:text-sm text-white/80 uppercase tracking-wider mb-2 md:mb-4">
              {t('footer.socialMedia')}
            </h4>
            <div className="flex flex-col gap-1.5 md:gap-2">
              <a 
                href="https://www.linkedin.com/company/dalton-lab/" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => trackOutboundLink('https://www.linkedin.com/company/dalton-lab/', 'LinkedIn')}
                className="font-inter text-xs md:text-sm text-white/50 hover:text-white transition-colors"
              >
                LinkedIn
              </a>
              <a 
                href="https://youtube.com/@dalton_lab?si=mOfQCKAmASA4TKYB" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => trackOutboundLink('https://youtube.com/@dalton_lab?si=mOfQCKAmASA4TKYB', 'YouTube')}
                className="font-inter text-xs md:text-sm text-white/50 hover:text-white transition-colors"
              >
                YouTube
              </a>
              <a 
                href="https://open.spotify.com/show/4fnDNmjCB0EQzT7HlmCUr4?si=932194c816404620" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => trackOutboundLink('https://open.spotify.com/show/4fnDNmjCB0EQzT7HlmCUr4?si=932194c816404620', 'Spotify')}
                className="font-inter text-xs md:text-sm text-white/50 hover:text-white transition-colors"
              >
                Spotify
              </a>
              <a 
                href="https://www.instagram.com/daltonlab.ai?igsh=MW84MHo5dW91ZDA1ag==" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => trackOutboundLink('https://www.instagram.com/daltonlab.ai?igsh=MW84MHo5dW91ZDA1ag==', 'Instagram')}
                className="font-inter text-xs md:text-sm text-white/50 hover:text-white transition-colors"
              >
                Instagram
              </a>
            </div>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h4 className="font-inter font-semibold text-xs md:text-sm text-white/80 uppercase tracking-wider mb-2 md:mb-4">
              {t('footer.legal')}
            </h4>
            <div className="flex flex-col gap-1.5 md:gap-2">
              <Link to="/politica-de-privacidade" className="font-inter text-xs md:text-sm text-white/50 hover:text-white transition-colors">
                {t('footer.privacyPolicy')}
              </Link>
              <Link to="/termos-de-uso" className="font-inter text-xs md:text-sm text-white/50 hover:text-white transition-colors">
                {t('footer.termsOfUse')}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="container-main py-4 md:py-6 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4">
          <img 
            src={dBranco} 
            alt="Logo Dalton Lab" 
            className="h-6 md:h-8 w-auto opacity-70"
            loading="lazy"
            decoding="async"
            width={32}
            height={32}
          />
          <p className="font-inter text-[10px] md:text-xs text-white/40">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
