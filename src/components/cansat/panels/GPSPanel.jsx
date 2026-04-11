import React from 'react';
import { MapPin, Satellite } from 'lucide-react';
import DataItem from '../common/DataItem';

const GPSPanel = ({ data }) => {
  if (!data) return null;

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4 hover:border-orange-500/50 transition-all duration-300">
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="w-5 h-5 text-orange-400" />
        <h3 className="text-lg font-semibold text-orange-400">GPS</h3>
      </div>

      <div className="space-y-3">
        <DataItem 
          label="Latitud" 
          value={data.latitude?.toFixed(6) || '0.000000'} 
          unit="°" 
        />
        <DataItem 
          label="Longitud" 
          value={data.longitude?.toFixed(6) || '0.000000'} 
          unit="°" 
        />
        <DataItem 
          label="Altitud" 
          value={data.altitude?.toFixed(2) || '0.00'} 
          unit="m" 
        />
        
        <div className="pt-2 border-t border-gray-700 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-sm flex items-center gap-1">
              <Satellite className="w-4 h-4" />
              Satélites:
            </span>
            <span className="font-semibold text-white">{data.satellites || 0}</span>
          </div>
          
          <div className={`flex items-center justify-center px-3 py-2 rounded-lg font-semibold text-sm ${
            data.hasFix 
              ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
              : 'bg-red-500/20 text-red-400 border border-red-500/30'
          }`}>
            {data.hasFix ? '✅ GPS Fix' : '❌ Sin señal'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GPSPanel;
