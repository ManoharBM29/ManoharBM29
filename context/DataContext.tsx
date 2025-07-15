import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { fetchCrimeData, fetchStateMetrics, fetchYearlyTrends } from '../api/api';
import { generateMockData } from '../data/mockData';

interface DataContextType {
  loading: boolean;
  crimeData: any;
  yearlyTrends: any;
  stateMetrics: any;
  error: string | null;
  refreshData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [crimeData, setCrimeData] = useState<any>(null);
  const [yearlyTrends, setYearlyTrends] = useState<any>(null);
  const [stateMetrics, setStateMetrics] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      // For development, use mock data
      // In production, these would be API calls
      const mockData = generateMockData();
      
      // Simulate API calls
      const crimeResponse = await fetchCrimeData();
      const trendsResponse = await fetchYearlyTrends();
      const metricsResponse = await fetchStateMetrics();
      
      setCrimeData(crimeResponse || mockData.crimeData);
      setYearlyTrends(trendsResponse || mockData.yearlyTrends);
      setStateMetrics(metricsResponse || mockData.stateMetrics);
    } catch (err) {
      console.error('Error loading data:', err);
      setError('Failed to load data. Please try again later.');
      
      // Fallback to mock data
      const mockData = generateMockData();
      setCrimeData(mockData.crimeData);
      setYearlyTrends(mockData.yearlyTrends);
      setStateMetrics(mockData.stateMetrics);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const refreshData = () => {
    loadData();
  };

  const value = {
    loading,
    crimeData,
    yearlyTrends,
    stateMetrics,
    error,
    refreshData
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};