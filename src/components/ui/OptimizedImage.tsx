import { useState, useRef, useEffect, ImgHTMLAttributes } from 'react';

interface OptimizedImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  sizes?: string;
}

/**
 * OptimizedImage component with lazy loading, fade-in animation, and proper dimensions
 * - Uses native lazy loading for below-the-fold images
 * - Eager loading for priority/above-the-fold images
 * - Smooth fade-in animation on load
 * - Prevents CLS with proper dimensions
 */
const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
  sizes,
  ...props
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (priority) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  return (
    <img
      ref={imgRef}
      src={isInView ? src : undefined}
      data-src={src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : 'auto'}
      sizes={sizes}
      onLoad={() => setIsLoaded(true)}
      className={`transition-opacity duration-500 ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      } ${className}`}
      {...props}
    />
  );
};

export default OptimizedImage;
