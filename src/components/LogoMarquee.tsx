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
  cliente1,
  cliente2,
  cliente3,
  cliente4,
  cliente5,
  cliente6,
  cliente7,
  cliente8,
  cliente9,
];

const LogoMarquee = () => {
  return (
    <div className="w-full overflow-hidden py-4">
      <div className="relative flex">
        {/* First set of logos */}
        <div className="animate-marquee flex items-center">
          {clientLogos.map((logo, index) => (
            <div
              key={`logo-1-${index}`}
              className="flex-shrink-0 h-12 md:h-16 flex items-center justify-center mx-8 md:mx-12"
            >
              <img 
                src={logo} 
                alt={`Cliente ${index + 1}`}
                className="h-full w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>
        
        {/* Duplicate set for seamless loop */}
        <div className="animate-marquee flex items-center" aria-hidden="true">
          {clientLogos.map((logo, index) => (
            <div
              key={`logo-2-${index}`}
              className="flex-shrink-0 h-12 md:h-16 flex items-center justify-center mx-8 md:mx-12"
            >
              <img 
                src={logo} 
                alt={`Cliente ${index + 1}`}
                className="h-full w-auto object-contain opacity-70"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogoMarquee;
