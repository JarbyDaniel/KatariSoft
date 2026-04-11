import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useSocket, useSocketEvent } from './SocketProvider';

const RocketDataContext = createContext();

/**
 * Estructura inicial de datos del cohete
 */
const initialRocketData = {
    // Metadatos
    packet_id: null,
    timestamp_ms: null,
    crc: null,
    rssi: null,
    snr: null,
    received_at: null,
    device_id: null,
    
    // Estado de vuelo
    state: 'GROUND',
    
    // Sensores
    mpu: {
        accel: { x: 0, y: 0, z: 0 }
    },
    bmp: {
        temperature: 0,
        pressure: 0,
        altitude: 0
    },
    gps: {
        fix: false,
        latitude: 0,
        longitude: 0,
        altitude: 0,
        satellites: 0
    },
    
    // Métricas calculadas
    metrics: {
        velocity: 0,
        acceleration_magnitude: 0,
        max_altitude: 0,
        flight_time: 0,
        packet_loss_rate: 0,
        signal_quality: 0
    }
};

/**
 * RocketDataProvider - Gestiona los datos del cohete en tiempo real
 */
export const RocketDataProvider = ({ children }) => {
    const { rocketSocket, isConnected } = useSocket();
    
    const [rocketData, setRocketData] = useState(initialRocketData);
    const [isReceivingData, setIsReceivingData] = useState(false);
    const [lastUpdate, setLastUpdate] = useState(null);
    const [connectionStatus, setConnectionStatus] = useState({
        connected: false,
        device: 'rocket'
    });
    const [alerts, setAlerts] = useState([]);
    const [flightEvents, setFlightEvents] = useState([]);
    
    // Histórico de datos (últimos 1000 puntos)
    const [dataHistory, setDataHistory] = useState([]);
    const MAX_HISTORY = 1000;

    // Handler para datos del cohete
    const handleRocketData = useCallback((data) => {
        console.log('📊 Datos del cohete recibidos:', data);
        
        setRocketData(data);
        setIsReceivingData(true);
        setLastUpdate(new Date());
        
        // Agregar al histórico
        setDataHistory(prev => {
            const newHistory = [...prev, { ...data, timestamp: Date.now() }];
            // Mantener solo los últimos MAX_HISTORY puntos
            return newHistory.slice(-MAX_HISTORY);
        });
    }, []);

    // Handler para estado de conexión
    const handleStatus = useCallback((status) => {
        console.log('🔌 Estado de conexión del cohete:', status);
        setConnectionStatus(status);
    }, []);

    // Handler para estado inicial
    const handleInitialState = useCallback((state) => {
        console.log('📡 Estado inicial del cohete:', state);
        if (state.stats) {
            console.log('📊 Estadísticas:', state.stats);
        }
    }, []);

    // Handler para alertas
    const handleAlert = useCallback((alert) => {
        console.warn('⚠️ Alerta del cohete:', alert);
        setAlerts(prev => [...prev, { ...alert, timestamp: Date.now() }].slice(-50));
    }, []);

    // Handler para cambios de estado de vuelo
    const handleStateChange = useCallback((stateChange) => {
        console.log(`🚀 Cambio de estado: ${stateChange.from} → ${stateChange.to}`);
        setFlightEvents(prev => [...prev, { 
            type: 'state_change', 
            ...stateChange,
            timestamp: Date.now()
        }].slice(-100));
    }, []);

    // Handler para apogeo
    const handleApogee = useCallback((apogeeData) => {
        console.log(`🎯 Apogeo alcanzado: ${apogeeData.altitude}m`);
        setFlightEvents(prev => [...prev, { 
            type: 'apogee', 
            ...apogeeData,
            timestamp: Date.now()
        }].slice(-100));
    }, []);

    // Handler para GPS fix
    const handleGpsFix = useCallback((gpsData) => {
        console.log('🛰️ GPS fix adquirido:', gpsData);
        setFlightEvents(prev => [...prev, { 
            type: 'gps_fix', 
            ...gpsData,
            timestamp: Date.now()
        }].slice(-100));
    }, []);

    // Suscribirse a eventos del socket del cohete
    useSocketEvent(rocketSocket, 'data', handleRocketData);
    useSocketEvent(rocketSocket, 'status', handleStatus);
    useSocketEvent(rocketSocket, 'initial_state', handleInitialState);
    useSocketEvent(rocketSocket, 'alert', handleAlert);
    useSocketEvent(rocketSocket, 'state_change', handleStateChange);
    useSocketEvent(rocketSocket, 'apogee', handleApogee);
    useSocketEvent(rocketSocket, 'gps_fix', handleGpsFix);

    // Solicitar estadísticas
    const requestStats = useCallback(() => {
        if (rocketSocket && isConnected) {
            rocketSocket.emit('request_stats');
        }
    }, [rocketSocket, isConnected]);

    // Limpiar alertas
    const clearAlerts = useCallback(() => {
        setAlerts([]);
    }, []);

    // Limpiar eventos
    const clearEvents = useCallback(() => {
        setFlightEvents([]);
    }, []);

    // Resetear datos
    const resetData = useCallback(() => {
        setRocketData(initialRocketData);
        setDataHistory([]);
        setAlerts([]);
        setFlightEvents([]);
        setIsReceivingData(false);
        setLastUpdate(null);
    }, []);

    // Obtener datos históricos de un sensor específico
    const getSensorHistory = useCallback((sensorPath, maxPoints = 100) => {
        return dataHistory
            .slice(-maxPoints)
            .map(data => {
                const keys = sensorPath.split('.');
                let value = data;
                for (const key of keys) {
                    value = value?.[key];
                    if (value === undefined) return null;
                }
                return {
                    timestamp: data.received_at || data.timestamp,
                    value
                };
            })
            .filter(item => item !== null);
    }, [dataHistory]);

    const value = {
        // Datos
        rocketData,
        dataHistory,
        alerts,
        flightEvents,
        
        // Estado
        isReceivingData,
        lastUpdate,
        connectionStatus,
        isConnected: connectionStatus.connected,
        
        // Acciones
        requestStats,
        clearAlerts,
        clearEvents,
        resetData,
        getSensorHistory
    };

    return (
        <RocketDataContext.Provider value={value}>
            {children}
        </RocketDataContext.Provider>
    );
};

/**
 * Hook para acceder a los datos del cohete
 */
export const useRocketData = () => {
    const context = useContext(RocketDataContext);
    if (!context) {
        throw new Error('useRocketData debe usarse dentro de RocketDataProvider');
    }
    return context;
};
