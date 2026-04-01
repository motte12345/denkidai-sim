import { useEffect } from 'react';

interface Props {
  title: string;
  description: string;
  path: string;
}

const SITE_NAME = '電気代カリキュレーター';
const BASE_URL = 'https://denkidai-sim.pages.dev';

export function Head({ title, description, path }: Props) {
  useEffect(() => {
    const fullTitle = path === '/' ? title : `${title} | ${SITE_NAME}`;
    document.title = fullTitle;

    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.name = name;
        document.head.appendChild(el);
      }
      el.content = content;
    };

    const setOg = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('property', property);
        document.head.appendChild(el);
      }
      el.content = content;
    };

    setMeta('description', description);
    setOg('og:title', fullTitle);
    setOg('og:description', description);
    setOg('og:url', `${BASE_URL}${path}`);

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = `${BASE_URL}${path}`;
  }, [title, description, path]);

  return null;
}
