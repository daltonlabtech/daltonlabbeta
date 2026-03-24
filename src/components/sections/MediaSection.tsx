import { ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useScrollReveal, revealClasses, getStaggerDelay } from '@/hooks/useScrollReveal';
import vejaImage from '@/assets/media/veja-negocios.webp';
import cnnImage from '@/assets/media/cnn-preview.png';

interface FeaturedArticle {
  title: string;
  source: string;
  date: string;
  summary: string;
  url: string;
}

interface BlogPost {
  title: string;
  url: string;
  label?: string;
}

const MediaSection = () => {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollReveal();
  const featured = t('home.media.featured', { returnObjects: true }) as FeaturedArticle;
  const blogPosts = t('home.media.blogPosts', { returnObjects: true }) as BlogPost[];

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="media"
      className="py-10 md:py-[100px]"
      style={{ backgroundColor: '#F5F3F0' }}
    >
      <div className="container-main">
        {/* Section Title */}
        <div className={`mb-6 md:mb-16 ${revealClasses(isVisible)}`}>
          <h2
            className="font-inter font-bold text-[10px] md:text-sm tracking-[0.2em] uppercase"
            style={{ color: 'rgba(16, 24, 35, 0.5)' }}
          >
            {t('home.media.sectionTitle')}
          </h2>
        </div>

        {/* Featured Article - Two Column Layout */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-6 md:mb-12 ${revealClasses(isVisible)}`}
          style={getStaggerDelay(1)}
        >
          {/* Left: Image */}
          <a
            href={featured.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-xl md:rounded-2xl overflow-hidden aspect-[4/3] bg-zinc-200"
          >
            <img
              src={vejaImage}
              alt={featured.title}
              width={840}
              height={630}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              decoding="async"
            />
          </a>

          {/* Right: Content */}
          <a
            href={featured.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col justify-center p-4 md:p-8 rounded-xl md:rounded-2xl transition-all duration-500 hover:shadow-lg"
            style={{ backgroundColor: '#E8E6E3' }}
          >
            {/* Label */}
            <span
              className="inline-block text-[10px] md:text-xs font-semibold tracking-[0.15em] uppercase mb-2 md:mb-4"
              style={{ color: 'rgba(16, 24, 35, 0.5)' }}
            >
              {t('home.media.label')}
            </span>

            {/* Title */}
            <h3
              className="font-inter font-bold text-base md:text-2xl lg:text-3xl leading-snug mb-2 md:mb-4 group-hover:underline"
              style={{ color: '#101824' }}
            >
              {featured.title}
            </h3>

            {/* Date + Summary */}
            <p
              className="text-xs md:text-base leading-relaxed"
              style={{ color: 'rgba(16, 24, 35, 0.6)' }}
            >
              <span className="font-medium">{featured.date}</span> — {featured.summary}
            </p>

            {/* Arrow */}
            <ArrowUpRight
              className="w-4 h-4 md:w-5 md:h-5 mt-4 md:mt-6 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              style={{ color: '#101824' }}
            />
          </a>
        </div>

        {/* CNN Card - Full Width */}
        {blogPosts.length > 0 && (
          <a
            href={blogPosts[0].url}
            target="_blank"
            rel="noopener noreferrer"
            className={`group grid grid-cols-1 md:grid-cols-2 gap-0 rounded-xl md:rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-lg mb-3 md:mb-6 ${revealClasses(isVisible)}`}
            style={{
              ...getStaggerDelay(2),
              backgroundColor: '#E8E6E3',
            }}
          >
            <div className="aspect-[16/9] overflow-hidden flex items-center justify-center" style={{ backgroundColor: '#D4D2CF' }}>
              <img
                src={cnnImage}
                alt={blogPosts[0].title}
                className="w-3/4 h-auto object-contain transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="p-4 md:p-8 flex flex-col justify-center">
              <span
                className="inline-block text-[10px] md:text-xs font-semibold tracking-[0.15em] uppercase mb-2 md:mb-4"
                style={{ color: 'rgba(16, 24, 35, 0.5)' }}
              >
                {blogPosts[0].label || t('home.media.blogLabel')}
              </span>
              <h4
                className="font-inter font-semibold text-sm md:text-lg leading-snug group-hover:underline"
                style={{ color: '#101824' }}
              >
                {blogPosts[0].title}
              </h4>
              <p
                className="text-xs md:text-sm leading-relaxed mt-2 md:mt-3"
                style={{ color: 'rgba(16, 24, 35, 0.6)' }}
              >
                <span className="font-medium">16 de mar 2026</span> — À CNN, executivo do Dalton Lab defende que a transformação é operacional, e não tecnológica
              </p>
              <ArrowUpRight
                className="w-3 h-3 md:w-4 md:h-4 mt-3 md:mt-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                style={{ color: '#101824' }}
              />
            </div>
          </a>
        )}

        {/* Remaining Blog Posts - 2 Columns */}
        {blogPosts.length > 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
            {blogPosts.slice(1).map((post, index) => (
              <a
                key={index}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group rounded-xl md:rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-lg ${revealClasses(isVisible)}`}
                style={{
                  ...getStaggerDelay(index + 3),
                  backgroundColor: '#E8E6E3',
                }}
              >
                <div className="p-4 md:p-8">
                  <span
                    className="inline-block text-[10px] md:text-xs font-semibold tracking-[0.15em] uppercase mb-2 md:mb-4"
                    style={{ color: 'rgba(16, 24, 35, 0.5)' }}
                  >
                    {post.label || t('home.media.blogLabel')}
                  </span>
                  <h4
                    className="font-inter font-semibold text-sm md:text-lg leading-snug group-hover:underline"
                    style={{ color: '#101824' }}
                  >
                    {post.title}
                  </h4>
                  <ArrowUpRight
                    className="w-3 h-3 md:w-4 md:h-4 mt-3 md:mt-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    style={{ color: '#101824' }}
                  />
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MediaSection;
