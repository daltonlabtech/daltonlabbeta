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
  // Triple the logos array to create truly seamless infinite loop
  const allLogos = [...clientLogos, ...clientLogos, ...clientLogos];

  return (
    <div className="w-full overflow-hidden py-6">
      <div 
        className="flex animate-marquee-infinite"
        style={{ width: 'max-content' }}
      >
        {allLogos.map((logo, index) => (
          <div
            key={index}
            className="h-14 md:h-20 w-[180px] md:w-[220px] flex-shrink-0 flex items-center justify-center"
          >
            <img 
              src={logo} 
              alt={`Cliente ${(index % clientLogos.length) + 1}`}
              width={170}
              height={80}
              loading="lazy"
              decoding="async"
              className="max-h-full max-w-[130px] md:max-w-[170px] object-contain opacity-60 hover:opacity-100 transition-opacity duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoMarquee;
