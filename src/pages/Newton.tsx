import { useState, useRef, useEffect } from 'react';
import { ArrowUp, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '@/assets/logo-dalton-horizontal-white.png';
import chatAvatar from '@/assets/chat-avatar.png';

interface Message {
  id: string;
  role: 'assistant' | 'user';
  content: string;
}

const initialMessages: Message[] = [
  {
    id: '1',
    role: 'assistant',
    content: 'Bom dia! É ótimo ter você aqui. Vou preparar um Plano Personalizado de IA focado em alavancar sua receita, reduzir custos e multiplicar a margem de lucro da sua empresa.'
  },
  {
    id: '2',
    role: 'assistant',
    content: 'Então bora começar! Qual seu nome?'
  }
];

const Newton = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response (replace with actual AI integration)
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Prazer em te conhecer, ${input.trim()}! Qual é o nome da sua empresa e em qual segmento ela atua?`
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#101823] flex flex-col">
      {/* Header */}
      <header className="bg-[#101823]">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 text-dalton-gray-light hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-inter text-sm">Voltar</span>
          </Link>
          
          <Link to="/">
            <img src={logo} alt="Dalton Lab" className="h-32 md:h-40 w-auto" />
          </Link>
          
          <div className="w-24" /> {/* Spacer for centering */}
        </div>
      </header>

      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto py-8">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="space-y-6">
            {messages.map((message) => (
              <div key={message.id} className="flex gap-4">
              {message.role === 'assistant' && (
                <div className="flex-shrink-0 w-10 h-10 rounded-full overflow-hidden">
                    <img src={chatAvatar} alt="Dalton AI" className="w-full h-full object-cover" />
                  </div>
                )}
                
                <div className={`flex-1 ${message.role === 'user' ? 'text-right' : ''}`}>
                  <p className={`inline-block font-inter text-base leading-relaxed ${
                    message.role === 'assistant' 
                      ? 'text-[#F5F3F0]' 
                      : 'bg-[#F5F3F0]/10 text-[#F5F3F0] px-4 py-3 rounded-2xl rounded-tr-sm'
                  }`}>
                    {message.content}
                  </p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full overflow-hidden">
                  <img src={chatAvatar} alt="Dalton AI" className="w-full h-full object-cover" />
                </div>
                <div className="flex items-center gap-1 py-3">
                  <span className="w-2 h-2 bg-[#F5F3F0] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-[#F5F3F0] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-[#F5F3F0] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>
      </main>

      {/* Input Area */}
      <div className="bg-[#101823]">
        <div className="container mx-auto px-6 py-4 max-w-3xl">
          <form onSubmit={handleSubmit} className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Digite aqui o seu nome..."
              className="w-full px-6 py-4 pr-14 bg-white/10 border border-[#F5F3F0]/40 rounded-2xl text-white placeholder-[#F5F3F0]/60 font-inter focus:outline-none focus:border-[#F5F3F0]/70 transition-colors"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-[#F5F3F0] flex items-center justify-center hover:bg-[#F5F3F0]/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowUp className="w-5 h-5 text-[#101823]" />
            </button>
          </form>
          
          {/* Disclaimer */}
          <div className="mt-4 text-center">
            <p className="font-inter text-xs text-[#F5F3F0]/70 leading-relaxed">
              O Dalton pode cometer erros. Considere verificar informações importantes.
            </p>
            <p className="font-inter text-xs text-[#F5F3F0]/50 mt-2">
              ©2026 | Powered by Dalton Lab
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newton;
