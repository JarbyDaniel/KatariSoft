import React from 'react';
import { Compass } from 'lucide-react';
import DataItem from '../common/DataItem';

const GyroscopePanel = ({ data }) => {
  if (!data) return null;

  const getMagnitudeColor = (magnitude) => {
    if (magnitude > 100) return 'text-red-400';
    if (magnitude > 50) return 'text-yellow-400';
    return 'text-green-400';
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4 hover:border-purple-500/50 transition-all duration-300">
      <div className="flex items-center gap-2 mb-4">
        <Compass className="w-5 h-5 text-purple-400" />
        <h3 className="text-lg font-semibold text-purple-400">Giroscopio</h3>
      </div>

      <div className="space-y-3">
        <DataItem 
          label="X" 
          value={data.x?.toFixed(2) || '0.00'} 
          unit="°/s" 
        />
        <DataItem 
          label="Y" 
          value={data.y?.toFixed(2) || '0.00'} 
          unit="°/s" 
        />
        <DataItem 
          label="Z" 
          value={data.z?.toFixed(2) || '0.00'} 
          unit="°/s" 
        />
        
        {data.magnitude !== undefined && (
          <div className="pt-2 border-t border-gray-700">
            <DataItem 
              label="Magnitud" 
              value={data.magnitude.toFixed(2)} 
              unit="°/s" 
              highlight
              valueClassName={getMagnitudeColor(data.magnitude)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default GyroscopePanel;
