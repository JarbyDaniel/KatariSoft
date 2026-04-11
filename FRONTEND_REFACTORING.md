# 🎨 Frontend Refactorizado - Sistema Katari

## Resumen de Cambios

El frontend ha sido completamente refactorizado con arquitectura NASA-grade:

### ✅ Nueva Arquitectura de Contextos

```
TelemetryProvider (Principal)
├── SocketProvider (Gestión de conexiones WebSocket)
└── RocketDataProvider (Datos del cohete)
```

### 📦 Archivos Creados

1. **`context/telemetry/SocketProvider.jsx`**
   - Gestiona conexiones WebSocket con Socket.IO
   - Maneja 3 namespaces: `/telemetry/rocket`, `/telemetry/satellite`, `/system`
   - Reconexión automática inteligente
   - Hooks: `useSocket()`, `useSocketEvent()`

2. **`context/telemetry/RocketDataProvider.jsx`**
   - Gestiona datos del cohete en tiempo real
   - Histórico de últimos 1000 puntos
   - Sistema de alertas
   - Eventos de vuelo
   - Hook: `useRocketData()`

3. **`context/telemetry/TelemetryProvider.jsx`**
   - Provider principal que combina todos los contextos
   - Re-exporta todos los hooks

4. **`hooks/useTelemetry.js`**
   - Custom hooks especializados:
     - `useFlightMetrics()` - Métricas de vuelo
     - `useSignalQuality()` - Calidad de señal
     - `useAccelerometer()` - Datos del acelerómetro
     - `useGPS()` - Datos GPS
     - `useEnvironmental()` - Datos ambientales
     - `useAlerts()` - Sistema de alertas
     - `useFlightEvents()` - Eventos de vuelo
     - `useTelemetryHistory()` - Histórico de sensores

### 🎯 Uso de los Hooks

#### Ejemplo 1: Mostrar métricas de vuelo

```jsx
import { useFlightMetrics } from '../hooks/useTelemetry';

function FlightMetricsPanel() {
    const { altitude, maxAltitude, velocity, state } = useFlightMetrics();
    
    return (
        <div>
            <h2>Estado: {state}</h2>
            <p>Altitud: {altitude.toFixed(2)}m</p>
            <p>Altitud Máxima: {maxAltitude.toFixed(2)}m</p>
            <p>Velocidad: {velocity.toFixed(2)}m/s</p>
        </div>
    );
}
```

#### Ejemplo 2: Mostrar calidad de señal

```jsx
import { useSignalQuality } from '../hooks/useTelemetry';

function SignalQualityIndicator() {
    const { rssi, snr, quality, packetLoss, isGoodSignal } = useSignalQuality();
    
    return (
        <div className={isGoodSignal ? 'text-green-500' : 'text-red-500'}>
            <p>RSSI: {rssi} dBm</p>
            <p>SNR: {snr}</p>
            <p>Calidad: {quality}%</p>
            <p>Pérdida de paquetes: {packetLoss.toFixed(2)}%</p>
        </div>
    );
}
```

#### Ejemplo 3: Gráfico de altitud

```jsx
import { useEnvironmental } from '../hooks/useTelemetry';
import { Line } from 'recharts';

function AltitudeChart() {
    const { altitudeHistory } = useEnvironmental();
    
    return (
        <Line
            data={altitudeHistory}
            dataKey="value"
            stroke="#8884d8"
        />
    );
}
```

#### Ejemplo 4: Sistema de alertas

```jsx
import { useAlerts } from '../hooks/useTelemetry';

function AlertsPanel() {
    const { active, critical, hasAlerts, hasCritical, clear } = useAlerts();
    
    if (!hasAlerts) return <p>Sin alertas</p>;
    
    return (
        <div>
            <h2>Alertas Activas: {active.length}</h2>
            {hasCritical && <p className="text-red-500">¡Alertas críticas!</p>}
            
            {active.map((alert, i) => (
                <div key={i} className={alert.severity === 'critical' ? 'bg-red-900' : 'bg-yellow-900'}>
                    <p>{alert.type}: {alert.message}</p>
                </div>
            ))}
            
            <button onClick={clear}>Limpiar Alertas</button>
        </div>
    );
}
```

