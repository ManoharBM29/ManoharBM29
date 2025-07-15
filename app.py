from flask import Flask, jsonify, request
import pandas as pd
import numpy as np
from flask_cors import CORS
import os
import json

app = Flask(__name__)
CORS(app)

def generate_mock_data():
    crime_data = {}
    state_metrics = {}
    yearly_trends = {}

    indian_states = [
        'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
        'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
        'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
        'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana',
        'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Andaman & Nicobar Islands',
        'Chandigarh', 'Dadra & Nagar Haveli', 'Daman & Diu', 'Delhi', 'Jammu & Kashmir',
        'Ladakh', 'Lakshadweep', 'Puducherry'
    ]
    
    
    crime_categories = [
        'Murder', 'Rape', 'Kidnapping', 'Theft', 'Robbery', 'Burglary', 'Arson',
        'Hurt/Grievous Hurt', 'Riots', 'Criminal Breach of Trust', 'Cheating',
        'Counterfeiting', 'Dowry Deaths', 'Assault on Women', 'Insult to Modesty of Women',
        'Cruelty by Husband or Relatives', 'Importation of Girls', 'Human Trafficking',
        'Causing Death by Negligence', 'Cyber Crimes'
    ]
    
  
    year_range = list(range(2010, 2024))
    
    crime_base_values = {
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
    }
    
    
    state_population = {
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
    }
    
    
    state_literacy = {
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
    }
    

    for state in indian_states:
        crime_data[state] = {}
        state_metrics[state] = {
            'population': state_population.get(state, round(np.random.uniform(1, 50), 1)),
            'literacyRate': state_literacy.get(state, round(np.random.uniform(60, 90), 1)),
            'urbanization': round(np.random.uniform(20, 70), 1)
        }
        
     
        state_modifier = np.random.uniform(0.5, 2.0)
        
        for year in year_range:
            crime_data[state][year] = {}
            
          
            year_modifier = 1 + (year - 2010) * 0.03
            
            for crime_type, base_value in crime_base_values.items():
                
                random_factor = np.random.uniform(0.75, 1.25)
                
                value = int(base_value * state_modifier * year_modifier * random_factor)
                
                crime_data[state][year][crime_type] = value
            
            crime_data[state][year]['Total'] = sum(crime_data[state][year].values())
    
    
    crime_data['All India'] = {}
    for year in year_range:
        crime_data['All India'][year] = {}
        
        for crime_type in list(crime_base_values.keys()) + ['Total']:
            crime_data['All India'][year][crime_type] = sum(
                crime_data[state][year].get(crime_type, 0) 
                for state in indian_states
            )
    
   
    for year in year_range:
        yearly_trends[year] = {
            'totalCrimes': crime_data['All India'][year]['Total'],
            'percentageChange': round(
                ((crime_data['All India'][year]['Total'] - crime_data['All India'][year-1]['Total']) / 
                 crime_data['All India'][year-1]['Total'] * 100)
                if year > year_range[0] else 0, 
                2
            ),
            'topCrimeType': max(
                [(crime_type, count) for crime_type, count in crime_data['All India'][year].items() if crime_type != 'Total'],
                key=lambda x: x[1]
            )[0],
            'topStates': sorted(
                [
                    {
                        'state': state,
                        'total': crime_data[state][year]['Total'],
                        'perCapita': round(crime_data[state][year]['Total'] / (state_population.get(state, 10) * 1000000) * 100000, 2)
                    }
                    for state in indian_states
                ],
                key=lambda x: x['total'],
                reverse=True
            )[:5]
        }
    
    return {
        'crimeData': crime_data,
        'stateMetrics': state_metrics,
        'yearlyTrends': yearly_trends
    }


mock_data = generate_mock_data()

@app.route('/api/crime-data', methods=['GET'])
def get_crime_data():
    year = request.args.get('year', type=int)
    state = request.args.get('state')
    crime_type = request.args.get('crimeType')
    
    filtered_data = mock_data['crimeData']
    
 
    if year and state and crime_type:
       
        try:
            result = filtered_data[state][year][crime_type]
            return jsonify({'value': result})
        except KeyError:
            return jsonify({'error': 'Data not found for the specified parameters'}), 404
    
    return jsonify(filtered_data)

@app.route('/api/yearly-trends', methods=['GET'])
def get_yearly_trends():
    return jsonify(mock_data['yearlyTrends'])

@app.route('/api/state-metrics', methods=['GET'])
def get_state_metrics():
    return jsonify(mock_data['stateMetrics'])

@app.route('/api/state-comparison', methods=['GET'])
def get_state_comparison():
    states = request.args.get('states', '').split(',')
    crime_type = request.args.get('crimeType', 'Total')
    year = request.args.get('year', 2023, type=int)
    
    if not states or not crime_type:
        return jsonify({'error': 'Missing required parameters'}), 400
    
    comparison_data = []
    for state in states:
        try:
            value = mock_data['crimeData'][state][year][crime_type]
            comparison_data.append({
                'state': state,
                'value': value
            })
        except KeyError:
           
            continue
    
    return jsonify(comparison_data)

@app.route('/api/crime-type-distribution', methods=['GET'])
def get_crime_type_distribution():
    state = request.args.get('state', 'All India')
    year = request.args.get('year', 2023, type=int)
    
    try:
        state_data = mock_data['crimeData'][state][year]
     
        distribution = {k: v for k, v in state_data.items() if k != 'Total'}
        
       
        result = [{'name': k, 'value': v} for k, v in distribution.items()]
        return jsonify(result)
    except KeyError:
        return jsonify({'error': 'Data not found for the specified parameters'}), 404

if __name__ == '__main__':
    app.run(debug=True, port=5000)