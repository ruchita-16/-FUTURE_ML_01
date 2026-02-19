import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { SeasonalityData } from '../types/dashboard';

interface SeasonalityChartProps {
  data: SeasonalityData[];
}

export function SeasonalityChart({ data }: SeasonalityChartProps) {

  // ✅ USD formatter (clean + standard)
  const formatValue = (value: number) => {
    return `$${(value / 1000).toFixed(1)}K`;
  };

  const getBarColor = (category: string) => {
    switch (category) {
      case 'peak': return '#10b981';
      case 'high': return '#3b82f6';
      case 'normal': return '#8b5cf6';
      case 'low': return '#94a3b8';
      default: return '#6b7280';
    }
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;

      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-medium text-gray-900">{item.month}</p>
          <p className="text-blue-600 font-semibold">
            Avg Sales: {formatValue(item.avgSales)}
          </p>
          <p className="text-sm text-gray-600 capitalize mt-1">
            Period: {item.category}
          </p>
        </div>
      );
    }
    return null;
  };

  // ✅ Prevent crash if empty
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Seasonality Analysis
        </h3>
        <p className="text-gray-500 text-sm">No seasonality data available</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Seasonality Analysis
        </h3>

        <div className="flex gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: '#10b981' }}></div>
            <span className="text-gray-600">Peak</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: '#3b82f6' }}></div>
            <span className="text-gray-600">High</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: '#8b5cf6' }}></div>
            <span className="text-gray-600">Normal</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: '#94a3b8' }}></div>
            <span className="text-gray-600">Low</span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

          <XAxis
            dataKey="month"
            stroke="#6b7280"
            tick={{ fontSize: 12 }}
          />

          <YAxis
            stroke="#6b7280"
            tick={{ fontSize: 12 }}
            tickFormatter={formatValue}
          />

          <Tooltip content={<CustomTooltip />} />

          <Bar dataKey="avgSales" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={getBarColor(entry.category)}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
