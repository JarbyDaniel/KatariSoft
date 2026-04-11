import { useMemo } from 'react';
import { useRocketData } from '../context/telemetry/TelemetryProvider';

/**
 * Hook para obtener métricas de vuelo calculadas
 */
export const useFlightMetrics = () => {
    const { rocketData } = useRocketData();
    
    return useMemo(() => ({
        altitude: rocketData.bmp?.altitude || 0,
        maxAltitude: rocketData.metrics?.max_altitude || 0,
        velocity: rocketData.metrics?.velocity || 0,
        acceleration: rocketData.metrics?.acceleration_magnitude || 0,
        flightTime: rocketData.metrics?.flight_time || 0,
        state: rocketData.state || 'GROUND'
    }), [rocketData]);
};

/**
 * Hook para obtener calidad de señal
 */
export const useSignalQuality = () => {
    const { rocketData } = useRocketData();
    
    return useMemo(() => ({
        rssi: rocketData.rssi || null,
        snr: rocketData.snr || null,
        quality: rocketData.metrics?.signal_quality || 0,
        packetLoss: rocketData.metrics?.packet_loss_rate || 0,
        isGoodSignal: (rocketData.metrics?.signal_quality || 0) > 50
    }), [rocketData]);
};

/**
 * Hook para obtener datos del acelerómetro
 */
export const useAccelerometer = () => {
    const { rocketData, getSensorHistory } = useRocketData();
    
    const currentData = useMemo(() => ({
        x: rocketData.mpu?.accel?.x || 0,
        y: rocketData.mpu?.accel?.y || 0,
        z: rocketData.mpu?.accel?.z || 0,
        magnitude: rocketData.metrics?.acceleration_magnitude || 0
    }), [rocketData]);
    
    const history = useMemo(() => 
        getSensorHistory('mpu.accel', 100),
        [getSensorHistory]
    );
    
    return { current: currentData, history };
};

/**
 * Hook para obtener datos del GPS
 */
export const useGPS = () => {
    const { rocketData } = useRocketData();
    
    return useMemo(() => ({
        hasFix: rocketData.gps?.fix || false,
        latitude: rocketData.gps?.latitude || 0,
        longitude: rocketData.gps?.longitude || 0,
        altitude: rocketData.gps?.altitude || 0,
        satellites: rocketData.gps?.satellites || 0,
        isValid: rocketData.gps?.fix && 
                 rocketData.gps?.latitude !== 0 && 
                 rocketData.gps?.longitude !== 0
    }), [rocketData]);
};

/**
 * Hook para obtener datos ambientales
 */
export const useEnvironmental = () => {
    const { rocketData, getSensorHistory } = useRocketData();
    
    const currentData = useMemo(() => ({
        temperature: rocketData.bmp?.temperature || 0,
        pressure: rocketData.bmp?.pressure || 0,
        altitude: rocketData.bmp?.altitude || 0
    }), [rocketData]);
    
    const altitudeHistory = useMemo(() => 
        getSensorHistory('bmp.altitude', 200),
        [getSensorHistory]
    );
    
    return { current: currentData, altitudeHistory };
};

/**
 * Hook para obtener alertas activas
 */
export const useAlerts = () => {
    const { alerts, clearAlerts } = useRocketData();
    
    const activeAlerts = useMemo(() => 
        alerts.filter(alert => {
            // Considerar alertas de los últimos 30 segundos como activas
            const age = Date.now() - alert.timestamp;
            return age < 30000;
        }),
        [alerts]
    );
    
    const criticalAlerts = useMemo(() => 
        activeAlerts.filter(alert => alert.severity === 'critical'),
        [activeAlerts]
    );
    
    return {
        all: alerts,
        active: activeAlerts,
        critical: criticalAlerts,
        hasAlerts: activeAlerts.length > 0,
        hasCritical: criticalAlerts.length > 0,
        clear: clearAlerts
    };
};

/**
 * Hook para obtener eventos de vuelo
 */
export const useFlightEvents = () => {
    const { flightEvents, clearEvents } = useRocketData();
    
    const recentEvents = useMemo(() => 
        flightEvents.slice(-10),
        [flightEvents]
    );
    
    return {
        all: flightEvents,
        recent: recentEvents,
        clear: clearEvents
    };
};

/**
 * Hook para obtener histórico de telemetría
 */
export const useTelemetryHistory = (sensor, maxPoints = 100) => {
    const { getSensorHistory } = useRocketData();
    
    return useMemo(() => 
        getSensorHistory(sensor, maxPoints),
        [getSensorHistory, sensor, maxPoints]
    );
};
