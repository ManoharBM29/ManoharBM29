import React, { useMemo } from 'react';
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, RadarChart, Radar, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useData } from '../../context/DataContext';
import { useFilter } from '../../context/FilterContext';
import { schemeCategory10 } from 'd3-scale-chromatic';

const CrimeSeverityChart: React.FC = () => {
  const { crimeData } = useData();
  const { selectedState, selectedYear } = useFilter();
  
  const chartData = useMemo(() => {
    if (!crimeData) return [];
    
    const severityCategories = [
      { name: 'Violent Crimes', types: ['Murder', 'Rape', 'Kidnapping', 'Assault on Women'] },
      { name: 'Property Crimes', types: ['Theft', 'Robbery', 'Burglary'] },
      { name: 'Cyber Crimes', types: ['Cyber Crimes'] },
      { name: 'Social Crimes', types: ['Dowry Deaths', 'Human Trafficking', 'Cruelty by Husband or Relatives'] },
      { name: 'Public Order', types: ['Riots', 'Arson'] },
      { name: 'Economic Crimes', types: ['Criminal Breach of Trust', 'Cheating', 'Counterfeiting'] }
    ];
    
    return severityCategories.map(category => {
      const total = category.types.reduce((sum, type) => {
        return sum + (crimeData[selectedState]?.[selectedYear]?.[type] || 0);
      }, 0);
      
      return {
        category: category.name,
        value: total,
        severity: Math.round((total / (crimeData[selectedState]?.[selectedYear]?.['Total'] || 1)) * 100)
      };
    });
  }, [crimeData, selectedState, selectedYear]);

  const COLORS = schemeCategory10;

  return (
    <div className="h-96">
      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="category" />
            <PolarRadiusAxis angle={30} domain={[0, 'auto']} />
            <Tooltip 
              formatter={(value: number) => [
                `${new Intl.NumberFormat('en-IN').format(value)} cases (${Math.round((value / chartData.reduce((sum, item) => sum + item.value, 0)) * 100)}%)`,
                'Cases'
              ]}
            />
            <Radar
              name="Crime Severity"
              dataKey="value"
              stroke={COLORS[0]}
              fill={COLORS[0]}
              fillOpacity={0.6}
            />
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

export default CrimeSeverityChart;