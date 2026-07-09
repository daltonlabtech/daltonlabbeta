import { useState, useRef, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { trackPageView } from '@/lib/analytics';
import Seo from '@/components/Seo';
import SiteHeader from '@/components/redesign/shell/SiteHeader';
import SiteFooter from '@/components/redesign/shell/SiteFooter';
import chatAvatar from '@/assets/d-branco.webp';

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

  useEffect(() => {
    trackPageView('/newton', 'Newton');
  }, []);

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
    <div
      className="redesign-scope flex flex-col"
      style={{ background: 'transparent', minHeight: '100vh', color: 'var(--text)' }}
    >
      <Seo
        title="Newton | Dalton Lab"
        description="Converse com o Newton, o agente de IA da Dalton Lab, e monte um plano personalizado para alavancar receita, reduzir custos e escalar a margem da sua empresa."
      />
      <SiteHeader />

      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto" style={{ paddingTop: 'clamp(96px, 14vh, 140px)', paddingBottom: 24 }}>
        <div className="mx-auto px-6" style={{ maxWidth: 768, width: '100%', boxSizing: 'border-box' }}>
          <div className="space-y-6">
            {messages.map((message) => (
              <div key={message.id} className="flex gap-4">
                {message.role === 'assistant' && (
                  <div
                    className="flex-shrink-0 overflow-hidden"
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      border: '1px solid var(--border-navy)',
                      background: 'var(--surface)',
                    }}
                  >
                    <img src={chatAvatar} alt="Newton" className="w-full h-full object-cover scale-110" />
                  </div>
                )}

                <div className={`flex-1 ${message.role === 'user' ? 'text-right' : ''}`}>
                  <p
                    className="inline-block"
                    style={{
                      fontSize: '1rem',
                      lineHeight: 1.6,
                      ...(message.role === 'assistant'
                        ? { color: 'var(--text)' }
                        : {
                            background: 'var(--surface-2)',
                            color: 'var(--text)',
                            border: '1px solid var(--border-navy)',
                            padding: '12px 16px',
                            borderRadius: 16,
                            borderTopRightRadius: 4,
                          }),
                    }}
                  >
                    {message.content}
                  </p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-4">
                <div
                  className="flex-shrink-0 overflow-hidden"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    border: '1px solid var(--border-navy)',
                    background: 'var(--surface)',
                  }}
                >
                  <img src={chatAvatar} alt="Newton" className="w-full h-full object-cover scale-110" />
                </div>
                <div className="flex items-center gap-1 py-3">
                  <span className="rounded-full animate-bounce" style={{ width: 8, height: 8, background: 'var(--cyan)', animationDelay: '0ms' }} />
                  <span className="rounded-full animate-bounce" style={{ width: 8, height: 8, background: 'var(--cyan)', animationDelay: '150ms' }} />
                  <span className="rounded-full animate-bounce" style={{ width: 8, height: 8, background: 'var(--cyan)', animationDelay: '300ms' }} />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>
      </main>

      {/* Input Area */}
      <div style={{ borderTop: '1px solid var(--border-navy)', background: 'var(--bg-deep)' }}>
        <div className="mx-auto px-6 py-4" style={{ maxWidth: 768, width: '100%', boxSizing: 'border-box' }}>
          <form onSubmit={handleSubmit} className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Digite aqui o seu nome..."
              className="w-full focus:outline-none"
              style={{
                padding: '16px 56px 16px 24px',
                background: 'var(--surface)',
                border: '1px solid var(--border-navy)',
                borderRadius: 16,
                color: 'var(--text)',
                fontSize: '1rem',
                transition: 'border-color .3s',
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--cyan)')}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border-navy)')}
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="absolute flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                right: 10,
                top: '50%',
                transform: 'translateY(-50%)',
                width: 40,
                height: 40,
                borderRadius: 12,
                background: 'var(--cyan)',
                color: 'var(--accent-ink)',
                transition: 'opacity .3s',
              }}
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </form>

          {/* Disclaimer */}
          <div className="mt-4 text-center">
            <p style={{ fontSize: 12, lineHeight: 1.6, color: 'var(--text-dim)' }}>
              O Dalton pode cometer erros. Considere verificar informações importantes.
            </p>
            <p style={{ fontSize: 12, marginTop: 8, color: 'var(--muted-navy)' }}>
              ©2026 | Powered by Dalton Lab
            </p>
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
};

export default Newton;
