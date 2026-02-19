import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { MetricData } from '../types/dashboard';

interface MetricCardProps {
  metric: MetricData;
}

export function MetricCard({ metric }: MetricCardProps) {
  const getTrendIcon = () => {
    if (!metric.trend) return null;
    
    if (metric.trend === 'up') {
      return <TrendingUp className="w-4 h-4 text-green-600" />;
    } else if (metric.trend === 'down') {
      return <TrendingDown className="w-4 h-4 text-red-600" />;
    }
    return <Minus className="w-4 h-4 text-gray-400" />;
  };

  const getTrendColor = () => {
    if (!metric.change) return '';
    if (metric.trend === 'up') return 'text-green-600';
    if (metric.trend === 'down') return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <p className="text-gray-600 text-sm mb-2">{metric.label}</p>
      <div className="flex items-end justify-between">
        <p className="text-3xl font-semibold text-gray-900">{metric.value}</p>
        {metric.change && (
          <div className={`flex items-center gap-1 ${getTrendColor()}`}>
            {getTrendIcon()}
            <span className="text-sm font-medium">{metric.change}</span>
          </div>
        )}
      </div>
    </div>
  );
}
