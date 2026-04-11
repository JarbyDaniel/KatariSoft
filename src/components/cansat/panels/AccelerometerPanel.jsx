import React from 'react';
import { Activity } from 'lucide-react';
import DataItem from '../common/DataItem';

const AccelerometerPanel = ({ data }) => {
  if (!data) return null;

  const getMagnitudeColor = (magnitude) => {
    if (magnitude > 15) return 'text-red-400';
    if (magnitude > 10) return 'text-yellow-400';
    return 'text-green-400';
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4 hover:border-blue-500/50 transition-all duration-300">
      <div className="flex items-center gap-2 mb-4">
        <Activity className="w-5 h-5 text-blue-400" />
        <h3 className="text-lg font-semibold text-blue-400">Acelerómetro</h3>
      </div>

      <div className="space-y-3">
        <DataItem 
          label="X" 
          value={data.x?.toFixed(3) || '0.000'} 
          unit="g" 
        />
        <DataItem 
          label="Y" 
          value={data.y?.toFixed(3) || '0.000'} 
          unit="g" 
        />
        <DataItem 
          label="Z" 
          value={data.z?.toFixed(3) || '0.000'} 
          unit="g" 
        />
        
        {data.magnitude !== undefined && (
          <div className="pt-2 border-t border-gray-700">
            <DataItem 
              label="Magnitud" 
              value={data.magnitude.toFixed(3)} 
              unit="g" 
              highlight
              valueClassName={getMagnitudeColor(data.magnitude)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AccelerometerPanel;
