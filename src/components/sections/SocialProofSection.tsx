import { ArrowRight, Star } from 'lucide-react';
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
    company: "TechCorp Brasil",
    metric: "+180%",
    metricLabel: "reuniões agendadas"
  },
  {
    quote: "Em 3 meses, triplicamos o número de reuniões agendadas sem aumentar a equipe. O ROI foi impressionante e a qualidade dos leads melhorou significativamente.",
    author: "Marina Santos",
    role: "CEO",
    company: "Vendas Plus",
    metric: "3x",
    metricLabel: "mais pipeline"
  },
  {
    quote: "O Squad de IA revolucionou nossa abordagem de vendas. Os agentes trabalham 24/7 e nunca esquecem um follow-up. Nosso pipeline nunca esteve tão cheio.",
    author: "Ricardo Mendes",
    role: "Head de Vendas",
    company: "Growth Solutions",
    metric: "-40%",
    metricLabel: "custo por lead"
  }
];

const SocialProofSection = () => {
  return (
    <section className="section-padding bg-gradient-to-b from-dalton-dark via-[#0d1628] to-dalton-dark">
      <div className="container-main">
        {/* Title */}
        <h2 className="font-inter font-bold text-3xl md:text-4xl lg:text-5xl text-white text-center">
          Marcas que confiam em nosso trabalho
        </h2>

        {/* Logos Marquee */}
        <div className="mt-12 relative overflow-hidden">
          {/* Gradient overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-dalton-dark to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-dalton-dark to-transparent z-10 pointer-events-none" />
          
          {/* Logos - Continuous marquee */}
          <div className="flex py-6">
            <div className="flex items-center gap-16 md:gap-24 animate-marquee">
              {clientLogos.map((logo, index) => (
                <div 
                  key={`logo-1-${index}`}
                  className="flex-shrink-0 h-14 md:h-18 lg:h-20 flex items-center justify-center"
                >
                  <img 
                    src={logo} 
                    alt={`Cliente ${index + 1}`}
                    className="h-full w-auto object-contain grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
                  />
                </div>
              ))}
            </div>
            <div className="flex items-center gap-16 md:gap-24 animate-marquee ml-16 md:ml-24" aria-hidden="true">
              {clientLogos.map((logo, index) => (
                <div 
                  key={`logo-2-${index}`}
                  className="flex-shrink-0 h-14 md:h-18 lg:h-20 flex items-center justify-center"
                >
                  <img 
                    src={logo} 
                    alt={`Cliente ${index + 1}`}
                    className="h-full w-auto object-contain grayscale opacity-60"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="group relative"
              >
                {/* Card */}
                <div className="h-full p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-dalton-blue/30 hover:bg-white/[0.05] transition-all duration-500">
                  {/* Stars */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-dalton-orange text-dalton-orange" />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="font-inter text-base text-white/90 leading-relaxed mb-8">
                    "{testimonial.quote}"
                  </blockquote>
                  
                  {/* Metric Badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-dalton-blue/10 border border-dalton-blue/20 mb-6">
                    <span className="font-inter font-bold text-lg text-dalton-blue">{testimonial.metric}</span>
                    <span className="font-inter text-xs text-dalton-gray-light">{testimonial.metricLabel}</span>
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                    {/* Avatar placeholder */}
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-dalton-blue/30 to-dalton-purple/30 flex items-center justify-center">
                      <span className="font-inter font-bold text-white text-lg">
                        {testimonial.author.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-inter font-semibold text-white">{testimonial.author}</p>
                      <p className="font-inter text-sm text-dalton-gray-light">
                        {testimonial.role}, {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-16 text-center">
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
