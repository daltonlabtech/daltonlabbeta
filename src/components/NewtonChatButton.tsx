import { Link } from 'react-router-dom';
import newtonAvatar from '@/assets/newton-avatar.webp';

const NewtonChatButton = () => {
  return (
    <Link 
      to="/newton"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 bg-dalton-dark border-2 border-[#36BDFC] rounded-full shadow-2xl hover:border-[#36BDFC]/80 hover:scale-105 transition-all duration-300 group"
    >
      {/* Avatar */}
      <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#36BDFC]/50">
        <img 
          src={newtonAvatar} 
          alt="Newton AI" 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Text */}
      <div className="flex flex-col">
        <span className="font-inter font-medium text-white text-sm leading-tight">
          Fale com o <span className="text-[#36BDFC]">Newton AI</span>,
        </span>
        <span className="font-inter text-xs text-dalton-gray-light">
          nosso assistente
        </span>
      </div>
    </Link>
  );
};

export default NewtonChatButton;
