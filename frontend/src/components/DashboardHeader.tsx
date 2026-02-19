import { Calendar, Filter, LogOut, User } from 'lucide-react';
import { FilterOptions } from '../types/dashboard';

interface DashboardHeaderProps {
  userEmail: string;
  filters: FilterOptions;
  showFilters: boolean;
  onFiltersChange: (filters: FilterOptions) => void;
  onToggleFilters: () => void;
  onLogout: () => void;
}

export function DashboardHeader({
  userEmail,
  filters,
  showFilters,
  onFiltersChange,
  onToggleFilters,
  onLogout,
}: DashboardHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">
              Sales & Demand Forecasting Dashboard
            </h1>
            <p className="text-gray-600 mt-1">
              Analyze historical trends and predict future demand
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            {/* Date Range Selector */}
            <div className="relative">
              <select
                value={filters.dateRange}
                onChange={(e) =>
                  onFiltersChange({ ...filters, dateRange: e.target.value as FilterOptions['dateRange'] })
                }
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2.5 pr-10 text-sm font-medium text-gray-700 hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
              >
                <option value="last6months">Last 6 Months</option>
                <option value="last1year">Last 1 Year</option>
                <option value="last3years">Last 3 Years</option>
              </select>
              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={onToggleFilters}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>

            {/* User Menu */}
            <div className="flex items-center gap-2 border-l border-gray-300 pl-3">
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
                <User className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-700 max-w-[150px] truncate">
                  {userEmail}
                </span>
              </div>
              <button
                onClick={onLogout}
                className="flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Product
                </label>
                <select
                  value={filters.product}
                  onChange={(e) => onFiltersChange({ ...filters, product: e.target.value })}
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Products</option>
                  <option value="electronics">Electronics</option>
                  <option value="clothing">Clothing</option>
                  <option value="home">Home & Garden</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Region
                </label>
                <select
                  value={filters.region}
                  onChange={(e) => onFiltersChange({ ...filters, region: e.target.value })}
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Regions</option>
                  <option value="north">North India</option>
                  <option value="south">South India</option>
                  <option value="east">East India</option>
                  <option value="west">West India</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Category
                </label>
                <select
                  value={filters.category}
                  onChange={(e) => onFiltersChange({ ...filters, category: e.target.value })}
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Categories</option>
                  <option value="premium">Premium</option>
                  <option value="standard">Standard</option>
                  <option value="budget">Budget</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
