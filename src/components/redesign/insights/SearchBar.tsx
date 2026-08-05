import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface SearchBarProps {
  /** chamado (debounced) quando o termo muda */
  onChange: (term: string) => void;
  debounceMs?: number;
}

/**
 * Busca full-width — porta `.ins-search-wrap` / `#ins-search` do original.
 * Filtro debounced; placeholder via i18n (`insp.search`).
 */
export default function SearchBar({ onChange, debounceMs = 180 }: SearchBarProps) {
  const { t } = useTranslation();
  const [value, setValue] = useState('');
  const [focused, setFocused] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => onChange(value.trim().toLowerCase()), debounceMs);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [value, debounceMs, onChange]);

  return (
    <div style={{ position: 'relative', marginTop: 28 }}>
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          position: 'absolute',
          left: 16,
          top: '50%',
          transform: 'translateY(-50%)',
          color: 'var(--muted-navy)',
          pointerEvents: 'none',
        }}
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m21 21-4.3-4.3" />
      </svg>
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={t('insp.search', 'Buscar por título ou tema…')}
        style={{
          width: '100%',
          appearance: 'none',
          background: 'var(--surface)',
          border: focused ? '1px solid rgba(143,230,255,0.5)' : '1px solid var(--border-navy)',
          borderRadius: 999,
          color: 'var(--text)',
          fontFamily: 'var(--font-sans)',
          fontSize: 15,
          padding: '14px 18px 14px 46px',
          boxShadow: focused ? '0 0 0 4px rgba(143,230,255,0.12)' : undefined,
          outline: 'none',
          transition: 'border-color .3s, box-shadow .3s',
          boxSizing: 'border-box',
        }}
      />
    </div>
  );
}
