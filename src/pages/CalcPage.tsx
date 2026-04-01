import { useState, useCallback, useRef } from 'react';
import { ApplianceSelect } from '../components/ApplianceSelect';
import { ResultDisplay } from '../components/ResultDisplay';
import { Head } from '../components/Head';
import { Breadcrumb } from '../components/Breadcrumb';
import { JsonLd } from '../components/JsonLd';
import { AdUnit } from '../components/AdUnit';
import { AffiliateSection } from '../components/AffiliateSection';
import { RelatedTools } from '../components/RelatedTools';
import { calcElectricityCost, type CalcResult, type UsageFrequency } from '../utils/calc';
import type { Appliance } from '../types';
import ratesData from '../data/electricityRates.json';

export function CalcPage() {
  const [watt, setWatt] = useState(500);
  const [hoursPerDay, setHoursPerDay] = useState(8);
  const [frequencyType, setFrequencyType] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [frequencyDays, setFrequencyDays] = useState(5);
  const [rate, setRate] = useState(ratesData.defaultRate);
  const [isAlwaysOn, setIsAlwaysOn] = useState(false);
  const [result, setResult] = useState<CalcResult | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleApplianceSelect = useCallback((appliance: Appliance | null) => {
    if (!appliance) return;
    setWatt(appliance.watt);
    if (appliance.alwaysOn) {
      setHoursPerDay(24);
      setFrequencyType('daily');
      setIsAlwaysOn(true);
    } else {
      setIsAlwaysOn(false);
    }
  }, []);

  const handleCalc = useCallback(() => {
    if (!Number.isFinite(watt) || watt <= 0 || !Number.isFinite(hoursPerDay) || hoursPerDay <= 0 || !Number.isFinite(rate) || rate <= 0) return;

    const frequency: UsageFrequency =
      frequencyType === 'daily'
        ? { type: 'daily' }
        : frequencyType === 'weekly'
          ? { type: 'weekly', days: frequencyDays }
          : { type: 'monthly', days: frequencyDays };

    setResult(
      calcElectricityCost({
        watt,
        hoursPerDay: isAlwaysOn ? 24 : hoursPerDay,
        frequency,
        ratePerKwh: rate,
      })
    );
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  }, [watt, hoursPerDay, frequencyType, frequencyDays, rate, isAlwaysOn]);

  return (
    <>
      <Head
        title="家電別 電気代計算"
        description="家電の消費電力と使用時間から電気代を計算。50種類以上のプリセットから選ぶだけで1時間・1日・1ヶ月・1年の電気代がわかります。"
        path="/calc"
      />
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: '家電の電気代を計算する方法',
        description: '消費電力と使用時間から、家電1台あたりの電気代を計算します。',
        step: [
          { '@type': 'HowToStep', text: '家電をプリセットから選ぶか、消費電力（W数）を入力する' },
          { '@type': 'HowToStep', text: '1日の使用時間と使用頻度を設定する' },
          { '@type': 'HowToStep', text: '「計算する」ボタンを押して電気代を確認する' },
        ],
      }} />
      <Breadcrumb items={[{ name: '家電別 電気代計算' }]} />
      <h2 className="page-title">家電別 電気代計算</h2>
      <p className="page-description">
        家電の消費電力と使用時間から、電気代を計算します。プリセットから選ぶか、W数を直接入力してください。
      </p>

      <div className="card">
        <ApplianceSelect onSelect={handleApplianceSelect} />

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="watt">消費電力（W）</label>
            <input
              id="watt"
              type="number"
              min={1}
              value={watt}
              onChange={(e) => setWatt(Number(e.target.value))}
            />
          </div>

          <div className="form-group">
            <label htmlFor="hours">1日の使用時間</label>
            <input
              id="hours"
              type="number"
              min={0.1}
              max={24}
              step={0.5}
              value={isAlwaysOn ? 24 : hoursPerDay}
              disabled={isAlwaysOn}
              onChange={(e) => setHoursPerDay(Number(e.target.value))}
            />
            {isAlwaysOn && (
              <p className="form-group__hint">
                常時稼働の家電のため、24時間に固定されています。
              </p>
            )}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="frequency">使用頻度</label>
            <select
              id="frequency"
              value={isAlwaysOn ? 'daily' : frequencyType}
              disabled={isAlwaysOn}
              onChange={(e) =>
                setFrequencyType(e.target.value as 'daily' | 'weekly' | 'monthly')
              }
            >
              <option value="daily">毎日</option>
              <option value="weekly">週に○日</option>
              <option value="monthly">月に○日</option>
            </select>
          </div>

          {frequencyType !== 'daily' && (
            <div className="form-group">
              <label htmlFor="freq-days">
                {frequencyType === 'weekly' ? '週に何日？' : '月に何日？'}
              </label>
              <input
                id="freq-days"
                type="number"
                min={1}
                max={frequencyType === 'weekly' ? 7 : 30}
                value={frequencyDays}
                onChange={(e) => setFrequencyDays(Number(e.target.value))}
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="rate">電力料金単価（円/kWh）</label>
            <input
              id="rate"
              type="number"
              min={1}
              step={0.1}
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
            />
            <p className="form-group__hint">
              全国平均の目安: {ratesData.defaultRate}円/kWh
            </p>
          </div>
        </div>

        <button className="btn btn--primary" onClick={handleCalc}>
          計算する
        </button>
      </div>

      {result && (
        <div ref={resultRef}>
          <ResultDisplay result={result} />
          <AffiliateSection
            items={[
              { label: '省エネエアコン', description: '最新モデルは旧型と比べて電気代が30〜40%ダウン', searchQuery: '省エネ エアコン 最新' },
              { label: '省エネ冷蔵庫', description: '10年前の冷蔵庫から買い替えると年間数千円の節約に', searchQuery: '省エネ 冷蔵庫 大型' },
              { label: 'LED照明', description: '蛍光灯からLEDに替えるだけで消費電力が約半分に', searchQuery: 'LED シーリングライト' },
            ]}
          />
        </div>
      )}

      <RelatedTools current="/calc" />
      <AdUnit slot="calc-bottom" />
    </>
  );
}
