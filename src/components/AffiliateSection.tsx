interface SuggestionItem {
  label: string;
  description: string;
  searchQuery: string;
}

interface Props {
  title?: string;
  items: SuggestionItem[];
}

const AMAZON_TAG = 'qp2026-22';
const RAKUTEN_AFF_ID = '526c1e79.46d4a30e.526c1e7a.3db24b05';

function amazonSearchUrl(query: string): string {
  return `https://www.amazon.co.jp/s?k=${encodeURIComponent(query)}&tag=${AMAZON_TAG}`;
}

function rakutenSearchUrl(query: string): string {
  return `https://hb.afl.rakuten.co.jp/hgc/${RAKUTEN_AFF_ID}/?pc=https%3A%2F%2Fsearch.rakuten.co.jp%2Fsearch%2Fmall%2F${encodeURIComponent(query)}%2F`;
}

export function AffiliateSection({ title = '省エネ家電をチェック', items }: Props) {
  return (
    <div className="card" style={{ background: '#fffbeb', borderColor: '#fbbf24' }}>
      <h3 className="card__title" style={{ color: '#92400e' }}>{title}</h3>
      <p style={{ fontSize: '0.9rem', color: '#78716c', marginBottom: 16 }}>
        省エネ性能の高い家電に買い替えると、電気代を大幅に節約できます。
      </p>
      <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
        {items.map((item) => (
          <div
            key={item.label}
            style={{
              background: '#fff',
              borderRadius: 'var(--radius)',
              padding: 16,
              border: '1px solid #e5e7eb',
            }}
          >
            <div style={{ fontWeight: 600, marginBottom: 4 }}>{item.label}</div>
            <p style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: 12 }}>
              {item.description}
            </p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <a
                href={amazonSearchUrl(item.searchQuery)}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="btn btn--sm"
                style={{ background: '#ff9900', color: '#fff', textDecoration: 'none' }}
              >
                Amazonで探す
              </a>
              <a
                href={rakutenSearchUrl(item.searchQuery)}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="btn btn--sm"
                style={{ background: '#bf0000', color: '#fff', textDecoration: 'none' }}
              >
                楽天で探す
              </a>
            </div>
          </div>
        ))}
      </div>
      <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: 12 }}>
        ※ 上記リンクはアフィリエイトリンクです。購入による追加費用はかかりません。
      </p>
    </div>
  );
}
