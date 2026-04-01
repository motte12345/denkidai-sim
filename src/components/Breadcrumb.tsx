import { Link } from 'react-router-dom';
import { JsonLd } from './JsonLd';

interface Props {
  items: { name: string; path?: string }[];
}

const BASE_URL = 'https://denkidai-sim.pages.dev';

export function Breadcrumb({ items }: Props) {
  const allItems = [{ name: 'トップ', path: '/' }, ...items];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: allItems.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      ...(item.path ? { item: `${BASE_URL}${item.path}` } : {}),
    })),
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <nav aria-label="パンくずリスト" style={{ marginBottom: 16, fontSize: '0.85rem' }}>
        <ol style={{ listStyle: 'none', display: 'flex', flexWrap: 'wrap', gap: 0, padding: 0 }}>
          {allItems.map((item, i) => (
            <li key={item.name} style={{ display: 'flex', alignItems: 'center' }}>
              {i > 0 && <span style={{ margin: '0 6px', color: 'var(--color-text-secondary)' }}>/</span>}
              {item.path ? (
                <Link to={item.path} style={{ color: 'var(--color-text-secondary)' }}>{item.name}</Link>
              ) : (
                <span aria-current="page" style={{ color: 'var(--color-text)' }}>{item.name}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
