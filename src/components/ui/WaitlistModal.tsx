import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { trackWaitlistOpen, trackWaitlistSubmit } from '@/lib/analytics';
import { supabase } from '@/integrations/supabase/client';
import { ChevronDown } from 'lucide-react';

const COUNTRY_CODES = [
  { code: '+55', country: 'BR', flag: '🇧🇷' },
  { code: '+1', country: 'US', flag: '🇺🇸' },
  { code: '+351', country: 'PT', flag: '🇵🇹' },
  { code: '+44', country: 'GB', flag: '🇬🇧' },
  { code: '+34', country: 'ES', flag: '🇪🇸' },
  { code: '+33', country: 'FR', flag: '🇫🇷' },
  { code: '+49', country: 'DE', flag: '🇩🇪' },
  { code: '+39', country: 'IT', flag: '🇮🇹' },
  { code: '+81', country: 'JP', flag: '🇯🇵' },
  { code: '+86', country: 'CN', flag: '🇨🇳' },
  { code: '+54', country: 'AR', flag: '🇦🇷' },
  { code: '+56', country: 'CL', flag: '🇨🇱' },
  { code: '+57', country: 'CO', flag: '🇨🇴' },
  { code: '+52', country: 'MX', flag: '🇲🇽' },
  { code: '+598', country: 'UY', flag: '🇺🇾' },
  { code: '+595', country: 'PY', flag: '🇵🇾' },
];

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  formLocation?: string;
  product?: string;
}

const BLOCKED_DOMAINS = ['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com', 'icloud.com', 'live.com', 'uol.com.br'];

const isPersonalEmail = (email: string): boolean => {
  const emailLower = email.toLowerCase().trim();
  return BLOCKED_DOMAINS.some(domain => emailLower.endsWith(`@${domain}`));
};

const isValidPhone = (phone: string): boolean => {
  const digitsOnly = phone.replace(/\D/g, '');
  return digitsOnly.length >= 8 && digitsOnly.length <= 15;
};

const WaitlistModal = ({ isOpen, onClose, formLocation = 'unknown', product = 'unknown' }: WaitlistModalProps) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    honeypot: '',
  });
  const [selectedCountryCode, setSelectedCountryCode] = useState(COUNTRY_CODES[0]); // +55 BR
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const countryDropdownRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [submitError, setSubmitError] = useState('');

  // Track modal open
  useEffect(() => {
    if (isOpen) {
      trackWaitlistOpen(formLocation);
    }
  }, [isOpen, formLocation]);

  // Close country dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target as Node)) {
        setIsCountryDropdownOpen(false);
      }
    };
    if (isCountryDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isCountryDropdownOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      return;
    }

    // Validate business email
    if (isPersonalEmail(formData.email)) {
      setEmailError(t('waitlist.emailError'));
      return;
    }

    // Validate phone
    if (!isValidPhone(formData.phone)) {
      setPhoneError(t('waitlist.phoneError'));
      return;
    }

    setEmailError('');
    setPhoneError('');
    setSubmitError('');
    setIsSubmitting(true);
    
    try {
      // Call edge function to submit waitlist
      const fullPhone = `${selectedCountryCode.code} ${formData.phone.trim()}`;
      const { data, error } = await supabase.functions.invoke('submit-waitlist', {
        body: {
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: fullPhone,
          product: product,
          source: formLocation,
          honeypot: formData.honeypot, // Send honeypot for bot detection
        },
      });

      if (error) {
        console.error('Waitlist submission error:', error);
        setSubmitError(t('waitlist.errorGeneric'));
        setIsSubmitting(false);
        return;
      }

      if (data?.error) {
        setSubmitError(data.error);
        setIsSubmitting(false);
        return;
      }

      // Track successful submit
      trackWaitlistSubmit(formLocation);
      
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset after showing success
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', email: '', phone: '', honeypot: '' });
        onClose();
      }, 2000);
    } catch (err) {
      console.error('Unexpected error:', err);
      setSubmitError(t('waitlist.errorUnexpected'));
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (field === 'email') {
      setEmailError('');
    }
    if (field === 'phone') {
      setPhoneError('');
    }
  };

  const handleClose = () => {
    // Reset form state when closing without submitting
    setFormData({ name: '', email: '', phone: '', honeypot: '' });
    setEmailError('');
    setPhoneError('');
    setSubmitError('');
    setIsSubmitted(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-[85vw] max-w-[380px] bg-white p-0 overflow-hidden rounded-2xl">
        <div className="p-4 md:p-6">
          {t('waitlist.title') && (
            <DialogHeader className="mb-4 md:mb-6">
              <DialogTitle className="text-lg md:text-xl font-bold text-zinc-900 text-center">
                {t('waitlist.title')}
              </DialogTitle>
            </DialogHeader>
          )}

          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 mb-2">{t('waitlist.successTitle')}</h3>
              <p className="text-zinc-600 text-sm">{t('waitlist.successMessage')}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
              {/* Honeypot field - hidden from users, visible to bots */}
              <input
                type="text"
                name="website"
                value={formData.honeypot}
                onChange={(e) => handleChange('honeypot', e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                className="absolute -left-[9999px] opacity-0 h-0 w-0"
                aria-hidden="true"
              />
              
              {/* Nome completo */}
              <div className="space-y-1.5 md:space-y-2">
                <Label htmlFor="name" className="text-xs md:text-sm font-medium text-zinc-700">
                  {t('waitlist.nameLabel')} <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder={t('waitlist.namePlaceholder')}
                  required
                  className="h-10 md:h-11 text-sm bg-zinc-50 border-zinc-200 focus:border-zinc-400 focus:ring-zinc-400 text-zinc-900 placeholder:text-zinc-400"
                />
              </div>

              {/* E-mail de trabalho */}
              <div className="space-y-1.5 md:space-y-2">
                <Label htmlFor="email" className="text-xs md:text-sm font-medium text-zinc-700">
                  {t('waitlist.emailLabel')} <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder={t('waitlist.emailPlaceholder')}
                  required
                  className={`h-10 md:h-11 text-sm bg-zinc-50 border-zinc-200 focus:border-zinc-400 focus:ring-zinc-400 text-zinc-900 placeholder:text-zinc-400 ${emailError ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                />
                {emailError && (
                  <p className="text-xs md:text-sm text-red-500">{emailError}</p>
                )}
              </div>

              {/* Telefone */}
              <div className="space-y-1.5 md:space-y-2">
                <Label htmlFor="phone" className="text-xs md:text-sm font-medium text-zinc-700">
                  {t('waitlist.phoneLabel')} <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder={t('waitlist.phonePlaceholder')}
                  required
                  className={`h-10 md:h-11 text-sm bg-zinc-50 border-zinc-200 focus:border-zinc-400 focus:ring-zinc-400 text-zinc-900 placeholder:text-zinc-400 ${phoneError ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                />
                {phoneError && (
                  <p className="text-xs md:text-sm text-red-500">{phoneError}</p>
                )}
              </div>

              {/* Submit Error */}
              {submitError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-xs md:text-sm text-red-600">{submitError}</p>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-10 md:h-12 bg-[#101823] hover:bg-[#1a2533] text-white text-sm font-medium rounded-xl transition-all duration-300 mt-4 md:mt-6"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    {t('waitlist.submitting')}
                  </span>
                ) : (
                  t('waitlist.submit')
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
