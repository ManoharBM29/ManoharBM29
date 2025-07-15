import React from 'react';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import { FilterProvider } from './context/FilterContext';
import { DataProvider } from './context/DataContext';

function App() {
  return (
    <DataProvider>
      <FilterProvider>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navbar />
          <main className="flex-1 px-4 py-6 md:px-6 lg:px-8">
            <Dashboard />
          </main>
          <footer className="bg-gray-800 text-white py-4 px-6 text-center text-sm">
            <p>© 2025 India Crime Data Visualization | Data Source: NCRB (National Crime Records Bureau)</p>
          </footer>
        </div>
      </FilterProvider>
    </DataProvider>
  );
}

export default App;