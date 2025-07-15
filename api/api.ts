import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';


export const fetchCrimeData = async (params?: { year?: number; state?: string; crimeType?: string }) => {
  try {
    if (process.env.NODE_ENV === 'production') {
      const response = await axios.get(`${API_BASE_URL}/crime-data`, { params });
      return response.data;
    }

    return null;
  } catch (error) {
    console.error('Error fetching crime data:', error);
    return null;
  }
};

export const fetchYearlyTrends = async () => {
  try {
    if (process.env.NODE_ENV === 'production') {
      const response = await axios.get(`${API_BASE_URL}/yearly-trends`);
      return response.data;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching yearly trends:', error);
    return null;
  }
};

export const fetchStateMetrics = async () => {
  try {
    if (process.env.NODE_ENV === 'production') {
      const response = await axios.get(`${API_BASE_URL}/state-metrics`);
      return response.data;
    }
    // In development, we'll use mock data from the context
    return null;
  } catch (error) {
    console.error('Error fetching state metrics:', error);
    return null;
  }
};

export const fetchStateComparison = async (states: string[], crimeType: string, year: number) => {
  try {
    if (process.env.NODE_ENV === 'production') {
      const response = await axios.get(`${API_BASE_URL}/state-comparison`, {
        params: { states: states.join(','), crimeType, year }
      });
      return response.data;
    }
    // In development, we'll use mock data from the context
    return null;
  } catch (error) {
    console.error('Error fetching state comparison:', error);
    return null;
  }
};

export const fetchCrimeTypeDistribution = async (state: string, year: number) => {
  try {
    if (process.env.NODE_ENV === 'production') {
      const response = await axios.get(`${API_BASE_URL}/crime-type-distribution`, {
        params: { state, year }
      });
      return response.data;
    }
    // In development, we'll use mock data from the context
    return null;
  } catch (error) {
    console.error('Error fetching crime type distribution:', error);
    return null;
  }
};