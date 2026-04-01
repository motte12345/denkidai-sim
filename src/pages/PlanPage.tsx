import { useState, useMemo } from 'react';
import { Head } from '../components/Head';
import { AdUnit } from '../components/AdUnit';
import { calcTieredCost, formatCurrency } from '../utils/calc';
import ratesData from '../data/electricityRates.json';
import type { RatesData } from '../types';

const data = ratesData as RatesData;

interface CompanyResult {
  name: string;
  plan: string;
  energyCost: number;
  basicCharge: number;
  total: number;
}

export function PlanPage() {
  const [monthlyKwh, setMonthlyKwh] = useState(300);
  const [ampere, setAmpere] = useState('40A');

  const results = useMemo((): CompanyResult[] => {
    return data.companies.map((company) => {
      const energyCost = calcTieredCost(monthlyKwh, company.tiers);
      let basicCharge = 0;
      if (company.basicCharge) {
        basicCharge = company.basicCharge[ampere] ?? 0;
      } else if (company.minimumCharge) {
        basicCharge = company.minimumCharge;
      }
      return {
        name: company.name,
        plan: company.plan,
        energyCost,
        basicCharge,
        total: energyCost + basicCharge,
      };
    });
  }, [monthlyKwh, ampere]);

  const sorted = useMemo(
    () => [...results].sort((a, b) => a.total - b.total),
    [results]
  );

  return (
    <>
      <Head
        title="電力会社・プラン別 単価比較"
        description="主要10電力会社の従量電灯プランを比較。月間使用量を入力するだけで、各社の月額電気代を安い順にランキング表示します。"
        path="/plan"
      />
      <h2 className="page-title">電力会社・プラン別 単価比較</h2>
      <p className="page-description">
        主要10電力会社の従量電灯プランで、月間使用量に応じた電気代を比較します。
      </p>

      <div className="card">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="monthly-kwh">月間使用量（kWh）</label>
            <input
              id="monthly-kwh"
              type="number"
              min={1}
              value={monthlyKwh}
              onChange={(e) => setMonthlyKwh(Number(e.target.value))}
            />
            <p className="form-group__hint">
              一般家庭の平均: 約300kWh/月
            </p>
          </div>
          <div className="form-group">
            <label htmlFor="ampere">契約アンペア</label>
            <select
              id="ampere"
              value={ampere}
              onChange={(e) => setAmpere(e.target.value)}
            >
              <option value="30A">30A</option>
              <option value="40A">40A</option>
              <option value="50A">50A</option>
              <option value="60A">60A</option>
            </select>
            <p className="form-group__hint">
              関西・中国・四国・沖縄は最低料金制（アンペア制なし）
            </p>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="card__title">月額電気代の比較（安い順）</h3>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>順位</th>
                <th>電力会社</th>
                <th>プラン</th>
                <th>基本料金</th>
                <th>電力量料金</th>
                <th>合計（税込）</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((r, i) => (
                <tr key={r.name}>
                  <td>{i + 1}</td>
                  <td>{r.name}</td>
                  <td>{r.plan}</td>
                  <td className="number">{formatCurrency(r.basicCharge)}円</td>
                  <td className="number">{formatCurrency(r.energyCost)}円</td>
                  <td className="number" style={{ fontWeight: 600 }}>
                    {formatCurrency(r.total)}円
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ marginTop: 12, fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
          ※ 燃料費調整額・再エネ賦課金は含まれていません。実際の請求額とは異なります。
          <br />
          ※ 料金データ最終更新: {data.lastUpdated}
        </p>
      </div>

      <div className="card">
        <h3 className="card__title">段階料金の仕組み</h3>
        <p style={{ fontSize: '0.9rem', lineHeight: 1.8, color: 'var(--color-text-secondary)' }}>
          従量電灯プランの電力量料金は、使用量に応じて3段階に分かれています。
          使用量が多いほど単価が高くなる仕組みです。
        </p>
        <table className="data-table" style={{ marginTop: 12 }}>
          <thead>
            <tr>
              <th>段階</th>
              <th>使用量</th>
              <th>単価の傾向</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>第1段階</td>
              <td>〜120kWh</td>
              <td>最も安い</td>
            </tr>
            <tr>
              <td>第2段階</td>
              <td>121〜300kWh</td>
              <td>中間</td>
            </tr>
            <tr>
              <td>第3段階</td>
              <td>301kWh〜</td>
              <td>最も高い</td>
            </tr>
          </tbody>
        </table>
      </div>

      <AdUnit slot="plan-bottom" />
    </>
  );
}
