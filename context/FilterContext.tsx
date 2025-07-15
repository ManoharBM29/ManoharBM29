import React, { createContext, useContext, useState, ReactNode } from 'react';
import { crimeCategories, indianStates, yearRange } from '../data/mockData';

interface FilterContextType {
  selectedYear: number;
  selectedState: string;
  selectedCrimeType: string;
  selectedStates: string[];
  compareMode: boolean;
  setSelectedYear: (year: number) => void;
  setSelectedState: (state: string) => void;
  setSelectedCrimeType: (crimeType: string) => void;
  setSelectedStates: (states: string[]) => void;
  toggleCompareMode: () => void;
  resetFilters: () => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const useFilter = (): FilterContextType => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
};

interface FilterProviderProps {
  children: ReactNode;
}

export const FilterProvider: React.FC<FilterProviderProps> = ({ children }) => {
  const [selectedYear, setSelectedYear] = useState<number>(yearRange[yearRange.length - 1]);
  const [selectedState, setSelectedState] = useState<string>('All India');
  const [selectedCrimeType, setSelectedCrimeType] = useState<string>('All Crimes');
  const [selectedStates, setSelectedStates] = useState<string[]>(['Maharashtra', 'Uttar Pradesh', 'Tamil Nadu']);
  const [compareMode, setCompareMode] = useState<boolean>(false);

  const toggleCompareMode = () => {
    setCompareMode(prev => !prev);
  };

  const resetFilters = () => {
    setSelectedYear(yearRange[yearRange.length - 1]);
    setSelectedState('All India');
    setSelectedCrimeType('All Crimes');
    setSelectedStates(['Maharashtra', 'Uttar Pradesh', 'Tamil Nadu']);
    setCompareMode(false);
  };

  const value = {
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
  };

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>;
};