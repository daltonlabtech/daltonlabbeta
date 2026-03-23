import { useTranslation } from 'react-i18next';
import { trackCtaClick } from '@/lib/analytics';

const NewtonChatButton = () => {
  const { t } = useTranslation();

  const handleClick = () => {
    trackCtaClick(t('nav.startTransformation'), 'floating_button', 'https://formulario.daltonlab.ai/');
  };

  return (
    <a 
      href="https://formulario.daltonlab.ai/"
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 px-6 py-3 bg-[#101823] border-2 border-[#F5F3F0]/20 rounded-full shadow-2xl hover:border-[#F5F3F0]/40 hover:scale-105 transition-all duration-300"
    >
      <span className="font-inter font-medium text-[#F5F3F0] text-sm">
        {t('nav.startTransformation')}
      </span>
    </a>
  );
};

export default NewtonChatButton;