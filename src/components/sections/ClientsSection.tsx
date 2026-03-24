import { useTranslation } from 'react-i18next';
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
  { name: 'Cliente 1', src: cliente1 },
  { name: 'Cliente 2', src: cliente2 },
  { name: 'Cliente 3', src: cliente3 },
  { name: 'Cliente 4', src: cliente4 },
  { name: 'Cliente 5', src: cliente5 },
  { name: 'Cliente 6', src: cliente6 },
  { name: 'Cliente 7', src: cliente7 },
  { name: 'Cliente 8', src: cliente8 },
  { name: 'Cliente 9', src: cliente9 },
];

const ClientsSection = () => {
  const { t } = useTranslation();

  return (
    <section
      className="pt-4 pb-8 md:py-12 overflow-hidden"
      style={{ backgroundColor: '#0B0E14' }}
    >

      {/* Marquee Container */}
      <div className="relative">
        <div className="flex animate-marquee-infinite">
          {/* First set of logos */}
          {clientLogos.map((logo, index) => (
            <div
              key={`first-${index}`}
              className="flex-shrink-0 mx-6 md:mx-10"
            >
              <img
                src={logo.src}
                alt={`Logo do cliente ${logo.name}`}
                className="h-24 md:h-32 w-auto object-contain brightness-0 invert opacity-70 hover:opacity-100 transition-opacity duration-300"
                loading="lazy"
                decoding="async"
                width={240}
                height={128}
              />
            </div>
          ))}
          {/* Duplicate for seamless loop */}
          {clientLogos.map((logo, index) => (
            <div
              key={`second-${index}`}
              className="flex-shrink-0 mx-6 md:mx-10"
            >
              <img
                src={logo.src}
                alt={`Logo do cliente ${logo.name}`}
                className="h-24 md:h-32 w-auto object-contain brightness-0 invert opacity-70 hover:opacity-100 transition-opacity duration-300"
                loading="lazy"
                decoding="async"
                width={240}
                height={128}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
