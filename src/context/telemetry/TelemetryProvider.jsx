import React from 'react';
import { SocketProvider } from './SocketProvider';
import { RocketDataProvider } from './RocketDataProvider';

/**
 * TelemetryProvider - Provider principal que combina todos los contextos de telemetría
 */
export const TelemetryProvider = ({ children }) => {
    return (
        <SocketProvider>
            <RocketDataProvider>
                {children}
            </RocketDataProvider>
        </SocketProvider>
    );
};

// Re-exportar hooks para facilitar el uso
export { useSocket, useSocketEvent } from './SocketProvider';
export { useRocketData } from './RocketDataProvider';
