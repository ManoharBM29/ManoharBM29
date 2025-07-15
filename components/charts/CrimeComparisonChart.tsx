import React, { useMemo } from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer, Tooltip } from 'recharts';
import { useData } from '../../context/DataContext';
import { useFilter } from '../../context/FilterContext';
import { crimeCategories } from '../../data/mockData';
import { schemeCategory10 } from 'd3-scale-chromatic';

const CrimeComparisonChart: React.FC = () => {
  const { crimeData } = useData();
  const { selectedStates, selectedYear, compareMode } = useFilter();
  
  const chartData = useMemo(() => {
    if (!crimeData) return [];

    // Get the top 6 crime categories across selected states
    const categories = crimeCategories
      .filter(category => category !== 'All Crimes')
      .slice(0, 6);
    
    return categories.map(category => {
      const dataPoint: any = { category };
      
      if (compareMode) {
        // In compare mode, add data for each selected state
        selectedStates.forEach(state => {
          const value = crimeData[state]?.[selectedYear]?.[category] || 0;
          // Use short names for states as properties
          dataPoint[state] = value;
        });
      } else {
        // If not in compare mode, use default states for comparison
        const defaultStates = ['Maharashtra', 'Uttar Pradesh', 'Tamil Nadu', 'Kerala', 'Delhi'];
        defaultStates.forEach(state => {
          const value = crimeData[state]?.[selectedYear]?.[category] || 0;
          dataPoint[state] = value;
        });
      }
      
      return dataPoint;
    });
  }, [crimeData, selectedStates, selectedYear, compareMode]);

  const COLORS = schemeCategory10;

  return (
    <div className="h-96">
      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart outerRadius={90} data={chartData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="category" />
            <PolarRadiusAxis angle={30} domain={[0, 'auto']} />
            <Tooltip formatter={(value: number) => new Intl.NumberFormat('en-IN').format(value)} />
            
            {(compareMode ? selectedStates : ['Maharashtra', 'Uttar Pradesh', 'Tamil Nadu', 'Kerala', 'Delhi']).map((state, index) => (
              <Radar
                key={state}
                name={state}
                dataKey={state}
                stroke={COLORS[index % COLORS.length]}
                fill={COLORS[index % COLORS.length]}
                fillOpacity={0.2}
              />
            ))}
            
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-full flex items-center justify-center">
          <p className="text-gray-500">No data available for the selected filters</p>
        </div>
      )}
    </div>
  );
};

export default CrimeComparisonChart;