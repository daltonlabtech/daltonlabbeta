// UTM parameter forwarding between domains
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
const STORAGE_KEY = 'daltonlab_utms';
const TARGET_DOMAIN = 'formulario.daltonlab.ai';

/** Capture UTMs from current URL and persist to localStorage */
export function captureUtms(): void {
  const params = new URLSearchParams(window.location.search);
  const utms: Record<string, string> = {};

  UTM_KEYS.forEach((key) => {
    const value = params.get(key);
    if (value) utms[key] = value;
  });

  if (Object.keys(utms).length > 0) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(utms));
  }
}

/** Get stored UTMs */
export function getStoredUtms(): Record<string, string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

/** Append stored UTMs to a URL string */
export function appendUtms(href: string): string {
  const utms = getStoredUtms();
  if (Object.keys(utms).length === 0) return href;

  try {
    const url = new URL(href);
    Object.entries(utms).forEach(([key, value]) => {
      if (!url.searchParams.has(key)) {
        url.searchParams.set(key, value);
      }
    });
    return url.toString();
  } catch {
    return href;
  }
}

/** Decorate all existing and future links to the target domain */
export function initUtmForwarding(): void {
  captureUtms();

  const decorateLinks = () => {
    const utms = getStoredUtms();
    if (Object.keys(utms).length === 0) return;

    document.querySelectorAll<HTMLAnchorElement>(`a[href*="${TARGET_DOMAIN}"]`).forEach((a) => {
      a.href = appendUtms(a.href);
    });
  };

  // Decorate on load
  decorateLinks();

  // Re-decorate when DOM changes (SPA navigation, lazy sections)
  const observer = new MutationObserver(() => decorateLinks());
  observer.observe(document.body, { childList: true, subtree: true });
}
