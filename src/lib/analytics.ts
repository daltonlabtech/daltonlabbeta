// Google Tag Manager DataLayer utilities
// GTM Container ID: GTM-PPF26W8Q

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

// Initialize dataLayer if it doesn't exist
const getDataLayer = (): Record<string, unknown>[] => {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    return window.dataLayer;
  }
  return [];
};

// Push event to dataLayer
const pushEvent = (event: Record<string, unknown>) => {
  const dataLayer = getDataLayer();
  dataLayer.push(event);
};

// ============================================
// PAGE & SECTION TRACKING
// ============================================

export const trackPageView = (pagePath: string, pageTitle: string) => {
  pushEvent({
    event: 'page_view',
    page_path: pagePath,
    page_title: pageTitle,
  });
};

export const trackSectionView = (sectionName: string) => {
  pushEvent({
    event: 'section_view',
    section_name: sectionName,
  });
};

// ============================================
// CTA & ENGAGEMENT TRACKING
// ============================================

export const trackCtaClick = (
  buttonText: string,
  buttonLocation: string,
  destinationUrl: string
) => {
  pushEvent({
    event: 'cta_click',
    button_text: buttonText,
    button_location: buttonLocation,
    destination_url: destinationUrl,
  });
};

export const trackTabChange = (tabName: string, sectionName: string) => {
  pushEvent({
    event: 'tab_change',
    tab_name: tabName,
    section_name: sectionName,
  });
};

export const trackFaqOpen = (questionText: string) => {
  pushEvent({
    event: 'faq_open',
    question_text: questionText,
  });
};

export const trackOutboundLink = (linkUrl: string, linkText: string) => {
  pushEvent({
    event: 'outbound_link',
    link_url: linkUrl,
    link_text: linkText,
  });
};

// ============================================
// WAITLIST / LEAD TRACKING
// ============================================

export const trackWaitlistOpen = (formLocation: string) => {
  pushEvent({
    event: 'waitlist_open',
    form_location: formLocation,
  });
};

export const trackWaitlistSubmit = (formLocation: string) => {
  pushEvent({
    event: 'waitlist_submit',
    form_location: formLocation,
  });
};
