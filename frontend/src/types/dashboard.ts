export interface SalesData {
  month: string;
  sales: number;
  forecast?: number;
  forecastLower?: number;
  forecastUpper?: number;
}

export interface KPIData {
  total_sales: number;
  total_orders: number;
  avg_order_value: number;
}

export interface SeasonalityData {
  month: string;
  avgSales: number;
  category: 'peak' | 'high' | 'normal' | 'low';
}

export interface MetricData {
  label: string;
  value: string;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
}

export interface FilterOptions {
  dateRange: 'last6months' | 'last1year' | 'last3years';
  product: string;
  region: string;
  category: string;
}

export interface PlanningCards {
  title: string;
  message: string;
  type: 'positive' | 'warning' | 'neutral';
}

export interface Insight {
  icon: string;
  title: string;
  description: string;
  type: 'positive' | 'warning' | 'neutral';
}
