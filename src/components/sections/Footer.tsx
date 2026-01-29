import { Link } from 'react-router-dom';
import dBranco from '@/assets/d-branco.png';

const Footer = () => {
  return (
    <footer className="bg-[#101823] border-t border-white/10">
      {/* Main Footer */}
      <div className="container-main py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Column 1: Suporte */}
          <div>
            <h4 className="font-inter font-semibold text-sm text-white/80 uppercase tracking-wider mb-4">
              Suporte
            </h4>
            <div className="flex flex-col gap-2">
              <a 
                href="mailto:administrativo@daltonlab.ai"
                className="font-inter text-sm text-white/50 hover:text-white transition-colors"
              >
                administrativo@daltonlab.ai
              </a>
            </div>
          </div>

          {/* Column 2: Sobre */}
          <div>
            <h4 className="font-inter font-semibold text-sm text-white/80 uppercase tracking-wider mb-4">
              Sobre
            </h4>
            <div className="flex flex-col gap-2">
              <Link to="/" className="font-inter text-sm text-white/50 hover:text-white transition-colors">
                Produto
              </Link>
              <a href="#noticias" className="font-inter text-sm text-white/50 hover:text-white transition-colors flex items-center gap-1.5">
                Notícias
                <span className="px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-wide bg-dalton-blue/20 text-dalton-blue rounded">
                  Em breve
                </span>
              </a>
              <Link to="/quem-somos" className="font-inter text-sm text-white/50 hover:text-white transition-colors">
                Quem somos
              </Link>
            </div>
          </div>

          {/* Column 3: Redes Sociais */}
          <div>
            <h4 className="font-inter font-semibold text-sm text-white/80 uppercase tracking-wider mb-4">
              Redes Sociais
            </h4>
            <div className="flex flex-col gap-2">
              <a 
                href="https://www.linkedin.com/company/dalton-lab/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-inter text-sm text-white/50 hover:text-white transition-colors"
              >
                LinkedIn
              </a>
              <a 
                href="https://youtube.com/@dalton_lab?si=mOfQCKAmASA4TKYB" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-inter text-sm text-white/50 hover:text-white transition-colors"
              >
                YouTube
              </a>
              <a 
                href="https://open.spotify.com/show/4fnDNmjCB0EQzT7HlmCUr4?si=932194c816404620" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-inter text-sm text-white/50 hover:text-white transition-colors"
              >
                Spotify
              </a>
              <a 
                href="https://www.instagram.com/daltonlab.ai?igsh=MW84MHo5dW91ZDA1ag==" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-inter text-sm text-white/50 hover:text-white transition-colors"
              >
                Instagram
              </a>
            </div>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h4 className="font-inter font-semibold text-sm text-white/80 uppercase tracking-wider mb-4">
              Legal
            </h4>
            <div className="flex flex-col gap-2">
              <Link to="/politica-de-privacidade" className="font-inter text-sm text-white/50 hover:text-white transition-colors">
                Política de Privacidade
              </Link>
              <Link to="/termos-de-uso" className="font-inter text-sm text-white/50 hover:text-white transition-colors">
                Termos de Uso
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="container-main py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <img 
            src={dBranco} 
            alt="Logo Dalton Lab" 
            className="h-8 w-auto opacity-70"
            loading="lazy"
            decoding="async"
            width={32}
            height={32}
          />
          <p className="font-inter text-xs text-white/40">
            © 2026 Dalton Lab. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;