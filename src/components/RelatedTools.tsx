import { Link } from 'react-router-dom';

interface Tool {
  to: string;
  label: string;
}

const ALL_TOOLS: Tool[] = [
  { to: '/calc', label: '家電別 電気代計算' },
  { to: '/total', label: '家計まるごと計算' },
  { to: '/replace', label: '買い替えシミュレーター' },
  { to: '/aircon', label: 'エアコン比較' },
  { to: '/plan', label: 'プラン比較' },
];

interface Props {
  current: string;
}

export function RelatedTools({ current }: Props) {
  const others = ALL_TOOLS.filter((t) => t.to !== current);

  return (
    <div className="card" style={{ marginTop: 16 }}>
      <h3 className="card__title">他のツールも試す</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {others.map((tool) => (
          <Link
            key={tool.to}
            to={tool.to}
            className="btn btn--secondary btn--sm"
            style={{ textDecoration: 'none' }}
          >
            {tool.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
