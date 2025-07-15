import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useData } from '../../context/DataContext';
import { useFilter } from '../../context/FilterContext';
import { yearRange } from '../../data/mockData';

const YearlyTrendChart: React.FC = () => {
  const { crimeData } = useData();
  const { selectedState, selectedCrimeType } = useFilter();
  
  const chartData = useMemo(() => {
    if (!crimeData) return [];
    
    return yearRange.map(year => {
      const stateData = crimeData[selectedState]?.[year] || {};
      
      const value = selectedCrimeType === 'All Crimes' 
        ? stateData['Total'] || 0
        : stateData[selectedCrimeType] || 0;
      
      // Calculate year-over-year percentage change
      let percentChange = 0;
      if (year > yearRange[0]) {
        const prevYearValue = selectedCrimeType === 'All Crimes'
          ? crimeData[selectedState]?.[year - 1]?.['Total'] || 0
          : crimeData[selectedState]?.[year - 1]?.[selectedCrimeType] || 0;
          
        if (prevYearValue > 0) {
          percentChange = ((value - prevYearValue) / prevYearValue) * 100;
        }
      }
      
      return {
        year,
        value,
        percentChange: percentChange.toFixed(1)
      };
    });
  }, [crimeData, selectedState, selectedCrimeType]);

  const formatYAxis = (value: number) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
    return value;
  };

  return (
    <div className="h-80">
      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="year" tick={{ fontSize: 12 }} />
            <YAxis tickFormatter={formatYAxis} />
            <Tooltip 
              formatter={(value: number) => [
                new Intl.NumberFormat('en-IN').format(value),
                selectedCrimeType === 'All Crimes' ? 'Total Crimes' : selectedCrimeType
              ]}
              labelFormatter={(label) => `Year: ${label}`}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="value"
              name={selectedCrimeType === 'All Crimes' ? 'Total Crimes' : selectedCrimeType}
              stroke="#3b82f6"
              activeDot={{ r: 6 }}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-full flex items-center justify-center">
          <p className="text-gray-500">No data available for the selected filters</p>
        </div>
      )}
      
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
        {chartData.slice(-4).map((item) => (
          <div key={item.year} className="bg-gray-50 p-2 rounded text-center">
            <div className="text-sm font-medium text-gray-600">{item.year}</div>
            <div className="text-lg font-semibold text-gray-800">
              {new Intl.NumberFormat('en-IN').format(item.value)}
            </div>
            <div className={`text-xs ${Number(item.percentChange) > 0 ? 'text-red-500' : Number(item.percentChange) < 0 ? 'text-green-500' : 'text-gray-500'}`}>
              {Number(item.percentChange) > 0 ? '+' : ''}{item.percentChange}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YearlyTrendChart;