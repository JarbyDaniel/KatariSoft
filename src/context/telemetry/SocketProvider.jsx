import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext();

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

/**
 * SocketProvider - Gestiona la conexión WebSocket con el backend
 * Proporciona acceso a los diferentes namespaces de Socket.IO
 */
export const SocketProvider = ({ children }) => {
    const [isConnected, setIsConnected] = useState(false);
    const [connectionError, setConnectionError] = useState(null);
    
    // Referencias a los sockets de cada namespace
    const rocketSocketRef = useRef(null);
    const satelliteSocketRef = useRef(null);
    const systemSocketRef = useRef(null);

    useEffect(() => {
        console.log('Iniciando conexión con backend:', BACKEND_URL);

        // Conectar a namespace del cohete
        rocketSocketRef.current = io(`${BACKEND_URL}/telemetry/rocket`, {
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
            reconnectionAttempts: Infinity
        });

        // Conectar a namespace del sistema
        systemSocketRef.current = io(`${BACKEND_URL}/system`, {
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
            reconnectionAttempts: Infinity
        });

        // Conectar a namespace del satélite (futuro)
        satelliteSocketRef.current = io(`${BACKEND_URL}/telemetry/satellite`, {
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
            reconnectionAttempts: Infinity
        });

        // Handlers de conexión del cohete
        rocketSocketRef.current.on('connect', () => {
            console.log('Conectado a /telemetry/rocket');
            setIsConnected(true);
            setConnectionError(null);
        });

        rocketSocketRef.current.on('disconnect', (reason) => {
            console.log('Desconectado de /telemetry/rocket:', reason);
            setIsConnected(false);
        });

        rocketSocketRef.current.on('connect_error', (error) => {
            console.error('Error de conexión:', error.message);
            setConnectionError(error.message);
        });

        // Handlers de reconexión
        rocketSocketRef.current.on('reconnect', (attemptNumber) => {
            console.log(`Reconectado después de ${attemptNumber} intentos`);
            setIsConnected(true);
            setConnectionError(null);
        });

        rocketSocketRef.current.on('reconnect_attempt', (attemptNumber) => {
            console.log(`Intento de reconexión #${attemptNumber}`);
        });

        rocketSocketRef.current.on('reconnect_error', (error) => {
            console.error('Error de reconexión:', error.message);
        });

        // Cleanup al desmontar
        return () => {
            console.log('Cerrando conexiones Socket.IO');
            if (rocketSocketRef.current) {
                rocketSocketRef.current.disconnect();
            }
            if (satelliteSocketRef.current) {
                satelliteSocketRef.current.disconnect();
            }
            if (systemSocketRef.current) {
                systemSocketRef.current.disconnect();
            }
        };
    }, []);

    const value = {
        isConnected,
        connectionError,
        rocketSocket: rocketSocketRef.current,
        satelliteSocket: satelliteSocketRef.current,
        systemSocket: systemSocketRef.current
    };

    return (
        <SocketContext.Provider value={value}>
            {children}
        </SocketContext.Provider>
    );
};

/**
 * Hook para acceder a los sockets
 */
export const useSocket = () => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error('useSocket debe usarse dentro de SocketProvider');
    }
    return context;
};

/**
 * Hook para suscribirse a eventos de un socket específico
 */
export const useSocketEvent = (socket, event, handler) => {
    useEffect(() => {
        if (!socket) return;

        socket.on(event, handler);

        return () => {
            socket.off(event, handler);
        };
    }, [socket, event, handler]);
};
