import { describe, it, expect } from 'vitest';
import { getArticleExcerpt } from './excerpt';

describe('getArticleExcerpt', () => {
  it('derives text from the first block with children', () => {
    const body = [
      { _type: 'image' },
      {
        _type: 'block',
        children: [{ text: 'Primeiro parágrafo do artigo. ' }, { text: 'Continua aqui.' }],
      },
      { _type: 'block', children: [{ text: 'Segundo parágrafo.' }] },
    ];
    expect(getArticleExcerpt(body)).toBe('Primeiro parágrafo do artigo. Continua aqui.');
  });

  it('truncates long text and appends an ellipsis', () => {
    const long = 'a'.repeat(300);
    const body = [{ _type: 'block', children: [{ text: long }] }];
    const out = getArticleExcerpt(body, 155);
    expect(out.length).toBeLessThanOrEqual(156); // 155 chars + ellipsis
    expect(out.endsWith('…')).toBe(true);
  });

  it('returns empty string for undefined body (so callers can fall back)', () => {
    expect(getArticleExcerpt(undefined)).toBe('');
  });

  it('returns empty string when body has no readable block', () => {
    expect(getArticleExcerpt([{ _type: 'image' }, { _type: 'block', children: [] }])).toBe('');
  });

  it('returns empty string for non-array input', () => {
    expect(getArticleExcerpt({} as unknown)).toBe('');
  });
});
