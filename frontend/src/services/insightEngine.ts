interface Insight {
  title: string;
  description: string;
  type: 'positive' | 'warning' | 'neutral';
}

export function generateBusinessInsights(
  historicalData: any[],
  seasonalityData: any[],
  metrics: any
): Insight[] {

  const insights: Insight[] = [];

  // 📈 Trend Detection
  if (historicalData.length > 1) {
    const first = historicalData[0].sales;
    const last = historicalData[historicalData.length - 1].sales;

    const growth = ((last - first) / first) * 100;

    if (growth > 5) {
      insights.push({
        title: "Strong Growth Trend",
        description: `Sales increased by ${growth.toFixed(1)}% over the observed period.`,
        type: "positive"
      });
    } else if (growth < -5) {
      insights.push({
        title: "Declining Sales Trend",
        description: `Sales declined by ${Math.abs(growth).toFixed(1)}%. Immediate review recommended.`,
        type: "warning"
      });
    } else {
      insights.push({
        title: "Stable Sales Trend",
        description: "Sales remain relatively stable with minor fluctuations.",
        type: "neutral"
      });
    }
  }

  // 🔥 Peak & Low Month Detection
  const peakMonths = seasonalityData
    .filter((m: any) => m.category === "peak")
    .map((m: any) => m.month);

  const lowMonths = seasonalityData
    .filter((m: any) => m.category === "low")
    .map((m: any) => m.month);

  if (peakMonths.length > 0) {
    insights.push({
      title: "Peak Season Identified",
      description: `Highest demand observed in: ${peakMonths.join(", ")}.`,
      type: "positive"
    });
  }

  if (lowMonths.length > 0) {
    insights.push({
      title: "Low Demand Periods",
      description: `Lower sales expected in: ${lowMonths.join(", ")}.`,
      type: "warning"
    });
  }

  // 🎯 Forecast Reliability
  const mape = metrics?.mape ?? 0;

  if (mape < 10) {
    insights.push({
      title: "High Forecast Reliability",
      description: `MAPE at ${mape}% indicates strong prediction accuracy.`,
      type: "positive"
    });
  } else if (mape < 20) {
    insights.push({
      title: "Moderate Forecast Reliability",
      description: `MAPE at ${mape}% indicates acceptable accuracy.`,
      type: "neutral"
    });
  } else {
    insights.push({
      title: "Low Forecast Reliability",
      description: `MAPE at ${mape}% suggests volatile demand patterns.`,
      type: "warning"
    });
  }

  return insights;
}
