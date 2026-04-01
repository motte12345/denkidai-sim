import { Head } from '../components/Head';
import ratesData from '../data/electricityRates.json';

export function AboutPage() {
  return (
    <>
      <Head
        title="概要・免責事項"
        description="電気代カリキュレーターの概要と免責事項。計算の前提条件や料金データについて説明します。"
        path="/about"
      />
      <h2 className="page-title">概要・免責事項</h2>

      <div className="card">
        <h3 className="card__title">このサイトについて</h3>
        <p style={{ lineHeight: 1.8 }}>
          「電気代カリキュレーター」は、家電ごとの電気代を簡単に計算できる無料ツールです。
          消費電力と使用時間から電気代を算出し、節約や家電の買い替え判断をサポートします。
        </p>
      </div>

      <div className="card">
        <h3 className="card__title">免責事項</h3>
        <ul style={{ lineHeight: 2, paddingLeft: 20 }}>
          <li>
            本サイトの計算結果は概算であり、実際の電気代は使用環境・契約内容により異なります。
          </li>
          <li>
            電力料金は改定される場合があります。最新の料金は各電力会社の公式サイトでご確認ください。
          </li>
          <li>
            エアコンの比較計算は簡易モデルであり、実際のインバーター制御とは異なります。
          </li>
          <li>
            特定の電力会社や家電製品を推奨するものではありません。
          </li>
          <li>
            本サイトの情報に基づく判断によって生じた損害について、一切の責任を負いません。
          </li>
        </ul>
      </div>

      <div className="card">
        <h3 className="card__title">料金データについて</h3>
        <p style={{ lineHeight: 1.8 }}>
          電力料金データは主要10電力会社の従量電灯プラン（規制料金）に基づいています。
          自由化プラン（新電力）は対象外です。
        </p>
        <p style={{ marginTop: 8, fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
          料金データ最終更新日: {ratesData.lastUpdated}
        </p>
      </div>
    </>
  );
}
