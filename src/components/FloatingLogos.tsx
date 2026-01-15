import cliente1 from '@/assets/logos/cliente-1.png';
import cliente2 from '@/assets/logos/cliente-2.png';
import cliente3 from '@/assets/logos/cliente-3.png';
import cliente4 from '@/assets/logos/cliente-4.png';
import cliente5 from '@/assets/logos/cliente-5.png';
import cliente6 from '@/assets/logos/cliente-6.png';
import cliente7 from '@/assets/logos/cliente-7.png';
import cliente8 from '@/assets/logos/cliente-8.png';
import cliente9 from '@/assets/logos/cliente-9.png';
import cliente10 from '@/assets/logos/cliente-10.png';

const logos = [
  { src: cliente1, alt: 'Cliente 1' },
  { src: cliente2, alt: 'Cliente 2' },
  { src: cliente3, alt: 'Cliente 3' },
  { src: cliente4, alt: 'Cliente 4' },
  { src: cliente5, alt: 'Cliente 5' },
  { src: cliente6, alt: 'Cliente 6' },
  { src: cliente7, alt: 'Cliente 7' },
  { src: cliente8, alt: 'Cliente 8' },
  { src: cliente9, alt: 'Cliente 9' },
  { src: cliente10, alt: 'Cliente 10' },
];

// Position each logo at different spots with different animation delays
const positions = [
  { top: '15%', left: '10%', delay: '0s', duration: '20s' },
  { top: '25%', right: '15%', delay: '2s', duration: '18s' },
  { top: '45%', left: '5%', delay: '4s', duration: '22s' },
  { top: '60%', right: '8%', delay: '1s', duration: '19s' },
  { top: '75%', left: '15%', delay: '3s', duration: '21s' },
  { top: '20%', right: '25%', delay: '5s', duration: '17s' },
  { top: '55%', right: '20%', delay: '2.5s', duration: '23s' },
  { top: '80%', right: '30%', delay: '1.5s', duration: '20s' },
  { top: '35%', left: '20%', delay: '3.5s', duration: '18s' },
  { top: '70%', left: '25%', delay: '4.5s', duration: '22s' },
];

const FloatingLogos = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {logos.map((logo, index) => {
        const pos = positions[index];
        return (
          <div
            key={index}
            className="absolute opacity-[0.07] animate-float"
            style={{
              top: pos.top,
              left: pos.left,
              right: pos.right,
              animationDelay: pos.delay,
              animationDuration: pos.duration,
            }}
          >
            <img
              src={logo.src}
              alt={logo.alt}
              className="w-20 md:w-28 lg:w-36 h-auto object-contain"
            />
          </div>
        );
      })}
    </div>
  );
};

export default FloatingLogos;
