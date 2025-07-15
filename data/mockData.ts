

export const yearRange = Array.from({ length: 14 }, (_, i) => 2010 + i);

export const indianStates = [
  'All India',
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Andaman & Nicobar Islands',
  'Chandigarh',
  'Dadra & Nagar Haveli',
  'Daman & Diu',
  'Delhi',
  'Jammu & Kashmir',
  'Ladakh',
  'Lakshadweep',
  'Puducherry'
];

export const crimeCategories = [
  'All Crimes',
  'Murder',
  'Rape',
  'Kidnapping',
  'Theft',
  'Robbery',
  'Burglary',
  'Arson',
  'Hurt/Grievous Hurt',
  'Riots',
  'Criminal Breach of Trust',
  'Cheating',
  'Counterfeiting',
  'Dowry Deaths',
  'Assault on Women',
  'Insult to Modesty of Women',
  'Cruelty by Husband or Relatives',
  'Importation of Girls',
  'Human Trafficking',
  'Causing Death by Negligence',
  'Cyber Crimes'
];


export const generateMockData = () => {
  const crimeData: any = {};
  const stateMetrics: any = {};
  const yearlyTrends: any = {};
  
  const crimeBaseValues: Record<string, number> = {
    'Murder': 200,
    'Rape': 150,
    'Kidnapping': 180,
    'Theft': 500,
    'Robbery': 120,
    'Burglary': 250,
    'Arson': 70,
    'Hurt/Grievous Hurt': 300,
    'Riots': 100,
    'Criminal Breach of Trust': 80,
    'Cheating': 200,
    'Counterfeiting': 50,
    'Dowry Deaths': 90,
    'Assault on Women': 180,
    'Insult to Modesty of Women': 150,
    'Cruelty by Husband or Relatives': 170,
    'Importation of Girls': 20,
    'Human Trafficking': 40,
    'Causing Death by Negligence': 110,
    'Cyber Crimes': 150
  };

  
  const statePopulation: Record<string, number> = {
    'Andhra Pradesh': 49.6,
    'Arunachal Pradesh': 1.4,
    'Assam': 31.2,
    'Bihar': 104.1,
    'Chhattisgarh': 25.5,
    'Goa': 1.5,
    'Gujarat': 60.4,
    'Haryana': 25.4,
    'Himachal Pradesh': 6.9,
    'Jharkhand': 33.0,
    'Karnataka': 61.1,
    'Kerala': 33.4,
    'Madhya Pradesh': 72.6,
    'Maharashtra': 112.4,
    'Manipur': 2.7,
    'Meghalaya': 3.0,
    'Mizoram': 1.1,
    'Nagaland': 2.0,
    'Odisha': 41.9,
    'Punjab': 27.7,
    'Rajasthan': 68.5,
    'Sikkim': 0.6,
    'Tamil Nadu': 72.1,
    'Telangana': 35.2,
    'Tripura': 3.7,
    'Uttar Pradesh': 199.8,
    'Uttarakhand': 10.1,
    'West Bengal': 91.3,
    'Andaman & Nicobar Islands': 0.4,
    'Chandigarh': 1.1,
    'Dadra & Nagar Haveli': 0.3,
    'Daman & Diu': 0.2,
    'Delhi': 16.8,
    'Jammu & Kashmir': 12.5,
    'Ladakh': 0.3,
    'Lakshadweep': 0.1,
    'Puducherry': 1.2
  };

  const stateLiteracy: Record<string, number> = {
    'Andhra Pradesh': 67.4,
    'Arunachal Pradesh': 65.4,
    'Assam': 72.2,
    'Bihar': 61.8,
    'Chhattisgarh': 70.3,
    'Goa': 88.7,
    'Gujarat': 78.0,
    'Haryana': 75.6,
    'Himachal Pradesh': 82.8,
    'Jharkhand': 66.4,
    'Karnataka': 75.4,
    'Kerala': 94.0,
    'Madhya Pradesh': 69.3,
    'Maharashtra': 82.3,
    'Manipur': 76.9,
    'Meghalaya': 74.4,
    'Mizoram': 91.3,
    'Nagaland': 79.6,
    'Odisha': 72.9,
    'Punjab': 75.8,
    'Rajasthan': 66.1,
    'Sikkim': 81.4,
    'Tamil Nadu': 80.1,
    'Telangana': 72.8,
    'Tripura': 87.2,
    'Uttar Pradesh': 67.7,
    'Uttarakhand': 78.8,
    'West Bengal': 76.3,
    'Andaman & Nicobar Islands': 86.3,
    'Chandigarh': 86.0,
    'Dadra & Nagar Haveli': 76.2,
    'Daman & Diu': 87.1,
    'Delhi': 86.2,
    'Jammu & Kashmir': 67.2,
    'Ladakh': 65.0,
    'Lakshadweep': 91.9,
    'Puducherry': 85.8
  };

  
  indianStates.filter(state => state !== 'All India').forEach(state => {
    crimeData[state] = {};
    stateMetrics[state] = {
      population: statePopulation[state] || (Math.random() * 50 + 1).toFixed(1),
      literacyRate: stateLiteracy[state] || (Math.random() * 30 + 60).toFixed(1),
      urbanization: (Math.random() * 50 + 20).toFixed(1)
    };
    
    const stateModifier = Math.random() * 1.5 + 0.5;
    
    yearRange.forEach(year => {
      crimeData[state][year] = {};
      
    
      const yearModifier = (year - 2010) * 0.03 + 1;
      
      Object.keys(crimeBaseValues).forEach(crimeType => {
        const baseValue = crimeBaseValues[crimeType];
        
      
        const randomFactor = Math.random() * 0.5 + 0.75;
        
        const value = Math.floor(baseValue * stateModifier * yearModifier * randomFactor);
        
        crimeData[state][year][crimeType] = value;
      });
    
      crimeData[state][year]['Total'] = Object.values(crimeData[state][year]).reduce((a: number, b: number) => a + b, 0);
    });
  });

  crimeData['All India'] = {};
  yearRange.forEach(year => {
    crimeData['All India'][year] = {};
    
    Object.keys(crimeBaseValues).forEach(crimeType => {
      crimeData['All India'][year][crimeType] = 
        indianStates
          .filter(state => state !== 'All India')
          .reduce((sum, state) => sum + (crimeData[state][year][crimeType] || 0), 0);
    });
    

    crimeData['All India'][year]['Total'] = Object.values(crimeData['All India'][year]).reduce((a: number, b: number) => a + b, 0);
  });


  yearRange.forEach(year => {
    yearlyTrends[year] = {
      totalCrimes: crimeData['All India'][year]['Total'],
      percentageChange: year > yearRange[0] 
        ? ((crimeData['All India'][year]['Total'] - crimeData['All India'][year-1]['Total']) / crimeData['All India'][year-1]['Total'] * 100).toFixed(2)
        : 0,
      topCrimeType: Object.entries(crimeData['All India'][year])
        .filter(([key]) => key !== 'Total')
        .sort(([, a], [, b]) => (b as number) - (a as number))[0][0],
      topStates: indianStates
        .filter(state => state !== 'All India')
        .sort((a, b) => crimeData[b][year]['Total'] - crimeData[a][year]['Total'])
        .slice(0, 5)
        .map(state => ({
          state,
          total: crimeData[state][year]['Total'],
          perCapita: (crimeData[state][year]['Total'] / (statePopulation[state] * 1000000) * 100000).toFixed(2)
        }))
    };
  });

  return {
    crimeData,
    stateMetrics,
    yearlyTrends
  };
};