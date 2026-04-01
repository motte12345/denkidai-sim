import { Link } from 'react-router-dom';
import { Head } from '../components/Head';
import { AdUnit } from '../components/AdUnit';

const tools = [
  {
    to: '/calc',
    title: '家電別 電気代計算',
    desc: '家電の消費電力と使用時間から、1時間・1日・1ヶ月・1年の電気代を計算します。50種類以上のプリセットから選べます。',
  },
  {
    to: '/total',
    title: '家計の電気代まるごと計算',
    desc: '家中の家電を登録して、電気代の合計と構成比を一覧表示。何が一番電気代を食っているか一目でわかります。',
  },
  {
    to: '/replace',
    title: '買い替え節約シミュレーター',
    desc: '今の家電と省エネ家電の電気代を比較。購入価格の元が取れるまでの期間を計算します。',
  },
  {
    to: '/aircon',
    title: 'エアコン つけっぱなし vs こまめに切る',
    desc: '外出時にエアコンをつけっぱなしにするのと切るのと、どちらが安いか比較します。',
  },
  {
    to: '/plan',
    title: '電力会社・プラン別 単価比較',
    desc: '主要10電力会社の従量電灯プランで、月間使用量に応じた電気代を一覧比較します。',
  },
];

export function TopPage() {
  return (
    <>
      <Head
        title="電気代カリキュレーター | 家電ごとの電気代を簡単計算"
        description="家電の消費電力から電気代を簡単計算。50種類以上のプリセットから選ぶだけ。買い替え節約シミュレーション、電力会社比較も。"
        path="/"
      />
      <h2 className="page-title">電気代カリキュレーター</h2>
      <p className="page-description">
        家電ごとの電気代を計算して、節約のポイントを見つけましょう。
      </p>

      <div className="tool-grid">
        {tools.map((tool) => (
          <Link key={tool.to} to={tool.to} className="tool-card">
            <div className="tool-card__title">{tool.title}</div>
            <div className="tool-card__desc">{tool.desc}</div>
          </Link>
        ))}
      </div>

      <AdUnit slot="top-bottom" />
    </>
  );
}
