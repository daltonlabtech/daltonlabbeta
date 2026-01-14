const placeholderLogos = [
  'Cliente 1',
  'Cliente 2',
  'Cliente 3',
  'Cliente 4',
  'Cliente 5',
  'Cliente 6',
  'Cliente 7',
  'Cliente 8',
];

const LogoMarquee = () => {
  return (
    <div className="w-full overflow-hidden py-6 md:py-8">
      <div className="relative flex">
        {/* First set of logos */}
        <div className="animate-marquee flex items-center gap-12 md:gap-16">
          {placeholderLogos.map((logo, index) => (
            <div
              key={`logo-1-${index}`}
              className="flex-shrink-0 h-8 md:h-10 px-6 md:px-8 flex items-center justify-center border border-foreground/20 rounded-lg"
            >
              <span className="text-foreground/50 text-sm md:text-base font-medium whitespace-nowrap">
                {logo}
              </span>
            </div>
          ))}
        </div>
        
        {/* Duplicate set for seamless loop */}
        <div className="animate-marquee flex items-center gap-12 md:gap-16" aria-hidden="true">
          {placeholderLogos.map((logo, index) => (
            <div
              key={`logo-2-${index}`}
              className="flex-shrink-0 h-8 md:h-10 px-6 md:px-8 flex items-center justify-center border border-foreground/20 rounded-lg"
            >
              <span className="text-foreground/50 text-sm md:text-base font-medium whitespace-nowrap">
                {logo}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogoMarquee;
