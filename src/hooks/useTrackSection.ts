import { useEffect, useRef } from 'react';
import { trackSectionView } from '@/lib/analytics';

// Track which sections have been viewed in this session
const viewedSections = new Set<string>();

/**
 * Hook to track when a section enters the viewport
 * Fires section_view event only once per session per section
 */
export const useTrackSection = (sectionName: string) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    // Skip if already viewed in this session
    if (viewedSections.has(sectionName)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !viewedSections.has(sectionName)) {
            viewedSections.add(sectionName);
            trackSectionView(sectionName);
            // Disconnect after firing once
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.1, // 10% visibility triggers the event
        rootMargin: '0px',
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [sectionName]);

  return sectionRef;
};

export default useTrackSection;
