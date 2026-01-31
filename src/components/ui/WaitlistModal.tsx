import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BLOCKED_DOMAINS = ['gmail.com', 'hotmail.com', 'outlook.com'];

const isPersonalEmail = (email: string): boolean => {
  const emailLower = email.toLowerCase().trim();
  return BLOCKED_DOMAINS.some(domain => emailLower.endsWith(`@${domain}`));
};

const WaitlistModal = ({ isOpen, onClose }: WaitlistModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [emailError, setEmailError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      return;
    }

    // Validate business email
    if (isPersonalEmail(formData.email)) {
      setEmailError('Por favor, use um e-mail corporativo');
      return;
    }

    setEmailError('');
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset after showing success
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', phone: '' });
      onClose();
    }, 2000);
  };

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (field === 'email') {
      setEmailError('');
    }
  };

  const handleClose = () => {
    // Reset form state when closing without submitting
    setFormData({ name: '', email: '', phone: '' });
    setEmailError('');
    setIsSubmitted(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-[85vw] max-w-[380px] bg-white p-0 overflow-hidden">
        <div className="p-4 md:p-6">
          <DialogHeader className="mb-4 md:mb-6">
            <DialogTitle className="text-lg md:text-xl font-bold text-zinc-900 text-center">
              Quero entrar para a lista de espera
            </DialogTitle>
          </DialogHeader>

          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 mb-2">Cadastro realizado!</h3>
              <p className="text-zinc-600 text-sm">Você receberá novidades em primeira mão.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
              {/* Nome completo */}
              <div className="space-y-1.5 md:space-y-2">
                <Label htmlFor="name" className="text-xs md:text-sm font-medium text-zinc-700">
                  Nome completo <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="Nome"
                  required
                  className="h-10 md:h-11 text-sm bg-zinc-50 border-zinc-200 focus:border-zinc-400 focus:ring-zinc-400 text-zinc-900 placeholder:text-zinc-400"
                />
              </div>

              {/* E-mail de trabalho */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-zinc-700">
                  E-mail de trabalho <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="nome@empresa.com"
                  required
                  className={`h-11 bg-zinc-50 border-zinc-200 focus:border-zinc-400 focus:ring-zinc-400 text-zinc-900 placeholder:text-zinc-400 ${emailError ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                />
                {emailError && (
                  <p className="text-sm text-red-500">{emailError}</p>
                )}
              </div>

              {/* Telefone */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium text-zinc-700">
                  Telefone <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="+55 (11) 9999-999"
                  required
                  className="h-11 bg-zinc-50 border-zinc-200 focus:border-zinc-400 focus:ring-zinc-400 text-zinc-900 placeholder:text-zinc-400"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 bg-[#101823] hover:bg-[#1a2533] text-white font-medium rounded-xl transition-all duration-300 mt-6"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Processando...
                  </span>
                ) : (
                  'Entrar'
                )}
              </Button>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WaitlistModal;
