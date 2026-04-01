import { useState, useCallback, useRef } from 'react';
import { Head } from '../components/Head';
import { Breadcrumb } from '../components/Breadcrumb';
import { JsonLd } from '../components/JsonLd';
import { AdUnit } from '../components/AdUnit';
import { AffiliateSection } from '../components/AffiliateSection';
import { RelatedTools } from '../components/RelatedTools';
import { formatCurrency } from '../utils/calc';
import ratesData from '../data/electricityRates.json';

interface ReplaceResult {
  currentYearly: number;
  newYearly: number;
  savingYearly: number;
  breakEvenYears: number | null;
  cost5yr: { current: number; new: number };
  cost10yr: { current: number; new: number };
}

function calcReplace(
  currentWatt: number,
  newWatt: number,
  hoursPerDay: number,
  purchasePrice: number,
  rate: number
): ReplaceResult {
  const currentYearly = (currentWatt / 1000) * hoursPerDay * 30 * 12 * rate;
  const newYearly = (newWatt / 1000) * hoursPerDay * 30 * 12 * rate;
  const savingYearly = currentYearly - newYearly;

  const breakEvenYears =
    savingYearly > 0 ? purchasePrice / savingYearly : null;

  return {
    currentYearly,
    newYearly,
    savingYearly,
    breakEvenYears,
    cost5yr: {
      current: currentYearly * 5,
      new: purchasePrice + newYearly * 5,
    },
    cost10yr: {
      current: currentYearly * 10,
      new: purchasePrice + newYearly * 10,
    },
  };
}

