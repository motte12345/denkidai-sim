export type UsageFrequency =
  | { type: 'daily' }
  | { type: 'weekly'; days: number }
  | { type: 'monthly'; days: number };

export interface CalcInput {
  watt: number;
  hoursPerDay: number;
  frequency: UsageFrequency;
  ratePerKwh: number;
}

export interface CalcResult {
  kwhPerHour: number;
  costPerHour: number;
  costPerDay: number;
  costPerMonth: number;
  costPerYear: number;
  kwhPerMonth: number;
  kwhPerYear: number;
}

function daysPerMonth(frequency: UsageFrequency): number {
  switch (frequency.type) {
    case 'daily':
      return 30;
    case 'weekly':
      return frequency.days * (30 / 7);
    case 'monthly':
      return frequency.days;
  }
}

export function calcElectricityCost(input: CalcInput): CalcResult {
  const kwhPerHour = input.watt / 1000;
  const costPerHour = kwhPerHour * input.ratePerKwh;
  const costPerDay = costPerHour * input.hoursPerDay;
  const monthlyDays = daysPerMonth(input.frequency);
  const costPerMonth = costPerDay * monthlyDays;
  const costPerYear = costPerMonth * 12;
  const kwhPerMonth = kwhPerHour * input.hoursPerDay * monthlyDays;
  const kwhPerYear = kwhPerMonth * 12;

  return {
    kwhPerHour,
    costPerHour,
    costPerDay,
    costPerMonth,
    costPerYear,
    kwhPerMonth,
    kwhPerYear,
  };
}

export interface TieredRate {
  maxKwh?: number;
  rate: number;
}

export function calcTieredCost(monthlyKwh: number, tiers: TieredRate[]): number {
  let remaining = monthlyKwh;
  let cost = 0;
  let prevMax = 0;

  for (const tier of tiers) {
    if (tier.maxKwh !== undefined) {
      const tierKwh = Math.min(remaining, tier.maxKwh - prevMax);
      if (tierKwh > 0) {
        cost += tierKwh * tier.rate;
        remaining -= tierKwh;
      }
      prevMax = tier.maxKwh;
    } else {
      cost += remaining * tier.rate;
      remaining = 0;
    }
    if (remaining <= 0) break;
  }

  if (import.meta.env.DEV && remaining > 0) {
    console.warn('calcTieredCost: tiers do not cover all usage; missing unbounded final tier');
  }

  return cost;
}

export function formatCurrency(value: number): string {
  return Math.round(value).toLocaleString('ja-JP');
}

export function formatKwh(value: number): string {
  return value < 1
    ? `${(value * 1000).toFixed(0)} Wh`
    : `${value.toFixed(2)} kWh`;
}
