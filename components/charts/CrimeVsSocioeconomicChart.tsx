import React, { useMemo } from 'react';
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, RadarChart, Radar, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useData } from '../../context/DataContext';
import { useFilter } from '../../context/FilterContext';
import { indianStates } from '../../data/mockData';
import { schemeCategory10 } from 'd3-scale-chromatic';

const CrimeVsSocioeconomicChart: React.FC = () => {
  const { crimeData, stateMetrics } = useData();
  const { selectedYear, selectedCrimeType } = useFilter();
  
  const chartData = useMemo(() => {
    if (!crimeData || !stateMetrics) return [];
    
    return [
      'Literacy Rate',
      'Urbanization',
      'Crime Rate',
      'Population Density',
      'Economic Index',
      'Social Development'
    ].map(metric => {
      const dataPoint: any = { metric };
      
      ['Maharashtra', 'Kerala', 'Tamil Nadu', 'Uttar Pradesh', 'Delhi'].forEach(state => {
        const stateData = crimeData[state]?.[selectedYear] || {};
        const metrics = stateMetrics[state] || {};
        
        let value = 0;
        switch (metric) {
          case 'Literacy Rate':
            value = metrics.literacyRate || 0;
            break;
          case 'Urbanization':
            value = metrics.urbanization || 0;
            break;
          case 'Crime Rate':
            const crimeValue = selectedCrimeType === 'All Crimes' 
              ? stateData['Total'] || 0 
              : stateData[selectedCrimeType] || 0;
            const population = metrics.population * 1000000;
            value = population > 0 ? (crimeValue / population) * 100000 : 0;
            break;
          case 'Population Density':
            value = (metrics.population || 0) / (Math.random() * 100 + 50);
            break;
          case 'Economic Index':
            value = Math.random() * 50 + 50;
            break;
          case 'Social Development':
            value = Math.random() * 40 + 60;
            break;
        }
        
        dataPoint[state] = value;
      });
      
      return dataPoint;
    });
  }, [crimeData, stateMetrics, selectedYear, selectedCrimeType]);

  const COLORS = schemeCategory10;

  return (
    <div className="h-96">
      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="metric" />
            <PolarRadiusAxis angle={30} domain={[0, 'auto']} />
            <Tooltip />
            <Legend />
            {['Maharashtra', 'Kerala', 'Tamil Nadu', 'Uttar Pradesh', 'Delhi'].map((state, index) => (
              <Radar
                key={state}
                name={state}
                dataKey={state}
                stroke={COLORS[index]}
                fill={COLORS[index]}
                fillOpacity={0.3}
              />
            ))}
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

export default CrimeVsSocioeconomicChart;