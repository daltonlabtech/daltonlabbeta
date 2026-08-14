import { describe, it, expect } from "vitest";
// The generator lives in scripts/ (Node build tooling). We import its pure,
// testable helpers here so `npm run test` covers the guard-rail + XML builder.
import {
  buildSitemap,
  assertArticles,
  xmlEscape,
  toIsoDate,
  STATIC_ROUTES,
  SITE_URL,
} from "../../scripts/generate-sitemap.mjs";

const articles = [
  { slug: "primeiro-artigo", publishedAt: "2026-01-01", _updatedAt: "2026-03-02T10:00:00Z" },
  { slug: "segundo-artigo", publishedAt: "2026-02-01", _updatedAt: "2026-04-15T12:30:00Z" },
];

describe("generate-sitemap: buildSitemap", () => {
  const xml = buildSitemap({ articles, buildDate: new Date("2026-07-08T00:00:00Z") });

  it("produces a valid XML document with a urlset root", () => {
    expect(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(true);
    expect(xml).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
    expect(xml.trim().endsWith("</urlset>")).toBe(true);
  });

  it("includes every static route and no excluded route", () => {
    for (const route of STATIC_ROUTES) {
      expect(xml).toContain(`<loc>${SITE_URL}${route.path}</loc>`);
    }
    expect(xml).not.toContain("/newton");
    expect(xml).not.toContain("/produto");
    expect(xml).not.toContain("/casos");
    expect(xml).not.toContain("/artigos/insight");
  });

  it("emits one url per article using the real _updatedAt date", () => {
    expect(xml).toContain(`<loc>${SITE_URL}/artigos/primeiro-artigo</loc>`);
    expect(xml).toContain(`<loc>${SITE_URL}/artigos/segundo-artigo</loc>`);
    expect(xml).toContain("<lastmod>2026-03-02</lastmod>");
    expect(xml).toContain("<lastmod>2026-04-15</lastmod>");
  });

  it("has the expected total URL count (static + articles)", () => {
    const count = (xml.match(/<loc>/g) || []).length;
    expect(count).toBe(STATIC_ROUTES.length + articles.length);
  });
});

describe("generate-sitemap: assertArticles guard-rail", () => {
  it("throws on zero articles", () => {
    expect(() => assertArticles([])).toThrow(/zero articles/);
  });

  it("throws on a non-array result", () => {
    expect(() => assertArticles(null as unknown as unknown[])).toThrow(/non-array/);
    expect(() => assertArticles(undefined as unknown as unknown[])).toThrow(/non-array/);
  });

  it("returns the array when it has at least one article", () => {
    expect(assertArticles(articles)).toBe(articles);
  });
});

describe("generate-sitemap: helpers", () => {
  it("escapes XML entities in loc values", () => {
    expect(xmlEscape("a&b<c>\"d'")).toBe("a&amp;b&lt;c&gt;&quot;d&apos;");
  });

  it("normalizes dates to YYYY-MM-DD", () => {
    expect(toIsoDate("2026-04-15T12:30:00Z")).toBe("2026-04-15");
  });
});
