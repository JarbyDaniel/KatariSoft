import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

/**
 * Hook personalizado para gestionar datos del CanSat en tiempo real
 * @param {string} serverUrl - URL del servidor Socket.io
 * @returns {Object} Estado y funciones del CanSat
 */
export const useCansatData = (serverUrl = 'http://localhost:3000') => {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState({ connected: false });
  const [stats, setStats] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [history, setHistory] = useState([]);
  const [isConnecting, setIsConnecting] = useState(true);
  const socketRef = useRef(null);

  useEffect(() => {
    console.log('🛰️ Iniciando conexión con CanSat...');
    
    // Conectar al servidor
    socketRef.current = io(serverUrl, {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 10
    });

    // Evento: Conexión establecida
    socketRef.current.on('connect', () => {
      console.log('✅ Socket.io conectado al servidor CanSat');
      setIsConnecting(false);
    });

    // Evento: Estado inicial
    socketRef.current.on('cansat:initial_state', (state) => {
      console.log('📊 Estado inicial del CanSat recibido:', state);
      setStats(state.stats);
      setHistory(state.recentData || []);
    });

    // Evento: Datos en tiempo real
    socketRef.current.on('cansat:data', (newData) => {
      console.log('📡 Datos CanSat recibidos:', newData);
      setData(newData);
      
      // Agregar al historial (mantener últimos 100)
      setHistory(prev => {
        const updated = [...prev, newData];
        return updated.slice(-100);
      });
    });

    // Evento: Estado de conexión del CanSat
    socketRef.current.on('cansat:status', (newStatus) => {
      console.log('🔌 Estado CanSat:', newStatus);
      setStatus(newStatus);
    });

    // Evento: Estadísticas
    socketRef.current.on('cansat:stats', (newStats) => {
      console.log('📊 Estadísticas CanSat:', newStats);
      setStats(newStats);
    });

    // Evento: Alertas
    socketRef.current.on('cansat:alerts', (alertData) => {
      console.warn('⚠️ Alertas CanSat:', alertData);
      setAlerts(prev => {
        const newAlerts = [...prev, ...alertData.alerts];
        return newAlerts.slice(-10); // Mantener últimas 10 alertas
      });
    });

    // Evento: Pérdida de paquetes
    socketRef.current.on('cansat:packet_loss', (lossData) => {
      console.warn('📦 Pérdida de paquetes:', lossData);
    });

    // Evento: Errores
    socketRef.current.on('cansat:error', (error) => {
      console.error('❌ Error del CanSat:', error);
    });

    // Evento: Errores de validación
    socketRef.current.on('cansat:validation_error', (validationError) => {
      console.error('⚠️ Error de validación:', validationError);
    });

    // Evento: Datos históricos
    socketRef.current.on('cansat:history', (response) => {
      console.log(`📚 Datos históricos recibidos: ${response.count} registros`);
      setHistory(response.data);
    });

    // Evento: Desconexión
    socketRef.current.on('disconnect', () => {
      console.log('❌ Socket.io desconectado del servidor CanSat');
      setIsConnecting(true);
    });

    // Cleanup
    return () => {
      console.log('🔌 Desconectando Socket.io del CanSat...');
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [serverUrl]);

  // Funciones auxiliares
  const requestHistory = (count = 50) => {
    console.log(`📚 Solicitando ${count} datos históricos...`);
    socketRef.current?.emit('cansat:request_history', { count });
  };

  const requestStats = () => {
    console.log('📊 Solicitando estadísticas...');
    socketRef.current?.emit('cansat:request_stats');
  };

  const resetStats = () => {
    console.log('🔄 Reiniciando estadísticas...');
    socketRef.current?.emit('cansat:reset_stats');
  };

  const clearAlerts = () => {
    setAlerts([]);
  };

  return {
    // Estado
    data,
    status,
    stats,
    alerts,
    history,
    isConnecting,
    
    // Funciones
    requestHistory,
    requestStats,
    resetStats,
    clearAlerts
  };
};

export default useCansatData;
