import { MessageCircle, Mail, Linkedin, Youtube, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
import dBranco from '@/assets/d-branco.png';
import spotifyLogo from '@/assets/tech/spotify-logo.png';

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
            <p className="font-inter text-sm text-white/50 mb-4">
              Precisa de ajuda? Fale conosco.
            </p>
            <div className="flex flex-col gap-3">
              <a 
                href="https://wa.me/5511999999999" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="font-inter text-sm">WhatsApp</span>
              </a>
              <a 
                href="mailto:administrativo@daltonlab.ai"
                className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span className="font-inter text-sm">administrativo@daltonlab.ai</span>
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
              <a href="#noticias" className="font-inter text-sm text-white/50 hover:text-white transition-colors">
                Notícias
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
            <div className="flex flex-col gap-3">
              <a 
                href="https://www.linkedin.com/company/dalton-lab/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                <span className="font-inter text-sm">LinkedIn</span>
              </a>
              <a 
                href="https://youtube.com/@dalton_lab?si=mOfQCKAmASA4TKYB" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors"
              >
                <Youtube className="w-4 h-4" />
                <span className="font-inter text-sm">YouTube</span>
              </a>
              <a 
                href="https://open.spotify.com/show/4fnDNmjCB0EQzT7HlmCUr4?si=932194c816404620" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors"
              >
                <img src={spotifyLogo} alt="Spotify" className="w-4 h-4 object-contain" />
                <span className="font-inter text-sm">Spotify</span>
              </a>
              <a 
                href="https://www.instagram.com/daltonlab.ai?igsh=MW84MHo5dW91ZDA1ag==" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors"
              >
                <Instagram className="w-4 h-4" />
                <span className="font-inter text-sm">Instagram</span>
              </a>
            </div>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h4 className="font-inter font-semibold text-sm text-white/80 uppercase tracking-wider mb-4">
              Legal
            </h4>
            <div className="flex flex-col gap-2">
              <a href="#" className="font-inter text-sm text-white/50 hover:text-white transition-colors">
                Política de Privacidade
              </a>
              <a href="#" className="font-inter text-sm text-white/50 hover:text-white transition-colors">
                Termos de Uso
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="container-main py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <img src={dBranco} alt="Dalton Lab" className="h-8 w-auto opacity-70" />
          <p className="font-inter text-xs text-white/40">
            © 2026 Dalton Lab. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;