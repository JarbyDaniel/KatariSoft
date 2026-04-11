import React from 'react';
import { motion } from "framer-motion";
import { Rocket, Activity, Gauge, Navigation, Signal, AlertTriangle } from "lucide-react";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import { useRocketData } from "../context/telemetry/TelemetryProvider";
import { 
    useFlightMetrics, 
    useSignalQuality, 
    useEnvironmental,
    useAccelerometer,
    useGPS,
    useAlerts 
} from "../hooks/useTelemetry";

// Función auxiliar para manejar toFixed de manera segura
const safeToFixed = (value, decimals = 2) => {
    if (typeof value === 'number' && !isNaN(value)) {
        return value.toFixed(decimals);
    }
    return '0.00';
};

const RealTimePageNew = () => {
    // Hooks de telemetría
    const { isConnected, lastUpdate, connectionStatus } = useRocketData();
    const { altitude, maxAltitude, velocity, state, flightTime } = useFlightMetrics();
    const { rssi, snr, quality, packetLoss, isGoodSignal } = useSignalQuality();
    const { current: environmental } = useEnvironmental();
    const { current: accel } = useAccelerometer();
    const { hasFix, latitude, longitude, satellites } = useGPS();
    const { active: activeAlerts, hasAlerts } = useAlerts();

    return (
        <div className='flex-1 overflow-auto relative z-10'>
            <Header title='Telemetría en Tiempo Real' />

            <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
                {/* Estado de Conexión */}
                <motion.div
                    className='mb-6 p-4 rounded-lg'
                    style={{ 
                        backgroundColor: isConnected ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                        border: `1px solid ${isConnected ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`
                    }}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-3'>
                            <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                            <span className='text-lg font-semibold'>
                                {isConnected ? 'Conectado al Cohete' : 'Desconectado'}
                            </span>
                        </div>
                        <div className='text-sm text-gray-400'>
                            Estado: <span className='font-bold text-white'>{state}</span>
                            {lastUpdate && (
                                <span className='ml-4'>
                                    Última actualización: {lastUpdate.toLocaleTimeString()}
                                </span>
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* Alertas */}
                {hasAlerts && (
                    <motion.div
                        className='mb-6 p-4 rounded-lg bg-yellow-900/20 border border-yellow-500/30'
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className='flex items-center gap-2 mb-2'>
                            <AlertTriangle className='text-yellow-500' size={20} />
                            <span className='font-semibold text-yellow-500'>Alertas Activas ({activeAlerts.length})</span>
                        </div>
                        <div className='space-y-2'>
                            {activeAlerts.slice(0, 3).map((alert, i) => (
                                <div key={i} className='text-sm text-gray-300'>
                                    • {alert.type}: {alert.message}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Métricas de Vuelo */}
                <motion.div
                    className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <StatCard
                        name='Altitud Actual'
                        icon={Rocket}
                        value={safeToFixed(altitude, 1)}
                        unit='m'
                        color='#6366F1'
                    />
                    <StatCard
                        name='Altitud Máxima'
                        icon={Activity}
                        value={safeToFixed(maxAltitude, 1)}
                        unit='m'
                        color='#8B5CF6'
                    />
                    <StatCard
                        name='Velocidad Vertical'
                        icon={Gauge}
                        value={safeToFixed(velocity, 2)}
                        unit='m/s'
                        color='#EC4899'
                    />
                    <StatCard
                        name='Tiempo de Vuelo'
                        icon={Navigation}
                        value={safeToFixed(flightTime, 1)}
                        unit='s'
                        color='#10B981'
                    />
                </motion.div>

                {/* Calidad de Señal */}
                <motion.div
                    className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                >
                    <StatCard
                        name='RSSI'
                        icon={Signal}
                        value={rssi !== null ? rssi : '--'}
                        unit='dBm'
                        color={isGoodSignal ? '#10B981' : '#EF4444'}
                    />
                    <StatCard
                        name='SNR'
                        icon={Signal}
                        value={snr !== null ? snr : '--'}
                        unit=''
                        color={isGoodSignal ? '#10B981' : '#EF4444'}
                    />
                    <StatCard
                        name='Calidad de Señal'
                        icon={Signal}
                        value={safeToFixed(quality, 0)}
                        unit='%'
                        color={quality > 50 ? '#10B981' : '#EF4444'}
                    />
                    <StatCard
                        name='Pérdida de Paquetes'
                        icon={AlertTriangle}
                        value={safeToFixed(packetLoss, 2)}
                        unit='%'
                        color={packetLoss < 10 ? '#10B981' : '#EF4444'}
                    />
                </motion.div>

                {/* Datos Ambientales */}
                <motion.div
                    className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4 }}
                >
                    <h2 className='text-xl font-semibold text-gray-100 mb-4'>Datos Ambientales (BMP280)</h2>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                        <div className='bg-gray-700/50 p-4 rounded-lg'>
                            <p className='text-gray-400 text-sm'>Temperatura</p>
                            <p className='text-2xl font-bold text-white'>{safeToFixed(environmental.temperature, 2)}°C</p>
                        </div>
                        <div className='bg-gray-700/50 p-4 rounded-lg'>
                            <p className='text-gray-400 text-sm'>Presión</p>
                            <p className='text-2xl font-bold text-white'>{safeToFixed(environmental.pressure, 2)} hPa</p>
                        </div>
                        <div className='bg-gray-700/50 p-4 rounded-lg'>
                            <p className='text-gray-400 text-sm'>Altitud</p>
                            <p className='text-2xl font-bold text-white'>{safeToFixed(environmental.altitude, 1)} m</p>
                        </div>
                    </div>
                </motion.div>

                {/* Acelerómetro */}
                <motion.div
                    className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.6 }}
                >
                    <h2 className='text-xl font-semibold text-gray-100 mb-4'>Acelerómetro (MPU9250)</h2>
                    <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
                        <div className='bg-gray-700/50 p-4 rounded-lg'>
                            <p className='text-gray-400 text-sm'>Aceleración X</p>
                            <p className='text-2xl font-bold text-white'>{safeToFixed(accel.x, 3)} g</p>
                        </div>
                        <div className='bg-gray-700/50 p-4 rounded-lg'>
                            <p className='text-gray-400 text-sm'>Aceleración Y</p>
                            <p className='text-2xl font-bold text-white'>{safeToFixed(accel.y, 3)} g</p>
                        </div>
                        <div className='bg-gray-700/50 p-4 rounded-lg'>
                            <p className='text-gray-400 text-sm'>Aceleración Z</p>
                            <p className='text-2xl font-bold text-white'>{safeToFixed(accel.z, 3)} g</p>
                        </div>
                        <div className='bg-gray-700/50 p-4 rounded-lg'>
                            <p className='text-gray-400 text-sm'>Magnitud</p>
                            <p className='text-2xl font-bold text-white'>{safeToFixed(accel.magnitude, 3)} g</p>
                        </div>
                    </div>
                </motion.div>

                {/* GPS */}
                <motion.div
                    className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.8 }}
                >
                    <h2 className='text-xl font-semibold text-gray-100 mb-4'>GPS (NEO-6M)</h2>
                    <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
                        <div className='bg-gray-700/50 p-4 rounded-lg'>
                            <p className='text-gray-400 text-sm'>Estado</p>
                            <p className={`text-2xl font-bold ${hasFix ? 'text-green-500' : 'text-red-500'}`}>
                                {hasFix ? 'FIX' : 'NO FIX'}
                            </p>
                        </div>
                        <div className='bg-gray-700/50 p-4 rounded-lg'>
                            <p className='text-gray-400 text-sm'>Latitud</p>
                            <p className='text-xl font-bold text-white'>{safeToFixed(latitude, 6)}°</p>
                        </div>
                        <div className='bg-gray-700/50 p-4 rounded-lg'>
                            <p className='text-gray-400 text-sm'>Longitud</p>
                            <p className='text-xl font-bold text-white'>{safeToFixed(longitude, 6)}°</p>
                        </div>
                        <div className='bg-gray-700/50 p-4 rounded-lg'>
                            <p className='text-gray-400 text-sm'>Satélites</p>
                            <p className='text-2xl font-bold text-white'>{satellites}</p>
                        </div>
                    </div>
                </motion.div>
            </main>
        </div>
    );
};

export default RealTimePageNew;
