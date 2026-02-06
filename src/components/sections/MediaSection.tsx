import { ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useScrollReveal, revealClasses, getStaggerDelay } from '@/hooks/useScrollReveal';

interface FeaturedArticle {
  title: string;
  source: string;
  date: string;
  summary: string;
  url: string;
  image: string;
}

interface BlogPost {
  title: string;
  url: string;
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
      className="py-[60px] md:py-[100px]"
      style={{ backgroundColor: '#F5F3F0' }}
    >
      <div className="container-main">
        {/* Section Title */}
        <div className={`mb-10 md:mb-16 ${revealClasses(isVisible)}`}>
          <h2
            className="font-inter font-bold text-xs md:text-sm tracking-[0.2em] uppercase"
            style={{ color: 'rgba(16, 24, 35, 0.5)' }}
          >
            {t('home.media.sectionTitle')}
          </h2>
        </div>

        {/* Featured Article - Two Column Layout */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12 ${revealClasses(isVisible)}`}
          style={getStaggerDelay(1)}
        >
          {/* Left: Image */}
          <a
            href={featured.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-2xl overflow-hidden aspect-[4/3] bg-zinc-200"
          >
            <img
              src={featured.image}
              alt={featured.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </a>

          {/* Right: Content */}
          <a
            href={featured.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col justify-center p-6 md:p-8 rounded-2xl transition-all duration-500 hover:shadow-lg"
            style={{ backgroundColor: '#E8E6E3' }}
          >
            {/* Label */}
            <span
              className="inline-block text-xs font-semibold tracking-[0.15em] uppercase mb-4"
              style={{ color: 'rgba(16, 24, 35, 0.5)' }}
            >
              {t('home.media.label')}
            </span>

            {/* Title */}
            <h3
              className="font-inter font-bold text-xl md:text-2xl lg:text-3xl leading-snug mb-4 group-hover:underline"
              style={{ color: '#101824' }}
            >
              {featured.title}
            </h3>

            {/* Date + Summary */}
            <p
              className="text-sm md:text-base leading-relaxed"
              style={{ color: 'rgba(16, 24, 35, 0.6)' }}
            >
              <span className="font-medium">{featured.date}</span> — {featured.summary}
            </p>

            {/* Arrow */}
            <ArrowUpRight
              className="w-5 h-5 mt-6 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              style={{ color: '#101824' }}
            />
          </a>
        </div>

        {/* Blog Posts Grid - 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {blogPosts.map((post, index) => (
            <a
              key={index}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group p-6 md:p-8 rounded-2xl transition-all duration-500 hover:shadow-lg ${revealClasses(isVisible)}`}
              style={{
                ...getStaggerDelay(index + 2),
                backgroundColor: '#E8E6E3',
              }}
            >
              {/* Label */}
              <span
                className="inline-block text-xs font-semibold tracking-[0.15em] uppercase mb-4"
                style={{ color: 'rgba(16, 24, 35, 0.5)' }}
              >
                {t('home.media.blogLabel')}
              </span>

              {/* Title */}
              <h4
                className="font-inter font-semibold text-base md:text-lg leading-snug group-hover:underline"
                style={{ color: '#101824' }}
              >
                {post.title}
              </h4>

              {/* Arrow */}
              <ArrowUpRight
                className="w-4 h-4 mt-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                style={{ color: '#101824' }}
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MediaSection;
