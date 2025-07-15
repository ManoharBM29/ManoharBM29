import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useData } from '../../context/DataContext';
import { useFilter } from '../../context/FilterContext';

const TotalCrimesChart: React.FC = () => {
  const { crimeData } = useData();
  const { selectedYear, selectedCrimeType } = useFilter();
  
  const chartData = useMemo(() => {
    if (!crimeData) return [];
    
    return Object.keys(crimeData)
      .filter(state => state !== 'All India')
      .map(state => {
        const stateData = crimeData[state]?.[selectedYear] || {};
        const value = selectedCrimeType === 'All Crimes' 
          ? stateData['Total'] || 0
          : stateData[selectedCrimeType] || 0;
          
        return {
          state: state.length > 12 ? state.substring(0, 12) + '...' : state,
          fullName: state,
          value
        };
      })
      .sort((a, b) => b.value - a.value)
      .slice(0, 15); // Top 15 states
  }, [crimeData, selectedYear, selectedCrimeType]);

  const formatYAxis = (value: number) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
    return value;
  };

  return (
    <div className="h-80">
      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 10, left: 10, bottom: 80 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="state" 
              angle={-45} 
              textAnchor="end" 
              height={80} 
              tick={{ fontSize: 12 }}
            />
            <YAxis tickFormatter={formatYAxis} />
            <Tooltip
              formatter={(value: number, name: string, props: any) => [
                new Intl.NumberFormat('en-IN').format(value),
                props.payload.fullName
              ]}
              labelFormatter={() => selectedCrimeType}
            />
            <Bar 
              dataKey="value" 
              name="Crimes" 
              fill="#3b82f6" 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-full flex items-center justify-center">
          <p className="text-gray-500">No data available for the selected filters</p>
        </div>
      )}
    </div>
  );
};

export default TotalCrimesChart;