import { useState, useEffect, useCallback } from 'react';

// Import all solution images
import taskmaster from '@/assets/solutions/taskmaster.webp';
import operations from '@/assets/solutions/operations.webp';
import performax from '@/assets/solutions/performax.webp';
import postmaster from '@/assets/solutions/postmaster.webp';
import leadclip from '@/assets/solutions/leadclip.webp';
import newspilot from '@/assets/solutions/newspilot.webp';
import turnus from '@/assets/solutions/turnus.webp';
import reelscript from '@/assets/solutions/reelscript.webp';
import slidereport from '@/assets/solutions/slidereport.webp';
import banksync from '@/assets/solutions/banksync.webp';

const allImages = [
  taskmaster,
  operations,
  performax,
  postmaster,
  leadclip,
  newspilot,
  turnus,
  reelscript,
  slidereport,
  banksync,
];

const OtherSolutionsSection = () => {
  // Track which images are currently displayed (6 images in grid)
  const [displayedImages, setDisplayedImages] = useState<string[]>(allImages.slice(0, 6));
  // Track which position is animating
  const [animatingIndex, setAnimatingIndex] = useState<number | null>(null);
  // Track if image is fading out (true) or fading in (false)
  const [isFadingOut, setIsFadingOut] = useState(false);

  const getRandomAvailableImage = useCallback((currentImages: string[]) => {
    const availableImages = allImages.filter(img => !currentImages.includes(img));
    if (availableImages.length === 0) return null;
    return availableImages[Math.floor(Math.random() * availableImages.length)];
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      // Select random position
      const randomPosition = Math.floor(Math.random() * 6);
      
      // Start fade-out animation
      setAnimatingIndex(randomPosition);
      setIsFadingOut(true);
      
      // After fade-out completes (300ms), swap image and fade-in
      setTimeout(() => {
        setDisplayedImages(prev => {
          const newImage = getRandomAvailableImage(prev);
          if (!newImage) return prev;
          
          const newImages = [...prev];
          newImages[randomPosition] = newImage;
          return newImages;
        });
        setIsFadingOut(false);
        
        // Clear animation state after fade-in completes
        setTimeout(() => {
          setAnimatingIndex(null);
        }, 300);
      }, 300);
    }, 2000);

    return () => clearInterval(interval);
  }, [getRandomAvailableImage]);

  return (
    <section className="section-padding">
      <div className="container-main max-w-[1000px]">
        {/* Image Grid */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4 mb-12 max-w-[700px] mx-auto">
          {displayedImages.map((image, index) => (
            <div
              key={index}
              className={`
                relative overflow-hidden rounded-xl cursor-pointer
                transition-all duration-500 ease-out
                hover:scale-105 hover:-translate-y-2 hover:shadow-xl
                ${animatingIndex === index 
                  ? isFadingOut 
                    ? 'opacity-0 scale-90' 
                    : 'opacity-100 scale-100'
                  : 'opacity-100 scale-100'
                }
              `}
              style={{
                transitionProperty: 'transform, box-shadow, opacity',
                transitionDuration: animatingIndex === index ? '300ms' : '500ms',
              }}
            >
              <img
                src={image}
                alt="Solução Dalton Lab"
                className="w-full h-auto aspect-[3/4] object-cover rounded-lg"
              />
            </div>
          ))}
        </div>

        {/* Text Content */}
        <div className="text-center">
          {/* Title */}
          <h2 className="font-inter font-bold text-3xl md:text-4xl lg:text-5xl text-white">
            Precisa de Agentes especialistas
            <br />
            para outras áreas do seu negócio?
          </h2>

          {/* Description */}
          <p className="mt-8 font-inter font-normal text-lg text-dalton-gray-light">
            Além do time de vendas, temos agentes especializados para atendimento ao cliente, RH, financeiro e outras áreas. Explore nosso marketplace de soluções.
          </p>

          {/* CTA Button */}
          <div className="mt-12">
            <button className="btn-cta">
              Explorar Marketplace
              <span className="ml-2">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OtherSolutionsSection;
