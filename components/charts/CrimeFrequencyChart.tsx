import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useData } from '../../context/DataContext';
import { useFilter } from '../../context/FilterContext';
import { indianStates } from '../../data/mockData';

const CrimeFrequencyChart: React.FC = () => {
  const { crimeData } = useData();
  const { selectedYear, selectedCrimeType } = useFilter();
  
  const chartData = useMemo(() => {
    if (!crimeData) return [];
    
    // Extract crime values for all states
    const stateValues = indianStates
      .filter(state => state !== 'All India')
      .map(state => {
        const stateData = crimeData[state]?.[selectedYear] || {};
        return selectedCrimeType === 'All Crimes' 
          ? stateData['Total'] || 0
          : stateData[selectedCrimeType] || 0;
      })
      .filter(value => value > 0);
    
    // Define brackets
    const getBrackets = () => {
      const max = Math.max(...stateValues);
      const bracketCount = 8;
      const bracketSize = max / bracketCount;
      
      return Array.from({ length: bracketCount }, (_, i) => {
        const start = Math.round(i * bracketSize);
        const end = Math.round((i + 1) * bracketSize);
        return {
          name: `${new Intl.NumberFormat('en-IN').format(start)} - ${new Intl.NumberFormat('en-IN').format(end)}`,
          range: [start, end],
          count: 0
        };
      });
    };
    
    const brackets = getBrackets();
    
    // Count states in each bracket
    stateValues.forEach(value => {
      const bracket = brackets.find(b => value >= b.range[0] && value <= b.range[1]);
      if (bracket) bracket.count++;
    });
    
    return brackets;
  }, [crimeData, selectedYear, selectedCrimeType]);

  return (
    <div className="h-80">
      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 10, left: 10, bottom: 60 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="name" 
              angle={-45} 
              textAnchor="end" 
              height={80} 
              tick={{ fontSize: 12 }}
              label={{ value: 'Crime Count Range', position: 'insideBottom', offset: -15 }}
            />
            <YAxis 
              label={{ value: 'Number of States', angle: -90, position: 'insideLeft', offset: 0 }}
            />
            <Tooltip 
              formatter={(value: number) => [`${value} states`, 'Count']}
              labelFormatter={(label) => `Range: ${label}`}
            />
            <Bar 
              dataKey="count" 
              name="Number of States" 
              fill="#8884d8" 
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

export default CrimeFrequencyChart;