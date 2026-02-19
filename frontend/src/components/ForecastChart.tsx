import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  ComposedChart
} from 'recharts';

interface ForecastChartProps {
  data: any[];
}

export function ForecastChart({ data }: ForecastChartProps) {

  const formatValue = (value: number) => {
    return `$${(value / 1000).toFixed(1)}K`;
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const point = payload[0].payload;

      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-medium text-gray-900 mb-1">{point.month}</p>

          {point.sales !== null && point.sales !== undefined && (
            <p className="text-blue-600 font-semibold">
              Actual: {formatValue(point.sales)}
            </p>
          )}

          {point.forecast !== null && point.forecast !== undefined && (
            <p className="text-emerald-600 font-semibold">
              Forecast: {formatValue(point.forecast)}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Sales Forecast (Next 6 Months)
        </h3>
        <div className="flex gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-0.5 bg-blue-500"></div>
            <span className="text-gray-600">Historical Sales</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-0.5 bg-emerald-500 border-dashed border-t-2 border-emerald-500"></div>
            <span className="text-gray-600">Forecasted Sales</span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

          <XAxis
            dataKey="month"
            stroke="#6b7280"
            tick={{ fontSize: 12 }}
            angle={-45}
            textAnchor="end"
            height={80}
          />

          <YAxis
            stroke="#6b7280"
            tick={{ fontSize: 12 }}
            tickFormatter={formatValue}
          />

          <Tooltip content={<CustomTooltip />} />

          {/* Historical line */}
          <Line
            type="monotone"
            dataKey="sales"
            stroke="#3b82f6"
            strokeWidth={2.5}
            dot={{ r: 4 }}
            connectNulls={false}
          />

          {/* Forecast line */}
          <Line
            type="monotone"
            dataKey="forecast"
            stroke="#10b981"
            strokeWidth={2.5}
            strokeDasharray="5 5"
            dot={{ r: 4 }}
            connectNulls={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
