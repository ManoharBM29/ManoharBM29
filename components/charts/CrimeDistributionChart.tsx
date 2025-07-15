import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useData } from '../../context/DataContext';
import { useFilter } from '../../context/FilterContext';
import { crimeCategories } from '../../data/mockData';
import { schemeCategory10 } from 'd3-scale-chromatic';

const CrimeDistributionChart: React.FC = () => {
  const { crimeData } = useData();
  const { selectedState, selectedYear } = useFilter();
  
  const chartData = useMemo(() => {
    if (!crimeData) return [];
    
    const stateData = crimeData[selectedState]?.[selectedYear] || {};
    
    return crimeCategories
      .filter(category => category !== 'All Crimes')
      .map(category => ({
        name: category,
        value: stateData[category] || 0
      }))
      .filter(item => item.value > 0)
      .sort((a, b) => b.value - a.value)
      .slice(0, 10); // Top 10 crime categories
  }, [crimeData, selectedState, selectedYear]);

  // Calculate total for percentages
  const total = useMemo(() => 
    chartData.reduce((sum, item) => sum + item.value, 0),
  [chartData]);

  const COLORS = schemeCategory10;

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={12}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="h-80">
      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: number) => [
                `${new Intl.NumberFormat('en-IN').format(value)} (${((value / total) * 100).toFixed(1)}%)`,
                'Reported Cases'
              ]}
            />
            <Legend layout="vertical" verticalAlign="middle" align="right" />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-full flex items-center justify-center">
          <p className="text-gray-500">No data available for the selected filters</p>
        </div>
      )}
    </div>
  );
};

export default CrimeDistributionChart;