import React from 'react';
import { useFilter } from '../../context/FilterContext';
import { indianStates, crimeCategories, yearRange } from '../../data/mockData';
import { ChevronDown, BarChart3, Split } from 'lucide-react';

const FilterPanel: React.FC = () => {
  const { 
    selectedYear, 
    selectedState, 
    selectedCrimeType, 
    selectedStates,
    compareMode,
    setSelectedYear, 
    setSelectedState, 
    setSelectedCrimeType,
    setSelectedStates,
    toggleCompareMode,
    resetFilters
  } = useFilter();

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex flex-wrap items-center justify-between mb-2">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center">
          <BarChart3 className="w-5 h-5 mr-2" />
          Data Filters
        </h2>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={toggleCompareMode}
            className={`flex items-center text-sm px-3 py-1.5 rounded transition-colors ${
              compareMode 
                ? 'bg-blue-100 text-blue-700' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Split className="w-4 h-4 mr-1.5" />
            <span>Compare Mode {compareMode ? 'ON' : 'OFF'}</span>
          </button>
          
          <button
            onClick={resetFilters}
            className="text-sm px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded transition-colors"
          >
            Reset Filters
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Year
          </label>
          <div className="relative">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              {yearRange.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-500" />
          </div>
        </div>
        
        {!compareMode ? (
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              State/UT
            </label>
            <div className="relative">
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                {indianStates.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-500" />
            </div>
          </div>
        ) : (
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Compare States (max 5)
            </label>
            <div className="relative">
              <select
                multiple
                value={selectedStates}
                onChange={(e) => {
                  const states = Array.from(e.target.selectedOptions, option => option.value);
                  setSelectedStates(states.slice(0, 5));
                }}
                className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 h-32"
              >
                {indianStates.filter(state => state !== 'All India').map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Selected: {selectedStates.length}/5 states
              </p>
            </div>
          </div>
        )}
        
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Crime Type
          </label>
          <div className="relative">
            <select
              value={selectedCrimeType}
              onChange={(e) => setSelectedCrimeType(e.target.value)}
              className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              {crimeCategories.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;