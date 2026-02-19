import { TrendingUp, Target, AlertCircle, LucideIcon } from 'lucide-react';
import { Insight } from '../types/insights';

interface InsightsPanelProps {
  insights: Insight[];
}

const iconMap: Record<string, LucideIcon> = {
  TrendingUp,
  Target,
  AlertCircle,
};

export function InsightsPanel({ insights }: InsightsPanelProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Insights</h3>
      <div className="space-y-4">
        {insights.map((insight, index) => {
          const Icon = iconMap[insight.icon] || AlertCircle;
          return (
            <div key={index} className="flex gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Icon className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 mb-1">{insight.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{insight.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
