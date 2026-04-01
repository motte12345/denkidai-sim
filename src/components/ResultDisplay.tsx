import type { CalcResult } from '../utils/calc';
import { formatCurrency, formatKwh } from '../utils/calc';

interface Props {
  result: CalcResult;
}

export function ResultDisplay({ result }: Props) {
  return (
    <div className="card">
      <h3 className="card__title">計算結果</h3>
      <div className="result-grid">
        <div className="result-item">
          <div className="result-item__label">1時間あたり</div>
          <div className="result-item__value">{formatCurrency(result.costPerHour)}円</div>
          <div className="result-item__sub">{formatKwh(result.kwhPerHour)}</div>
        </div>
        <div className="result-item">
          <div className="result-item__label">1日あたり</div>
          <div className="result-item__value">{formatCurrency(result.costPerDay)}円</div>
        </div>
        <div className="result-item result-item--highlight">
          <div className="result-item__label">1ヶ月あたり</div>
          <div className="result-item__value">{formatCurrency(result.costPerMonth)}円</div>
          <div className="result-item__sub">{formatKwh(result.kwhPerMonth)}</div>
        </div>
        <div className="result-item">
          <div className="result-item__label">1年あたり</div>
          <div className="result-item__value">{formatCurrency(result.costPerYear)}円</div>
          <div className="result-item__sub">{formatKwh(result.kwhPerYear)}</div>
        </div>
      </div>
    </div>
  );
}
