export interface Appliance {
  name: string;
  watt: number;
  category: string;
  alwaysOn?: boolean;
}

export interface TierData {
  maxKwh?: number;
  rate: number;
}

export interface CompanyData {
  name: string;
  plan: string;
  tiers: TierData[];
  basicCharge?: Record<string, number>;
  minimumCharge?: number;
}

export interface RatesData {
  defaultRate: number;
  companies: CompanyData[];
  lastUpdated: string;
}
