import { ArrowRight, Quote } from 'lucide-react';
import cliente1 from '@/assets/logos/cliente-1.webp';
import cliente2 from '@/assets/logos/cliente-2.webp';
import cliente3 from '@/assets/logos/cliente-3.webp';
import cliente4 from '@/assets/logos/cliente-4.webp';
import cliente5 from '@/assets/logos/cliente-5.webp';
import cliente6 from '@/assets/logos/cliente-6.webp';
import cliente7 from '@/assets/logos/cliente-7.webp';
import cliente8 from '@/assets/logos/cliente-8.webp';
import cliente9 from '@/assets/logos/cliente-9.webp';

const clientLogos = [
  cliente1, cliente2, cliente3, cliente4, cliente5, cliente6, cliente7, cliente8, cliente9
];

const testimonials = [
  {
    quote: "A implementação dos agentes de IA da Dalton Lab transformou completamente nosso processo comercial. Nosso time agora foca apenas em fechamento enquanto a IA cuida de toda a prospecção.",
    author: "Carlos Silva",
    role: "Diretor Comercial",
    company: "TechCorp Brasil"
  },
  {
    quote: "Em 3 meses, triplicamos o número de reuniões agendadas sem aumentar a equipe. O ROI foi impressionante e a qualidade dos leads melhorou significativamente.",
    author: "Marina Santos",
    role: "CEO",
    company: "Vendas Plus"
  },
  {
    quote: "O Squad de IA revolucionou nossa abordagem de vendas. Os agentes trabalham 24/7 e nunca esquecem um follow-up. Nosso pipeline nunca esteve tão cheio.",
    author: "Ricardo Mendes",
    role: "Head de Vendas",
    company: "Growth Solutions"
  }
];

const SocialProofSection = () => {
  return (
    <section className="section-padding bg-dalton-dark">
      <div className="container-main">
        {/* Title */}
        <h2 className="font-inter font-bold text-3xl md:text-4xl lg:text-5xl text-white text-center">
          Marcas que confiam em nosso trabalho
        </h2>

        {/* Logos Grid */}
        <div className="mt-12 grid grid-cols-3 md:grid-cols-5 gap-4 md:gap-6 max-w-[1000px] mx-auto">
          {clientLogos.map((logo, index) => (
            <div 
              key={index}
              className="bg-white/5 border border-white/10 rounded-xl p-6 md:p-8 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              <img 
                src={logo} 
                alt={`Cliente ${index + 1}`}
                className="h-12 md:h-16 lg:h-20 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1200px] mx-auto">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="relative bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-2xl p-8 hover:border-dalton-blue/30 transition-all duration-300"
            >
              {/* Quote Icon */}
              <Quote className="w-8 h-8 text-dalton-blue/30 mb-4" />
              
              {/* Quote Text */}
              <blockquote className="font-inter text-base text-dalton-gray-light leading-relaxed mb-6">
                "{testimonial.quote}"
              </blockquote>
              
              {/* Author */}
              <div className="border-t border-white/10 pt-4">
                <p className="font-inter font-semibold text-white">{testimonial.author}</p>
                <p className="font-inter text-sm text-dalton-gray-light">
                  {testimonial.role}, {testimonial.company}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="mt-12 text-center">
          <button className="group bg-white text-zinc-900 font-medium text-sm md:text-base px-6 py-3 md:px-8 md:py-4 rounded-full shadow-lg hover:shadow-xl hover:bg-zinc-100 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 inline-flex items-center justify-center">
            <span>Quero conhecer o Squad</span>
            <ArrowRight className="ml-2 w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
