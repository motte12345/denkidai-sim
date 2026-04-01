// GA4 SPA ページ遷移トラッキング
// index.html で gtag.js は読み込み済み

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackPageView(path: string, title: string): void {
  if (window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: title,
    });
  }
}
