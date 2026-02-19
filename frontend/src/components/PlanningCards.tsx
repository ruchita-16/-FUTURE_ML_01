import { Package, Users, DollarSign, BarChart3, LucideIcon } from 'lucide-react';

interface PlanningCard {
  icon: string;
  title: string;
  description: string;
}

interface PlanningCardsProps {
  cards: PlanningCard[];
}

const iconMap: Record<string, LucideIcon> = {
  Package,
  Users,
  DollarSign,
  BarChart3,
};

export function PlanningCards({ cards }: PlanningCardsProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Planning & Decision Support</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, index) => {
          const Icon = iconMap[card.icon] || Package;
          return (
            <div 
              key={index} 
              className="p-4 bg-gradient-to-br from-emerald-50 to-blue-50 rounded-lg border border-emerald-100 hover:shadow-md transition-shadow"
            >
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mb-3 shadow-sm">
                <Icon className="w-5 h-5 text-emerald-600" />
              </div>
              <h4 className="font-medium text-gray-900 mb-1.5">{card.title}</h4>
              <p className="text-sm text-gray-600 leading-relaxed">{card.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
