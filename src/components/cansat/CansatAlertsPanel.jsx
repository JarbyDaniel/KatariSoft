import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Info, X } from 'lucide-react';
import { useCansatContext } from '../../context/CansatContext';

const CansatAlertsPanel = ({ alerts }) => {
  const { clearAlerts } = useCansatContext();

  if (!alerts || alerts.length === 0) return null;

  const getAlertIcon = (severity) => {
    switch (severity) {
      case 'warning':
        return <AlertTriangle className="w-5 h-5" />;
      case 'info':
        return <Info className="w-5 h-5" />;
      default:
        return <AlertTriangle className="w-5 h-5" />;
    }
  };

  const getAlertStyles = (severity) => {
    switch (severity) {
      case 'warning':
        return 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400';
      case 'info':
        return 'bg-blue-500/10 border-blue-500/30 text-blue-400';
      default:
        return 'bg-red-500/10 border-red-500/30 text-red-400';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-red-400 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Alertas Activas ({alerts.length})
          </h3>
          <button
            onClick={clearAlerts}
            className="text-gray-400 hover:text-white transition-colors"
            title="Limpiar alertas"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-2">
          <AnimatePresence>
            {alerts.map((alert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className={`flex items-center gap-3 p-3 rounded-lg border ${getAlertStyles(alert.severity)}`}
              >
                {getAlertIcon(alert.severity)}
                <div className="flex-1">
                  <div className="font-semibold text-sm">{alert.type}</div>
                  <div className="text-sm opacity-90">{alert.message}</div>
                </div>
                {alert.value !== undefined && (
                  <div className="font-mono text-sm font-bold">
                    {typeof alert.value === 'number' ? alert.value.toFixed(2) : alert.value}
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default CansatAlertsPanel;
