import { useState, useEffect } from 'react';
import { LoginPage } from './components/LoginPage';
import { DashboardHeader } from './components/DashboardHeader';
import { MetricCard } from './components/MetricCard';
import { HistoricalChart } from './components/HistoricalChart';
import { SeasonalityChart } from './components/SeasonalityChart';
import { ForecastChart } from './components/ForecastChart';
import { InsightsPanel } from './components/InsightsPanel';
import { PlanningCards } from './components/PlanningCards';
import { MetricData, FilterOptions, KPIData } from './types/dashboard';
import { getKPIs, getForecast } from './services/api';
import { generatePlanningCards } from './services/planningEngine';
import { generateBusinessInsights } from './services/insightEngine';


function App() {
  const [kpis, setKpis] = useState<KPIData | null>(null);
  const [forecastData, setForecastData] = useState<any>(null);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({
    dateRange: 'last1year',
    product: 'all',
    region: 'all',
    category: 'all',
  });

  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const kpiData = await getKPIs();
        const forecast = await getForecast();
        setKpis(kpiData);
        setForecastData(forecast);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };
    fetchData();
  }, []);

  const handleLogin = (email: string) => {
    setUserEmail(email);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserEmail('');
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  if (!forecastData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-gray-600 text-lg">Loading dashboard...</div>
      </div>
    );
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const metrics: MetricData[] =
    kpis && forecastData
      ? [
          {
            label: 'Total Sales',
            value: formatCurrency(kpis.total_sales),
            change: '+8.2%',
            trend: 'up',
          },
          {
            label: 'Total Orders',
            value: kpis.total_orders.toLocaleString(),
            change: '+5.4%',
            trend: 'up',
          },
          {
            label: 'Avg Order Value',
            value: formatCurrency(kpis.avg_order_value),
            change: '+3.1%',
            trend: 'up',
          },
          {
            label: 'Forecast Accuracy',
            value: `${forecastData.metrics?.accuracy_percent ?? 0}%`,
            trend: 'neutral',
          },
          {
            label: 'MAPE',
            value: `${forecastData.metrics?.mape ?? 0}%`,
            trend: 'neutral',
          },
        ]
      : [];

  const historicalData =
    forecastData?.historical?.map((item: any) => ({
      month: new Date(item.YearMonth).toLocaleString('default', {
        month: 'short',
        year: 'numeric',
      }),
      sales: Number(item.Sales),
    })) || [];

  const seasonalityRaw = Object.values(
    historicalData.reduce((acc: any, item: any) => {
      const monthOnly = item.month.split(' ')[0];

      if (!acc[monthOnly]) {
        acc[monthOnly] = {
          month: monthOnly,
          total: 0,
          count: 0,
        };
      }

      acc[monthOnly].total += item.sales;
      acc[monthOnly].count += 1;

      return acc;
    }, {})
  );

  const globalAverage =
    seasonalityRaw.reduce((sum: number, item: any) => {
      return sum + item.total / item.count;
    }, 0) / seasonalityRaw.length;

  const seasonalityData = seasonalityRaw.map((item: any) => {
    const avg = item.total / item.count;

    let category: 'peak' | 'high' | 'normal' | 'low' = 'normal';

    if (avg > globalAverage * 1.2) {
      category = 'peak';
    } else if (avg > globalAverage * 1.05) {
      category = 'high';
    } else if (avg < globalAverage * 0.85) {
      category = 'low';
    }

    return {
      month: item.month,
      avgSales: avg,
      category,
    };
  });

  // ✅ Proper Forecast Data for Planning Engine
  const forecastTransformed =
    forecastData?.forecast?.map((item: any) => ({
      month: item.month,
      forecast: Number(item.predicted_sales),
      forecastLower: Number(item.lower_bound ?? item.predicted_sales),
      forecastUpper: Number(item.upper_bound ?? item.predicted_sales),
    })) || [];

  const combinedData = [
    ...historicalData.map((item: any) => ({
      month: item.month,
      sales: item.sales,
    })),
    ...forecastTransformed.map((item: any) => ({
      month: item.month,
      forecast: item.forecast,
    })),
  ];

  // ✅ THIS IS THE IMPORTANT ADDITION
  const planningCards = generatePlanningCards(forecastTransformed);

  const businessInsights = generateBusinessInsights(
  historicalData,
  seasonalityData,
  forecastData.metrics
  );
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <DashboardHeader
        userEmail={userEmail}
        filters={filters}
        showFilters={showFilters}
        onFiltersChange={setFilters}
        onToggleFilters={() => setShowFilters(!showFilters)}
        onLogout={handleLogout}
      />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {metrics.map((metric, index) => (
            <MetricCard key={index} metric={metric} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {historicalData.length > 0 && (
            <HistoricalChart data={historicalData} />
          )}
          {seasonalityData.length > 0 && (
            <SeasonalityChart data={seasonalityData} />
          )}
        </div>

        <div className="mb-6">
          {combinedData.length > 0 && (
            <ForecastChart data={combinedData} />
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <PlanningCards cards={planningCards} />
          </div>
          <div>
            <InsightsPanel insights={businessInsights} />
          </div>
        </div>
      </div>

      <div className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <p className="text-center text-sm text-gray-600">
            Data updated dynamically • Forecast Accuracy {forecastData.metrics?.accuracy_percent}%
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
