import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useData } from '../../context/DataContext';
import { useFilter } from '../../context/FilterContext';
import { crimeCategories } from '../../data/mockData';
import { schemeCategory10 } from 'd3-scale-chromatic';

const CrimeBreakdownChart: React.FC = () => {
  const { crimeData } = useData();
  const { selectedState, compareMode, selectedStates } = useFilter();
  
  const chartData = useMemo(() => {
    if (!crimeData) return [];
    
    const years = [2020, 2021, 2022, 2023]; // Last 4 years
    const categories = crimeCategories
      .filter(category => category !== 'All Crimes')
      .slice(0, 5); // Top 5 crime categories
    
    if (compareMode) {
      // In compare mode, show breakdown for selected year across selected states
      return selectedStates.map(state => {
        const result: any = { state };
        
        categories.forEach(category => {
          result[category] = crimeData[state]?.[2023]?.[category] || 0;
        });
        
        return result;
      });
    } else {
      // Show breakdown by year for selected state
      return years.map(year => {
        const result: any = { year };
        
        categories.forEach(category => {
          result[category] = crimeData[selectedState]?.[year]?.[category] || 0;
        });
        
        return result;
      });
    }
  }, [crimeData, selectedState, compareMode, selectedStates]);

  const COLORS = schemeCategory10;

  return (
    <div className="h-96">
      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey={compareMode ? "state" : "year"} 
              tick={{ fontSize: 12 }}
            />
            <YAxis />
            <Tooltip 
              formatter={(value: number) => [
                new Intl.NumberFormat('en-IN').format(value),
                'Cases'
              ]}
            />
            <Legend />
            {crimeCategories
              .filter(category => category !== 'All Crimes')
              .slice(0, 5)
              .map((category, index) => (
                <Bar 
                  key={category}
                  dataKey={category} 
                  stackId="a"
                  fill={COLORS[index % COLORS.length]} 
                />
              ))}
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

export default CrimeBreakdownChart;