import React from 'react';

const DataItem = ({ label, value, unit, highlight, valueClassName }) => {
  return (
    <div className={`flex justify-between items-center px-3 py-2 rounded-lg transition-all duration-200 ${
      highlight 
        ? 'bg-blue-500/10 border border-blue-500/30' 
        : 'bg-gray-700/30'
    }`}>
      <span className="text-gray-400 text-sm font-medium">{label}:</span>
      <div className="flex items-baseline gap-1">
        <span className={`font-bold text-lg ${valueClassName || 'text-white'}`}>
          {value}
        </span>
        {unit && (
          <span className="text-gray-500 text-xs">{unit}</span>
        )}
      </div>
    </div>
  );
};

export default DataItem;
