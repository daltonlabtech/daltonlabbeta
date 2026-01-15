import { Bot, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const NewtonChatButton = () => {
  return (
    <Link 
      to="/newton"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 bg-dalton-dark border-2 border-dalton-orange rounded-full shadow-2xl hover:border-dalton-orange/80 hover:scale-105 transition-all duration-300 group"
    >
      {/* Avatar */}
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-dalton-blue to-dalton-purple flex items-center justify-center">
        <Bot className="w-5 h-5 text-white" />
      </div>
      
      {/* Text */}
      <div className="flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-dalton-orange" />
        <span className="font-inter font-medium text-white text-sm">
          FALE COM O <span className="text-dalton-orange">NEWTON</span>
        </span>
      </div>
    </Link>
  );
};

export default NewtonChatButton;
