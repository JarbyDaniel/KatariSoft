import React from 'react';
import { motion } from 'framer-motion';
import { useCansatContext } from '../context/CansatContext';
import CansatHeader from '../components/cansat/CansatHeader';
import CansatDataGrid from '../components/cansat/CansatDataGrid';
import CansatAlertsPanel from '../components/cansat/CansatAlertsPanel';
import CansatChartsPanel from '../components/cansat/CansatChartsPanel';

const CansatPage = () => {
  const { data, status, stats, alerts, history, isConnecting } = useCansatContext();

  if (isConnecting) {
    return (
      <div className="flex-1 overflow-auto relative z-10 p-8">
        <div className="flex flex-col items-center justify-center min-h-screen">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="text-6xl mb-4">🛰️</div>
            <h2 className="text-2xl font-bold mb-2">Conectando con CanSat...</h2>
            <p className="text-gray-400">Esperando datos del satélite</p>
            <div className="mt-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex-1 overflow-auto relative z-10 p-8">
        <div className="flex flex-col items-center justify-center min-h-screen">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="text-6xl mb-4">🛰️</div>
            <h2 className="text-2xl font-bold mb-2">Esperando datos del CanSat</h2>
            <p className="text-gray-400 mb-4">
              Estado: {status.connected ? '🟢 Conectado' : '🔴 Desconectado'}
            </p>
            {status.connected && (
              <p className="text-sm text-gray-500">
                Puerto: {status.port || 'Detectando...'}
              </p>
            )}
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <div className="max-w-[1800px] mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header con estado y estadísticas */}
        <CansatHeader status={status} stats={stats} />

        {/* Grid de datos de sensores */}
        <CansatDataGrid data={data} />

        {/* Panel de alertas */}
        {alerts.length > 0 && <CansatAlertsPanel alerts={alerts} />}

        {/* Panel de gráficas */}
        {history.length > 0 && <CansatChartsPanel history={history} />}
      </div>
    </div>
  );
};

export default CansatPage;
