import { MessageCircle, Mail } from 'lucide-react';
import logo from '@/assets/logo-dalton-lab.png';

const Footer = () => {
  return (
    <footer className="bg-[#0A0A0A] border-t border-white/10">
      {/* Main Footer */}
      <div className="container-main py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Column 1: Navigation */}
          <div>
            <h4 className="font-inter font-semibold text-sm text-dalton-gray-light uppercase tracking-wider mb-4">
              Suporte
            </h4>
            <p className="font-inter text-sm text-dalton-gray mb-4">
              Precisa de ajuda? Fale conosco.
            </p>
            <div className="flex flex-col gap-3">
              <a 
                href="https://wa.me/5511999999999" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-dalton-gray-light hover:text-white transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="font-inter text-sm">WhatsApp</span>
              </a>
              <a 
                href="mailto:administrativo@daltonlab.ai"
                className="inline-flex items-center gap-2 text-dalton-gray-light hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span className="font-inter text-sm">administrativo@daltonlab.ai</span>
              </a>
            </div>
          </div>

          {/* Column 2: Company */}
          <div>
            <h4 className="font-inter font-semibold text-sm text-dalton-gray-light uppercase tracking-wider mb-4">
              Empresa
            </h4>
            <p className="font-inter text-sm text-dalton-gray mb-1">Dalton Lab</p>
            <p className="font-inter text-xs text-dalton-gray/70 font-light tracking-wide mb-2">Alphaville, São Paulo</p>
            <p className="font-inter text-sm text-dalton-gray">CNPJ: 61.730.493/0001-00</p>
          </div>

          {/* Column 4: Social / Links */}
          <div>
            <h4 className="font-inter font-semibold text-sm text-dalton-gray-light uppercase tracking-wider mb-4">
              Legal
            </h4>
            <div className="flex flex-col gap-2">
              <a href="#" className="font-inter text-sm text-dalton-gray hover:text-white transition-colors">
                Política de Privacidade
              </a>
              <a href="#" className="font-inter text-sm text-dalton-gray hover:text-white transition-colors">
                Termos de Uso
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="container-main py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <img src={logo} alt="Dalton Lab" className="h-6 w-auto opacity-70" />
          <p className="font-inter text-xs text-dalton-gray">
            © 2026 Dalton Lab. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;