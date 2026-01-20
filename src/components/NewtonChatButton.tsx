import { Link } from 'react-router-dom';

const NewtonChatButton = () => {
  return (
    <Link 
      to="/newton"
      className="fixed bottom-6 right-6 z-50 px-6 py-3 bg-[#101823] border-2 border-[#F5F3F0]/20 rounded-full shadow-2xl hover:border-[#F5F3F0]/40 hover:scale-105 transition-all duration-300"
    >
      <span className="font-inter font-medium text-[#F5F3F0] text-sm">
        Fale com o Dalton
      </span>
    </Link>
  );
};

export default NewtonChatButton;
