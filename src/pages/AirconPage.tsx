import { useState, useCallback, useRef } from 'react';
import { Head } from '../components/Head';
import { AdUnit } from '../components/AdUnit';
import { AffiliateSection } from '../components/AffiliateSection';
import { formatCurrency } from '../utils/calc';
import ratesData from '../data/electricityRates.json';

const TEMP_DIFF_OPTIONS = [
  { label: '小さい（5℃以内）', factor: 1.0 },
  { label: 'やや大きい（5〜10℃）', factor: 1.3 },
  { label: '大きい（10℃以上）', factor: 1.6 },
];

interface AirconResult {
  costKeepOn: number;
  costTurnOff: number;
  cheaper: 'keepOn' | 'turnOff';
  diff: number;
  breakEvenMinutes: number;
}

function calcAircon(
  ratedWatt: number,
  startupWatt: number,
  absenceHours: number,
  tempDiffFactor: number,
  rate: number
): AirconResult {
  // つけっぱなし: 外出中は安定稼働（定格の40〜60%程度）
  const steadyRatio = 0.5 * tempDiffFactor;
  const costKeepOn = (ratedWatt * steadyRatio / 1000) * absenceHours * rate;

  // 切って再起動: 起動後30分間は高負荷、その後安定
  const startupDuration = 0.5; // 30分
  const startupCost = (startupWatt / 1000) * startupDuration * rate * tempDiffFactor;
  const remainingHours = Math.max(0, 1 - startupDuration);
  const steadyCostAfter = (ratedWatt * steadyRatio / 1000) * remainingHours * rate;
  const costTurnOff = startupCost + steadyCostAfter;

  const cheaper = costKeepOn <= costTurnOff ? 'keepOn' : 'turnOff';
  const diff = Math.abs(costKeepOn - costTurnOff);

  // 損益分岐点（分）
  const steadyCostPerMinute = (ratedWatt * steadyRatio / 1000) * rate / 60;
  const startupOverhead = startupCost - (steadyCostPerMinute * startupDuration * 60);
  const breakEvenMinutes = startupOverhead > 0
    ? startupOverhead / steadyCostPerMinute
    : 0;

  return { costKeepOn, costTurnOff, cheaper, diff, breakEvenMinutes };
}