#### Ejemplo 5: Eventos de vuelo

```jsx
import { useFlightEvents } from '../hooks/useTelemetry';

function FlightEventsLog() {
    const { recent } = useFlightEvents();
    
    return (
        <div>
            <h2>Eventos Recientes</h2>
            {recent.map((event, i) => (
                <div key={i}>
                    <span>{event.type}</span>
                    {event.type === 'state_change' && (
                        <span>{event.from} → {event.to}</span>
                    )}
                    {event.type === 'apogee' && (
                        <span>Apogeo: {event.altitude}m</span>
                    )}
                </div>
            ))}
        </div>
    );
}
```

#### Ejemplo 6: Acceso directo a datos del cohete

```jsx
import { useRocketData } from '../context/telemetry/TelemetryProvider';

function RocketDataDisplay() {
    const { 
        rocketData, 
        isReceivingData, 
        lastUpdate, 
        connectionStatus 
    } = useRocketData();
    
    return (
        <div>
            <p>Conectado: {connectionStatus.connected ? 'Sí' : 'No'}</p>
            <p>Recibiendo datos: {isReceivingData ? 'Sí' : 'No'}</p>
            <p>Última actualización: {lastUpdate?.toLocaleTimeString()}</p>
            <p>Packet ID: {rocketData.packet_id}</p>
            <p>Estado: {rocketData.state}</p>
        </div>
    );
}
```

### 🔄 Migración desde SensorsData

**Antes (SensorsData.jsx):**
```jsx
const { data, startGeneratingData, isArduinoConnected } = useSensorsData();
const altitude = data.sensors.BMP280.readings.altitude.value;
```

**Después (TelemetryProvider):**
```jsx
const { altitude } = useFlightMetrics();
// O acceso directo:
const { rocketData } = useRocketData();
const altitude = rocketData.bmp.altitude;
```

### 🎨 Ventajas de la Nueva Arquitectura

1. **Separación de responsabilidades**
   - SocketProvider: Solo conexiones
   - RocketDataProvider: Solo datos
   - Hooks especializados: Lógica específica

2. **Performance optimizado**
   - useMemo en todos los hooks
   - Histórico limitado (1000 puntos)
   - Re-renders minimizados

3. **Fácil de usar**
   - Hooks especializados por funcionalidad
   - No más lógica compleja en componentes
   - TypeScript-ready

4. **Escalable**
   - Fácil agregar SatelliteDataProvider
   - Estructura modular
   - Preparado para múltiples dispositivos

5. **Profesional**
   - Código limpio y mantenible
   - Documentado
   - Siguiendo best practices

### 📝 Variables de Entorno

Crear archivo `.env` en la raíz del frontend:

```env
VITE_BACKEND_URL=http://localhost:3000
```

### 🚀 Próximos Pasos

1. **Refactorizar RealTimePage**
   - Eliminar código de simulación
   - Usar nuevos hooks
   - Implementar componentes limpios

2. **Crear componentes especializados**
   - `FlightStateIndicator`
   - `SignalQualityPanel`
   - `AltitudeChart`
   - `VelocityChart`
   - `AccelerationVector`
   - `GPSMap`
   - `AlertsPanel`
   - `DataStreamPanel`

3. **Eliminar archivos obsoletos**
   - `context/SensorsData.jsx` (después de migrar)
   - Código de simulación
   - Lógica de pruebas unitarias

### 🎯 Estado Actual

✅ Arquitectura de contextos creada  
✅ Hooks especializados implementados  
✅ app.jsx actualizado  
⏳ RealTimePage pendiente de refactorizar  
⏳ Componentes especializados pendientes  

---

**La nueva arquitectura está lista para usar.** Ahora podemos refactorizar RealTimePage para usar estos nuevos hooks.
