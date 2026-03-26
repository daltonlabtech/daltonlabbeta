import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { useScrollReveal, revealClasses } from '@/hooks/useScrollReveal';
import { useTypewriter } from '@/hooks/useTypewriter';

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

const HIGHLIGHTED_COUNTRIES: Record<string, string> = {
  Brazil: '#999999',
  Angola: '#999999',
  Portugal: '#999999',
  Spain: '#999999',
  France: '#999999',
  'South Korea': '#999999',
  'North Korea': '#999999',
  Japan: '#999999',
  China: '#999999',
  Mongolia: '#999999',
  Myanmar: '#999999',
  Thailand: '#999999',
  Laos: '#999999',
  Vietnam: '#999999',
  Taiwan: '#999999',
  Philippines: '#999999',
  Malaysia: '#999999',
  Cambodia: '#999999',
  Indonesia: '#999999',
  'Papua New Guinea': '#999999',
  'Dem. Rep. Congo': '#999999',
  Chad: '#999999',
  'Central African Rep.': '#999999',
  Cameroon: '#999999',
  Congo: '#999999',
  Gabon: '#999999',
  'Eq. Guinea': '#999999',
  Germany: '#999999',
  Italy: '#999999',
  Netherlands: '#999999',
  Belgium: '#999999',
  'United Kingdom': '#999999',
  Ireland: '#999999',
  Denmark: '#999999',
  Austria: '#999999',
};

const CONTINENT_KEYS: Record<string, string> = {
  Brazil: 'southAmerica',
  Angola: 'africa', 'Dem. Rep. Congo': 'africa', Chad: 'africa',
  'Central African Rep.': 'africa', Cameroon: 'africa', Congo: 'africa',
  Gabon: 'africa', 'Eq. Guinea': 'africa',
  Portugal: 'europe', Spain: 'europe', France: 'europe', Germany: 'europe',
  Italy: 'europe', Netherlands: 'europe', Belgium: 'europe',
  'United Kingdom': 'europe', Ireland: 'europe', Denmark: 'europe',
  Austria: 'europe',
  'South Korea': 'asia', 'North Korea': 'asia', Japan: 'asia',
  China: 'asia', Mongolia: 'asia', Myanmar: 'asia', Thailand: 'asia',
  Laos: 'asia', Vietnam: 'asia', Taiwan: 'asia', Philippines: 'asia',
  Malaysia: 'asia', Cambodia: 'asia', Indonesia: 'asia',
  'Papua New Guinea': 'asia',
};

const SECTOR_COLORS = ['#15803d', '#b45309', '#b91c1c', '#b45309', '#1d4ed8'];

const DEFAULT_COLOR = '#E8E6E3';

const GlobalMapSection = () => {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollReveal();
  const sectors = t('home.globalMap.sectors', { returnObjects: true }) as string[];
  const { displayText, wordIndex } = useTypewriter({
    words: sectors,
  });
  const [tooltip, setTooltip] = useState('');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="py-12 md:py-16"
      style={{ backgroundColor: '#F5F3F0' }}
    >
      <div className="container-main">
        <h2
          className={`font-inter font-bold text-xl md:text-4xl lg:text-[48px] leading-tight text-center mb-8 md:mb-12 ${revealClasses(isVisible)}`}
          style={{ color: '#101824' }}
        >
          {t('home.globalMap.title')}{' '}
          <br className="block md:hidden" />
          <span style={{ color: SECTOR_COLORS[wordIndex] }}>{displayText}</span>
          <span className="animate-pulse" style={{ color: SECTOR_COLORS[wordIndex] }}>|</span>
        </h2>
      </div>

      <div
        className={`w-full max-w-7xl mx-auto px-4 relative ${revealClasses(isVisible)}`}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        }}
      >
        {tooltip && (
          <div
            className="absolute z-10 font-inter text-xs md:text-sm font-medium px-3 py-1.5 rounded-full pointer-events-none"
            style={{
              left: mousePos.x,
              top: mousePos.y - 36,
              transform: 'translateX(-50%)',
              backgroundColor: 'rgba(255,255,255,0.85)',
              color: '#374151',
              border: '1px solid rgba(0,0,0,0.08)',
              backdropFilter: 'blur(4px)',
            }}
          >
            {tooltip}
          </div>
        )}

        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ scale: 115, center: [10, 20] }}
          style={{ width: '100%', height: 'auto' }}
          viewBox="0 0 800 520"
        >
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies
                .filter((geo) => geo.properties.name !== 'Norway' && geo.properties.name !== 'Greenland')
                .map((geo) => {
                  const name = geo.properties.name;
                  const fillColor = HIGHLIGHTED_COUNTRIES[name] || DEFAULT_COLOR;
                  const continentKey = CONTINENT_KEYS[name];
                  const isHighlighted = !!HIGHLIGHTED_COUNTRIES[name];

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={fillColor}
                      stroke="#F5F3F0"
                      strokeWidth={0.5}
                      onMouseEnter={() => {
                        if (isHighlighted && continentKey) {
                          setTooltip(t(`home.globalMap.continents.${continentKey}`));
                        }
                      }}
                      onMouseLeave={() => setTooltip('')}
                      style={{
                        default: { outline: 'none' },
                        hover: {
                          fill: isHighlighted ? '#777777' : '#E8E6E3',
                          outline: 'none',
                          cursor: isHighlighted ? 'pointer' : 'default',
                        },
                        pressed: { outline: 'none' },
                      }}
                    />
                  );
                })
            }
          </Geographies>
        </ComposableMap>
      </div>

      <div className="container-main flex flex-col items-center">
        <p
          className={`text-center text-sm md:text-lg mt-4 md:mt-6 ${revealClasses(isVisible)}`}
          style={{ color: 'rgba(16,24,35,0.7)' }}
        >
          {t('home.globalMap.notOnMap')}{' '}
          <a
            href="https://formulario.daltonlab.ai/"
            className="font-semibold underline underline-offset-4 transition-colors duration-200"
            style={{ color: '#101824' }}
          >
            {t('home.globalMap.leadTheWay')}
          </a>
        </p>
        <a
          href="https://formulario.daltonlab.ai/"
          className={`mt-4 inline-flex items-center justify-center rounded-full px-8 py-3 font-inter font-semibold text-sm md:text-base text-white transition-opacity hover:opacity-90 ${revealClasses(isVisible)}`}
          style={{ backgroundColor: '#101824' }}
        >
          {t('nav.startTransformation')}
        </a>
      </div>
    </section>
  );
};

export default GlobalMapSection;