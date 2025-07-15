import React from 'react';
import { useData } from '../../context/DataContext';
import { useFilter } from '../../context/FilterContext';
import { TrendingUp, TrendingDown, AlertTriangle, ArrowUpRight, BarChart2 } from 'lucide-react';

const TopStatsCards: React.FC = () => {
  const { yearlyTrends } = useData();
  const { selectedYear } = useFilter();
  
  const currentYearData = yearlyTrends?.[selectedYear] || {};
  const previousYearData = selectedYear > 2010 ? yearlyTrends?.[selectedYear - 1] : null;
  
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-IN').format(num);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-500 mb-1">Total Reported Crimes</p>
            <h3 className="text-2xl font-bold text-gray-800">
              {formatNumber(currentYearData.totalCrimes || 0)}
            </h3>
          </div>
          <div className="bg-blue-100 p-2 rounded-lg">
            <BarChart2 className="w-6 h-6 text-blue-600" />
          </div>
        </div>
        <div className="mt-4 flex items-center">
          {Number(currentYearData.percentageChange) > 0 ? (
            <>
              <TrendingUp className="w-4 h-4 text-red-500 mr-1" />
              <span className="text-red-500 text-sm font-medium">+{currentYearData.percentageChange}%</span>
            </>
          ) : (
            <>
              <TrendingDown className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-500 text-sm font-medium">{currentYearData.percentageChange}%</span>
            </>
          )}
          <span className="text-gray-500 text-sm ml-1">vs previous year</span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-500 mb-1">Most Common Crime</p>
            <h3 className="text-xl font-bold text-gray-800 truncate">
              {currentYearData.topCrimeType || 'N/A'}
            </h3>
          </div>
          <div className="bg-red-100 p-2 rounded-lg">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
        </div>
        <div className="mt-4">
          <span className="text-gray-500 text-sm">
            Highest reported crime category
          </span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-amber-500">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-500 mb-1">Top Crime Hotspot</p>
            <h3 className="text-xl font-bold text-gray-800 truncate">
              {currentYearData.topStates?.[0]?.state || 'N/A'}
            </h3>
          </div>
          <div className="bg-amber-100 p-2 rounded-lg">
            <ArrowUpRight className="w-6 h-6 text-amber-600" />
          </div>
        </div>
        <div className="mt-4">
          <span className="text-gray-700 text-sm font-medium">
            {formatNumber(currentYearData.topStates?.[0]?.total || 0)} total crimes
          </span>
          <span className="text-gray-500 text-sm ml-1">
            ({currentYearData.topStates?.[0]?.perCapita || 0} per 100k)
          </span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-sm text-gray-500 mb-2">Top 5 States by Crime Rate</p>
        <ol className="space-y-2">
          {currentYearData.topStates?.map((statData: any, index: number) => (
            <li key={statData.state} className="flex justify-between items-center">
              <div className="flex items-center">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 text-xs flex items-center justify-center mr-2">
                  {index + 1}
                </span>
                <span className="text-gray-800 font-medium">{statData.state}</span>
              </div>
              <span className="text-gray-600 text-sm">
                {statData.perCapita} per 100k
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default TopStatsCards;