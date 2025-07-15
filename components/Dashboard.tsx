import React from 'react';
import FilterPanel from './filters/FilterPanel';
import TotalCrimesChart from './charts/TotalCrimesChart';
import YearlyTrendChart from './charts/YearlyTrendChart';
import CrimeDistributionChart from './charts/CrimeDistributionChart';
import CrimeComparisonChart from './charts/CrimeComparisonChart';
import CrimeFrequencyChart from './charts/CrimeFrequencyChart';
import CrimeBreakdownChart from './charts/CrimeBreakdownChart';
import CrimeSeverityChart from './charts/CrimeSeverityChart';
import { useData } from '../context/DataContext';
import TopStatsCards from './cards/TopStatsCards';

const Dashboard: React.FC = () => {
  const { loading, error } = useData();

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center min-h-[70vh]">
        <div className="text-center">
          <div className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-blue-500 border-r-transparent"></div>
          <p className="mt-4 text-lg text-gray-700">Loading crime data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center min-h-[70vh]">
        <div className="text-center text-red-500 bg-red-50 p-6 rounded-lg max-w-2xl">
          <h2 className="text-xl font-semibold mb-2">Error Loading Data</h2>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <div className="relative">
        <img 
          src="https://images.pexels.com/photos/923681/pexels-photo-923681.jpeg"
          alt="Crime Prevention"
          className="w-full h-48 object-cover rounded-lg mb-6 opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-transparent rounded-lg flex items-center px-8">
          <h1 className="text-3xl font-bold text-white">
            India Crime Data Analysis Dashboard
          </h1>
        </div>
      </div>

      <FilterPanel />
      
      <TopStatsCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Total Crimes per State</h2>
          <TotalCrimesChart />
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Year-wise Crime Trend</h2>
          <YearlyTrendChart />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Crime Type Distribution</h2>
          <CrimeDistributionChart />
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Crime Type Comparison</h2>
          <CrimeComparisonChart />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Crime Severity Analysis</h2>
          <CrimeSeverityChart />
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Crime Frequency Distribution</h2>
          <CrimeFrequencyChart />
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mt-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Crime Breakdown by Type</h2>
        <CrimeBreakdownChart />
      </div>
    </div>
  );
};

export default Dashboard;