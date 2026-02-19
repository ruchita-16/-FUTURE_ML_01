import { SalesData } from '../types/dashboard';

interface PlanningCard {
  icon: string;
  title: string;
  description: string;
}

export function generatePlanningCards(
  data: SalesData[]
): PlanningCard[] {
  const futureData = data.filter(d => d.forecast !== undefined);

  if (futureData.length === 0) return [];

  const totalForecast = futureData.reduce(
    (sum, d) => sum + (d.forecast || 0),
    0
  );

  const avgForecast = totalForecast / futureData.length;

  const avgLower =
    futureData.reduce((sum, d) => sum + (d.forecastLower || 0), 0) /
    futureData.length;

  const avgUpper =
    futureData.reduce((sum, d) => sum + (d.forecastUpper || 0), 0) /
    futureData.length;

  const volatility = ((avgUpper - avgLower) / avgForecast) * 100;

  return [
    {
      icon: "Package",
      title: "Inventory Recommendation",
      description: `Maintain at least ${Math.round(
        avgForecast * 1.1
      )} units (10% safety buffer).`
    },
    {
      icon: "DollarSign",
      title: "Revenue Projection",
      description: `Projected revenue for next ${
        futureData.length
      } months: ${totalForecast.toFixed(0)}.`
    },
    {
      icon: "BarChart3",
      title: volatility > 25 ? "Demand Risk Alert" : "Demand Stability",
      description:
        volatility > 25
          ? `High volatility detected (${volatility.toFixed(
              1
            )}%). Plan conservatively.`
          : `Volatility is moderate (${volatility.toFixed(
              1
            )}%). Demand is stable.`
    },
    {
      icon: "Users",
      title: "Marketing Strategy",
      description:
        "Increase campaigns in peak months and reduce spend in low-demand periods."
    }
  ];
}
