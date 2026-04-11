import React from 'react';
import { Cloud } from 'lucide-react';
import DataItem from '../common/DataItem';

const EnvironmentalPanel = ({ data }) => {
  if (!data) return null;

  const getCO2Color = (co2) => {
    if (co2 > 2000) return 'text-red-400';
    if (co2 > 1000) return 'text-yellow-400';
    return 'text-green-400';
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4 hover:border-cyan-500/50 transition-all duration-300">
      <div className="flex items-center gap-2 mb-4">
        <Cloud className="w-5 h-5 text-cyan-400" />
        <h3 className="text-lg font-semibold text-cyan-400">Ambiental (SCD40)</h3>
      </div>

      <div className="space-y-3">
        <DataItem 
          label="CO₂" 
          value={data.co2?.toFixed(0) || '0'} 
          unit="ppm" 
          highlight={data.co2 > 1000}
          valueClassName={getCO2Color(data.co2)}
        />
        <DataItem 
          label="Temperatura" 
          value={data.temperature?.toFixed(2) || '0.00'} 
          unit="°C" 
        />
        <DataItem 
          label="Humedad" 
          value={data.humidity?.toFixed(1) || '0.0'} 
          unit="%" 
        />
      </div>
    </div>
  );
};

export default EnvironmentalPanel;
