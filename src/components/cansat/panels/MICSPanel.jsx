import React from 'react';
import { Wind } from 'lucide-react';
import DataItem from '../common/DataItem';

const MICSPanel = ({ data }) => {
  if (!data) return null;

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4 hover:border-pink-500/50 transition-all duration-300">
      <div className="flex items-center gap-2 mb-4">
        <Wind className="w-5 h-5 text-pink-400" />
        <h3 className="text-lg font-semibold text-pink-400">Sensores de Gas (MICS)</h3>
      </div>

      <div className="space-y-3">
        <DataItem 
          label="RED" 
          value={data.red || '0'} 
          unit="" 
        />
        <DataItem 
          label="NOx" 
          value={data.nox || '0'} 
          unit="" 
        />
        
        <div className="pt-2 border-t border-gray-700">
          <p className="text-xs text-gray-500 italic">
            Valores analógicos de sensores de gas
          </p>
        </div>
      </div>
    </div>
  );
};

export default MICSPanel;
