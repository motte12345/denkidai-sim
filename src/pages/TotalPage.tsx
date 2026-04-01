import { useState, useCallback, useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ApplianceSelect } from '../components/ApplianceSelect';
import { Head } from '../components/Head';
import { Breadcrumb } from '../components/Breadcrumb';
import { AdUnit } from '../components/AdUnit';
import { RelatedTools } from '../components/RelatedTools';
import { calcElectricityCost, formatCurrency, type UsageFrequency } from '../utils/calc';
import type { Appliance } from '../types';
import ratesData from '../data/electricityRates.json';

interface HouseholdItem {
  id: string;
  name: string;
  watt: number;
  hoursPerDay: number;
  frequency: UsageFrequency;
  alwaysOn: boolean;
}

const COLORS = [
  '#2563eb', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6',
  '#ec4899', '#06b6d4', '#84cc16', '#f97316', '#6366f1',
  '#14b8a6', '#e11d48', '#a855f7', '#0891b2', '#65a30d',
];

export function TotalPage() {
  const [items, setItems] = useState<HouseholdItem[]>([]);
  const [rate, setRate] = useState(ratesData.defaultRate);

  const handleAdd = useCallback((appliance: Appliance | null) => {
    if (!appliance) return;
    setItems((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name: appliance.name,
        watt: appliance.watt,
        hoursPerDay: appliance.alwaysOn ? 24 : 4,
        frequency: { type: 'daily' },
        alwaysOn: appliance.alwaysOn ?? false,
      },
    ]);
  }, []);

  const handleRemove = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const handleUpdate = useCallback(
    (id: string, field: keyof HouseholdItem, value: number | string) => {
      setItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, [field]: value } : item
        )
      );
    },
    []
  );

  const results = useMemo(() => {
    return items.map((item) => {
      const calc = calcElectricityCost({
        watt: item.watt,
        hoursPerDay: item.hoursPerDay,
        frequency: item.frequency,
        ratePerKwh: rate,
      });
      return { ...item, costPerMonth: calc.costPerMonth, costPerYear: calc.costPerYear };
    });
  }, [items, rate]);

  const totalMonth = useMemo(
    () => results.reduce((sum, r) => sum + r.costPerMonth, 0),
    [results]
  );

  const totalYear = useMemo(
    () => results.reduce((sum, r) => sum + r.costPerYear, 0),
    [results]
  );

  // sorted は円グラフ表示用のみ。テーブルは登録順（results）で表示する
  const sorted = useMemo(
    () => [...results].sort((a, b) => b.costPerMonth - a.costPerMonth),
    [results]
  );

  const chartData = useMemo(
    () =>
      sorted.map((r) => ({
        name: r.name,
        value: Math.round(r.costPerMonth),
      })),
    [sorted]
  );

  return (
    <>
      <Head
        title="家計の電気代まるごと計算"
        description="家中の家電を登録して電気代の合計と内訳を確認。円グラフで構成比を可視化し、電気代が高い家電がすぐわかります。"
        path="/total"
      />
      <Breadcrumb items={[{ name: '家計まるごと計算' }]} />
      <h2 className="page-title">家計の電気代まるごと計算</h2>
      <p className="page-description">
        家中の家電を登録して、電気代の合計と内訳を確認しましょう。
      </p>

      <div className="card">
        <div className="form-row">
          <div className="form-group" style={{ flex: 2 }}>
            <ApplianceSelect onSelect={handleAdd} />
          </div>
          <div className="form-group" style={{ flex: 1 }}>
            <label htmlFor="total-rate">料金単価（円/kWh）</label>
            <input
              id="total-rate"
              type="number"
              min={1}
              step={0.1}
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
            />
          </div>
        </div>
      </div>

      {items.length > 0 && (
        <>
          <div className="card">
            <h3 className="card__title">登録した家電</h3>

            {/* デスクトップ: テーブル表示 */}
            <div className="desktop-table" style={{ overflowX: 'auto' }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>家電名</th>
                    <th>W数</th>
                    <th>使用時間/日</th>
                    <th>月額</th>
                    <th>年額</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <input
                          type="text"
                          value={item.name}
                          onChange={(e) =>
                            handleUpdate(item.id, 'name', e.target.value)
                          }
                          style={{ width: '100%', minWidth: 120 }}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={item.watt}
                          min={1}
                          onChange={(e) =>
                            handleUpdate(item.id, 'watt', Number(e.target.value))
                          }
                          style={{ width: 80 }}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={item.hoursPerDay}
                          min={0.5}
                          max={24}
                          step={0.5}
                          disabled={item.alwaysOn}
                          onChange={(e) =>
                            handleUpdate(item.id, 'hoursPerDay', Number(e.target.value))
                          }
                          style={{ width: 70 }}
                        />
                      </td>
                      <td className="number">{formatCurrency(item.costPerMonth)}円</td>
                      <td className="number">{formatCurrency(item.costPerYear)}円</td>
                      <td>
                        <button
                          className="btn btn--danger btn--sm"
                          aria-label={`${item.name}を削除`}
                          onClick={() => handleRemove(item.id)}
                        >
                          削除
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th colSpan={3}>合計</th>
                    <th className="number" style={{ fontSize: '1.1rem' }}>
                      {formatCurrency(totalMonth)}円
                    </th>
                    <th className="number" style={{ fontSize: '1.1rem' }}>
                      {formatCurrency(totalYear)}円
                    </th>
                    <th></th>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* モバイル: カード表示 */}
            <div className="mobile-card-list">
              {results.map((item) => (
                <div key={item.id} className="mobile-card-item">
                  <div className="mobile-card-item__header">
                    <input
                      type="text"
                      value={item.name}
                      className="mobile-card-item__name"
                      onChange={(e) => handleUpdate(item.id, 'name', e.target.value)}
                      style={{ flex: 1, border: 'none', background: 'transparent', fontWeight: 600 }}
                    />
                    <button
                      className="btn btn--danger btn--sm"
                      aria-label={`${item.name}を削除`}
                      onClick={() => handleRemove(item.id)}
                    >
                      削除
                    </button>
                  </div>
                  <div className="mobile-card-item__fields">
                    <div className="mobile-card-item__field">
                      <label>W数</label>
                      <input
                        type="number"
                        value={item.watt}
                        min={1}
                        onChange={(e) => handleUpdate(item.id, 'watt', Number(e.target.value))}
                      />
                    </div>
                    <div className="mobile-card-item__field">
                      <label>時間/日</label>
                      <input
                        type="number"
                        value={item.hoursPerDay}
                        min={0.5}
                        max={24}
                        step={0.5}
                        disabled={item.alwaysOn}
                        onChange={(e) => handleUpdate(item.id, 'hoursPerDay', Number(e.target.value))}
                      />
                    </div>
                  </div>
                  <div className="mobile-card-item__costs">
                    <div>月額: <span>{formatCurrency(item.costPerMonth)}円</span></div>
                    <div>年額: <span>{formatCurrency(item.costPerYear)}円</span></div>
                  </div>
                </div>
              ))}
              <div style={{ padding: '12px', fontWeight: 600, textAlign: 'right', borderTop: '2px solid var(--color-text)' }}>
                合計: 月額 {formatCurrency(totalMonth)}円 / 年額 {formatCurrency(totalYear)}円
              </div>
            </div>
          </div>

          {chartData.length > 0 && (
            <div className="card">
              <h3 className="card__title">電気代の内訳（月額）</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label={(props) =>
                      `${props.name ?? ''} ${((props.percent ?? 0) * 100).toFixed(0)}%`
                    }
                    labelLine={false}
                  >
                    {chartData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${formatCurrency(Number(value))}円`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </>
      )}

      {items.length === 0 && (
        <div className="card" style={{ textAlign: 'center', color: 'var(--color-text-secondary)' }}>
          <p>上のプリセットから家電を選んで追加してください。</p>
        </div>
      )}

      <RelatedTools current="/total" />
      <AdUnit slot="total-bottom" />
    </>
  );
}
