/**
 * Deriva um resumo textual do corpo (PortableText) de um artigo do Sanity.
 *
 * Reaproveita a mesma lógica de "primeiro parágrafo" usada nos cards de artigo
 * (ver ArticleCard) para gerar meta descriptions consistentes na camada de SEO.
 * Pega o primeiro bloco de texto com conteúdo, concatena os spans filhos e trunca.
 */
export interface PortableTextBlock {
  _type?: string;
  children?: Array<{ text?: string }>;
}

export const getArticleExcerpt = (
  body?: PortableTextBlock[] | unknown,
  maxLength = 155,
): string => {
  if (!Array.isArray(body)) return '';
  const block = (body as PortableTextBlock[]).find(
    (b) => b?._type === 'block' && Array.isArray(b.children) && b.children.length > 0,
  );
  if (!block?.children) return '';
  const text = block.children
    .map((c) => c?.text ?? '')
    .join('')
    .trim();
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + '…';
};
