import React from 'react';
import { Gauge } from 'lucide-react';
import DataItem from '../common/DataItem';

const BarometerPanel = ({ data }) => {
  if (!data) return null;

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4 hover:border-green-500/50 transition-all duration-300">
      <div className="flex items-center gap-2 mb-4">
        <Gauge className="w-5 h-5 text-green-400" />
        <h3 className="text-lg font-semibold text-green-400">Barómetro (BMP)</h3>
      </div>

      <div className="space-y-3">
        <DataItem 
          label="Temperatura" 
          value={data.temperature?.toFixed(2) || '0.00'} 
          unit="°C" 
        />
        <DataItem 
          label="Presión" 
          value={data.pressure?.toFixed(2) || '0.00'} 
          unit="Pa" 
        />
        
        {data.altitude !== undefined && (
          <div className="pt-2 border-t border-gray-700">
            <DataItem 
              label="Altitud" 
              value={data.altitude.toFixed(2)} 
              unit="m" 
              highlight
              valueClassName="text-green-400"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BarometerPanel;
