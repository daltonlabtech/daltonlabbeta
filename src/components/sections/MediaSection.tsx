import { ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useScrollReveal, revealClasses, getStaggerDelay } from '@/hooks/useScrollReveal';

interface Article {
  title: string;
  source: string;
  url: string;
}

const MediaSection = () => {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollReveal();
  const articles = t('home.media.articles', { returnObjects: true }) as Article[];

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="media"
      className="py-[60px] md:py-[100px]"
      style={{ backgroundColor: '#F5F3F0' }}
    >
      <div className="container-main">
        {/* Header */}
        <div className={`mb-10 md:mb-16 ${revealClasses(isVisible)}`}>
          <h2
            className="font-inter font-bold text-3xl md:text-4xl lg:text-[48px] leading-tight"
            style={{ color: '#101824' }}
          >
            {t('home.media.title')}
          </h2>
        </div>

        {/* Articles grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {articles.map((article, index) => (
            <a
              key={index}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group p-6 md:p-8 rounded-2xl transition-all duration-500 hover:shadow-lg ${revealClasses(isVisible)}`}
              style={{
                ...getStaggerDelay(index + 1),
                backgroundColor: '#E8E6E3',
              }}
            >
              {/* Label */}
              <span
                className="inline-block text-xs font-medium px-3 py-1 rounded-full mb-4"
                style={{
                  backgroundColor: '#101824',
                  color: '#F5F3F0',
                }}
              >
                {t('home.media.label')}
              </span>

              {/* Source */}
              <p
                className="text-sm font-medium mb-2"
                style={{ color: 'rgba(16, 24, 35, 0.5)' }}
              >
                {article.source}
              </p>

              {/* Title */}
              <h3
                className="font-inter font-semibold text-lg md:text-xl leading-snug mb-4 group-hover:underline"
                style={{ color: '#101824' }}
              >
                {article.title}
              </h3>

              {/* Arrow */}
              <ArrowUpRight
                className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
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
