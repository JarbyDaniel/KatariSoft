import React from 'react';
import { motion } from 'framer-motion';
import { Satellite, Wifi, WifiOff, Package, AlertTriangle } from 'lucide-react';

const CansatHeader = ({ status, stats }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-6"
    >
      {/* Título principal */}
      <div className="flex items-center gap-3 mb-4">
        <Satellite className="w-8 h-8 text-blue-400" />
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          CanSat Telemetry Dashboard
        </h1>
      </div>

      {/* Barra de estado */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4">
        <div className="flex flex-wrap items-center gap-4">
          {/* Estado de conexión */}
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${
            status.connected 
              ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
              : 'bg-red-500/20 text-red-400 border border-red-500/30'
          }`}>
            {status.connected ? (
              <>
                <Wifi className="w-4 h-4" />
                <span className="font-semibold">Conectado</span>
              </>
            ) : (
              <>
                <WifiOff className="w-4 h-4" />
                <span className="font-semibold">Desconectado</span>
              </>
            )}
          </div>

          {/* Puerto serial */}
          {status.port && (
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-700/50 rounded-lg">
              <span className="text-gray-400 text-sm">Puerto:</span>
              <span className="font-mono text-sm text-blue-400">{status.port}</span>
            </div>
          )}

          {/* Estadísticas */}
          {stats && (
            <>
              {/* Total de paquetes */}
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-700/50 rounded-lg">
                <Package className="w-4 h-4 text-blue-400" />
                <span className="text-gray-400 text-sm">Paquetes:</span>
                <span className="font-semibold text-white">{stats.totalPackets || 0}</span>
              </div>

              {/* Paquetes perdidos */}
              {stats.packetsLost > 0 && (
                <div className="flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                  <AlertTriangle className="w-4 h-4 text-yellow-400" />
                  <span className="text-gray-400 text-sm">Perdidos:</span>
                  <span className="font-semibold text-yellow-400">{stats.packetsLost}</span>
                </div>
              )}

              {/* Tasa de pérdida */}
              {stats.lossRate && parseFloat(stats.lossRate) > 0 && (
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-700/50 rounded-lg">
                  <span className="text-gray-400 text-sm">Pérdida:</span>
                  <span className={`font-semibold ${
                    parseFloat(stats.lossRate) > 5 ? 'text-red-400' : 'text-yellow-400'
                  }`}>
                    {stats.lossRate}%
                  </span>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CansatHeader;
