import React from 'react';
import { BarChart3, FileText, RefreshCw } from 'lucide-react';
import { useData } from '../context/DataContext';

const Navbar: React.FC = () => {
  const { refreshData, loading } = useData();

  return (
    <header className="bg-gradient-to-r from-blue-900 to-blue-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <BarChart3 className="h-8 w-8 mr-3" />
          <div>
            <h1 className="text-2xl font-bold">India Crime Data Analysis</h1>
            <p className="text-blue-200 text-sm">Insights from National Crime Records Bureau</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => window.open('https://data.gov.in/catalog/crime-india', '_blank')}
            className="flex items-center text-sm bg-blue-700 hover:bg-blue-600 px-3 py-2 rounded-md transition-colors"
          >
            <FileText className="w-4 h-4 mr-2" />
            <span>Data Source</span>
          </button>
          
          <button 
            onClick={refreshData}
            disabled={loading}
            className={`flex items-center text-sm px-3 py-2 rounded-md transition-colors ${
              loading 
                ? 'bg-blue-700 opacity-70 cursor-not-allowed' 
                : 'bg-blue-700 hover:bg-blue-600'
            }`}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            <span>{loading ? 'Refreshing...' : 'Refresh Data'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;