export function ReplacePage() {
  const [currentWatt, setCurrentWatt] = useState(800);
  const [newWatt, setNewWatt] = useState(400);
  const [hoursPerDay, setHoursPerDay] = useState(8);
  const [purchasePrice, setPurchasePrice] = useState(50000);
  const [rate, setRate] = useState(ratesData.defaultRate);
  const [result, setResult] = useState<ReplaceResult | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleCalc = useCallback(() => {
    if ([currentWatt, newWatt, hoursPerDay, rate].some((v) => !Number.isFinite(v) || v <= 0)) return;
    setResult(calcReplace(currentWatt, newWatt, hoursPerDay, purchasePrice, rate));
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  }, [currentWatt, newWatt, hoursPerDay, purchasePrice, rate]);

  return (
    <>
      <Head
        title="買い替え節約シミュレーター"
        description="今の家電と省エネ家電の電気代を比較。購入価格の元が取れるまでの期間と5年・10年のトータルコストを計算します。"
        path="/replace"
      />
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: '家電の買い替えで元が取れるか計算する方法',
        description: '現在の家電と省エネ家電の消費電力を比較し、購入価格の回収期間を計算します。',
        step: [
          { '@type': 'HowToStep', text: '現在の家電と買い替え候補の消費電力（W数）を入力する' },
          { '@type': 'HowToStep', text: '1日の使用時間と買い替え候補の購入価格を入力する' },
          { '@type': 'HowToStep', text: '「計算する」を押して元が取れるまでの期間を確認する' },
        ],
      }} />
      <Breadcrumb items={[{ name: '買い替えシミュレーター' }]} />
      <h2 className="page-title">買い替え節約シミュレーター</h2>
      <p className="page-description">
        今の家電と省エネ家電の電気代を比較し、買い替えの損益分岐点を計算します。
      </p>

      <div className="card">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="current-watt">現在の消費電力（W）</label>
            <input
              id="current-watt"
              type="number"
              min={1}
              value={currentWatt}
              onChange={(e) => setCurrentWatt(Number(e.target.value))}
            />
          </div>
          <div className="form-group">
            <label htmlFor="new-watt">買い替え候補の消費電力（W）</label>
            <input
              id="new-watt"
              type="number"
              min={1}
              value={newWatt}
              onChange={(e) => setNewWatt(Number(e.target.value))}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="replace-hours">1日の使用時間</label>
            <input
              id="replace-hours"
              type="number"
              min={0.5}
              max={24}
              step={0.5}
              value={hoursPerDay}
              onChange={(e) => setHoursPerDay(Number(e.target.value))}
            />
          </div>
          <div className="form-group">
            <label htmlFor="purchase-price">購入価格（円）</label>
            <input
              id="purchase-price"
              type="number"
              min={0}
              step={1000}
              value={purchasePrice}
              onChange={(e) => setPurchasePrice(Number(e.target.value))}
            />
          </div>
          <div className="form-group">
            <label htmlFor="replace-rate">料金単価（円/kWh）</label>
            <input
              id="replace-rate"
              type="number"
              min={1}
              step={0.1}
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
            />
          </div>
        </div>

        <button className="btn btn--primary" onClick={handleCalc}>
          計算する
        </button>
      </div>

      {result && (
        <div className="card" ref={resultRef}>
          <h3 className="card__title">計算結果</h3>

          <div className="result-grid">
            <div className="result-item">
              <div className="result-item__label">年間の電気代削減額</div>
              <div className="result-item__value">
                {result.savingYearly > 0 ? '−' : '+'}
                {formatCurrency(Math.abs(result.savingYearly))}円/年
              </div>
              {result.savingYearly <= 0 && (
                <div className="result-item__sub">
                  消費電力が増えるため削減になりません
                </div>
              )}
            </div>
            <div className="result-item result-item--highlight">
              <div className="result-item__label">元が取れるまで</div>
              <div className="result-item__value">
                {result.breakEvenYears !== null
                  ? `${result.breakEvenYears.toFixed(1)}年`
                  : '—'}
              </div>
              {result.breakEvenYears !== null && (
                <div className="result-item__sub">
                  {result.breakEvenYears <= 5
                    ? '5年以内に元が取れます'
                    : result.breakEvenYears <= 10
                      ? '10年以内に元が取れます'
                      : '元を取るのに時間がかかります'}
                </div>
              )}
            </div>
          </div>

          <h4 style={{ margin: '24px 0 12px', fontSize: '1rem' }}>
            トータルコスト比較
          </h4>
          <table className="data-table">
            <thead>
              <tr>
                <th></th>
                <th>年間電気代</th>
                <th>5年間のコスト</th>
                <th>10年間のコスト</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>現在の家電</td>
                <td className="number">{formatCurrency(result.currentYearly)}円</td>
                <td className="number">{formatCurrency(result.cost5yr.current)}円</td>
                <td className="number">{formatCurrency(result.cost10yr.current)}円</td>
              </tr>
              <tr>
                <td>買い替え後</td>
                <td className="number">{formatCurrency(result.newYearly)}円</td>
                <td className="number">
                  {formatCurrency(result.cost5yr.new)}円
                  <br />
                  <small style={{ color: 'var(--color-text-secondary)' }}>
                    （購入費 {formatCurrency(purchasePrice)}円 込み）
                  </small>
                </td>
                <td className="number">
                  {formatCurrency(result.cost10yr.new)}円
                  <br />
                  <small style={{ color: 'var(--color-text-secondary)' }}>
                    （購入費 {formatCurrency(purchasePrice)}円 込み）
                  </small>
                </td>
              </tr>
            </tbody>
          </table>

          {result.breakEvenYears !== null && result.breakEvenYears > 0 && (
            <p style={{ marginTop: 16, fontWeight: 500 }}>
              約{result.breakEvenYears.toFixed(1)}年以上使うなら買い替えた方がお得です。
            </p>
          )}
        </div>
      )}

      {result && result.savingYearly > 0 && (
        <AffiliateSection
          title="省エネ家電に買い替えて節約"
          items={[
            { label: '省エネエアコン', description: '最新インバーターで電気代30〜40%ダウン', searchQuery: '省エネ エアコン 最新モデル' },
            { label: '省エネ冷蔵庫', description: '10年前の冷蔵庫から買い替えると大幅節約', searchQuery: '省エネ 冷蔵庫 500L' },
            { label: 'ドラム式洗濯乾燥機', description: 'ヒートポンプ式なら乾燥の電気代が約1/3に', searchQuery: 'ドラム式洗濯乾燥機 省エネ' },
          ]}
        />
      )}

      <RelatedTools current="/replace" />
      <AdUnit slot="replace-bottom" />
    </>
  );
}
