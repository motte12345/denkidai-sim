import { useEffect } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { trackPageView } from '../utils/analytics';

const navItems = [
  { to: '/calc', label: '家電別計算' },
  { to: '/total', label: 'まるごと計算' },
  { to: '/replace', label: '買い替え' },
  { to: '/aircon', label: 'エアコン比較' },
  { to: '/plan', label: 'プラン比較' },
];

export function Layout() {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname, document.title);
  }, [location.pathname]);

  return (
    <>
      <header className="site-header">
        <div className="container">
          <h1 className="site-header__title">
            <Link to="/">電気代カリキュレーター</Link>
          </h1>
          <nav className="site-nav" aria-label="メインナビゲーション">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="main">
        <div className="container">
          <Outlet />
        </div>
      </main>

      <footer className="site-footer">
        <div className="container">
          <p className="site-footer__related">
            関連ツール:{' '}
            <a href="https://hikkoshi-sim.pages.dev/" target="_blank" rel="noopener noreferrer">
              引越し費用シミュレーター
            </a>
          </p>
          <p>
            電気代カリキュレーター —{' '}
            <Link to="/about">概要・免責事項</Link>{' / '}
            <Link to="/privacy">プライバシーポリシー</Link>
          </p>
          <p style={{ marginTop: 4, fontSize: '0.8rem' }}>
            ※ 計算結果は概算です。実際の電気代は契約内容や使用環境により異なります。
          </p>
        </div>
      </footer>
    </>
  );
}