export function AirconPage() {
  const [ratedWatt, setRatedWatt] = useState(500);
  const [startupWatt, setStartupWatt] = useState(1400);
  const [absenceHours, setAbsenceHours] = useState(2);
  const [tempDiffIndex, setTempDiffIndex] = useState(1);
  const [rate, setRate] = useState(ratesData.defaultRate);
  const [result, setResult] = useState<AirconResult | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleCalc = useCallback(() => {
    if (ratedWatt <= 0 || startupWatt <= 0 || absenceHours <= 0 || rate <= 0) return;
    setResult(
      calcAircon(
        ratedWatt,
        startupWatt,
        absenceHours,
        TEMP_DIFF_OPTIONS[tempDiffIndex].factor,
        rate
      )
    );
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  }, [ratedWatt, startupWatt, absenceHours, tempDiffIndex, rate]);

  return (
    <>
      <Head
        title="エアコン つけっぱなし vs こまめに切る"
        description="外出時にエアコンをつけっぱなしにするのと切るのと、どちらが電気代が安いか比較。何分以内の外出ならつけっぱなしがお得かわかります。"
        path="/aircon"
      />
      <h2 className="page-title">エアコン つけっぱなし vs こまめに切る</h2>
      <p className="page-description">
        外出時にエアコンをつけっぱなしにするのと切るのと、どちらが電気代が安いか比較します。
      </p>

      <div className="card">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="rated-watt">定格消費電力（W）</label>
            <input
              id="rated-watt"
              type="number"
              min={100}
              value={ratedWatt}
              onChange={(e) => setRatedWatt(Number(e.target.value))}
            />
            <p className="form-group__hint">
              安定運転時の消費電力。一般的な6畳用で約500W。
            </p>
          </div>
          <div className="form-group">
            <label htmlFor="startup-watt">起動時の消費電力（W）</label>
            <input
              id="startup-watt"
              type="number"
              min={100}
              value={startupWatt}
              onChange={(e) => setStartupWatt(Number(e.target.value))}
            />
            <p className="form-group__hint">
              起動直後のピーク電力。定格の2〜3倍が目安。
            </p>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="absence-hours">外出時間（時間）</label>
            <input
              id="absence-hours"
              type="number"
              min={0.5}
              max={24}
              step={0.5}
              value={absenceHours}
              onChange={(e) => setAbsenceHours(Number(e.target.value))}
            />
          </div>
          <div className="form-group">
            <label htmlFor="temp-diff">外気温と設定温度の差</label>
            <select
              id="temp-diff"
              value={tempDiffIndex}
              onChange={(e) => setTempDiffIndex(Number(e.target.value))}
            >
              {TEMP_DIFF_OPTIONS.map((opt, i) => (
                <option key={i} value={i}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="aircon-rate">料金単価（円/kWh）</label>
            <input
              id="aircon-rate"
              type="number"
              min={1}
              step={0.1}
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
            />
          </div>
        </div>

        <button className="btn btn--primary" onClick={handleCalc}>
          比較する
        </button>
      </div>

      {result && (
        <div className="card" ref={resultRef}>
          <h3 className="card__title">比較結果</h3>

          <div className="result-grid">
            <div
              className={`result-item ${result.cheaper === 'keepOn' ? 'result-item--highlight' : ''}`}
            >
              <div className="result-item__label">つけっぱなし</div>
              <div className="result-item__value">{formatCurrency(result.costKeepOn)}円</div>
              {result.cheaper === 'keepOn' && (
                <div className="result-item__sub">こちらがお得</div>
              )}
            </div>
            <div
              className={`result-item ${result.cheaper === 'turnOff' ? 'result-item--highlight' : ''}`}
            >
              <div className="result-item__label">切って再起動</div>
              <div className="result-item__value">{formatCurrency(result.costTurnOff)}円</div>
              {result.cheaper === 'turnOff' && (
                <div className="result-item__sub">こちらがお得</div>
              )}
            </div>
          </div>

          <div style={{ marginTop: 16, padding: 16, background: 'var(--color-bg)', borderRadius: 'var(--radius)' }}>
            <p style={{ fontWeight: 600 }}>
              {result.cheaper === 'keepOn'
                ? `つけっぱなしの方が約${formatCurrency(result.diff)}円安い`
                : `切った方が約${formatCurrency(result.diff)}円安い`}
            </p>
            <p style={{ marginTop: 8, fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
              目安: 約{Math.round(result.breakEvenMinutes)}分以内の外出ならつけっぱなしの方がお得です。
            </p>
          </div>

          <div className="notice-box">
            <div className="notice-box__label">ご注意</div>
            この計算は簡易モデルです。実際のインバーター制御では、部屋の断熱性能、
            外気温、設定温度などにより消費電力は大きく変動します。あくまで目安としてお使いください。
          </div>
        </div>
      )}

      {result && (
        <AffiliateSection
          title="省エネエアコンで電気代をもっと節約"
          items={[
            { label: '省エネエアコン（6畳）', description: '最新モデルは10年前と比べて電気代が大幅ダウン', searchQuery: '省エネ エアコン 6畳 最新' },
            { label: '省エネエアコン（10畳〜）', description: 'リビング用も省エネ性能が年々向上', searchQuery: '省エネ エアコン 14畳 最新' },
            { label: 'サーキュレーター', description: 'エアコンと併用で効率アップ。電気代の節約に', searchQuery: 'サーキュレーター 静音' },
          ]}
        />
      )}

      <AdUnit slot="aircon-bottom" />
    </>
  );
}
