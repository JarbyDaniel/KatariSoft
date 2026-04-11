# 🛰️ CanSat Frontend - Guía de Configuración

## ✅ Implementación Completada

Se ha implementado completamente la interfaz de usuario para visualizar los datos del CanSat en tiempo real.

## 📁 Archivos Creados

### Hooks
- **`src/hooks/useCansatData.js`** - Hook personalizado para gestionar Socket.io y datos del CanSat

### Contexto
- **`src/context/CansatContext.jsx`** - Provider y contexto para compartir datos del CanSat

### Páginas
- **`src/pages/CansatPage.jsx`** - Página principal del dashboard del CanSat

### Componentes

#### Principales
- **`src/components/cansat/CansatHeader.jsx`** - Header con estado y estadísticas
- **`src/components/cansat/CansatDataGrid.jsx`** - Grid de paneles de sensores
- **`src/components/cansat/CansatAlertsPanel.jsx`** - Panel de alertas en tiempo real
- **`src/components/cansat/CansatChartsPanel.jsx`** - Gráficas en tiempo real

#### Paneles de Sensores
- **`src/components/cansat/panels/AccelerometerPanel.jsx`** - Panel del acelerómetro
- **`src/components/cansat/panels/GyroscopePanel.jsx`** - Panel del giroscopio
- **`src/components/cansat/panels/BarometerPanel.jsx`** - Panel del barómetro
- **`src/components/cansat/panels/EnvironmentalPanel.jsx`** - Panel SCD40 (CO2, temp, humedad)
- **`src/components/cansat/panels/GPSPanel.jsx`** - Panel GPS
- **`src/components/cansat/panels/MICSPanel.jsx`** - Panel de sensores de gas

#### Componentes Comunes
- **`src/components/cansat/common/DataItem.jsx`** - Componente para mostrar datos individuales

### Archivos Modificados
- **`src/app.jsx`** - Agregado CansatProvider y ruta `/cansat`
- **`src/components/common/Sidebar.jsx`** - Agregado enlace "CanSat" en el menú

## 🎨 Características de la UI

### 🎯 Dashboard Principal
- **Header dinámico** con estado de conexión
- **Estadísticas en tiempo real** (paquetes, pérdidas, tasa de error)
- **6 paneles de sensores** con datos actualizados
- **Sistema de alertas** con animaciones
- **Gráficas en tiempo real** con Recharts

### 📊 Paneles de Sensores

1. **Acelerómetro (Azul)**
   - Ejes X, Y, Z
   - Magnitud calculada
   - Indicador de color según intensidad

2. **Giroscopio (Púrpura)**
   - Ejes X, Y, Z en °/s
   - Magnitud de rotación
   - Alertas de rotación alta

3. **Barómetro (Verde)**
   - Temperatura
   - Presión atmosférica
   - Altitud calculada

4. **Ambiental SCD40 (Cian)**
   - CO₂ con alertas
   - Temperatura
   - Humedad relativa

5. **GPS (Naranja)**
   - Latitud/Longitud
   - Altitud GPS
   - Número de satélites
   - Indicador de GPS Fix

6. **MICS (Rosa)**
   - Sensor RED
   - Sensor NOx
   - Valores analógicos

### 📈 Gráficas en Tiempo Real

- **Altitud Barométrica** - Línea verde
- **Magnitud de Aceleración** - Línea azul
- **Temperatura** - Línea naranja
- **Nivel de CO₂** - Línea cian

Todas las gráficas:
- Actualizadas en tiempo real
- Últimos 50 puntos de datos
- Tooltips interactivos
- Responsive design

### ⚠️ Sistema de Alertas

- **Alertas automáticas** basadas en umbrales
- **Animaciones de entrada/salida** con Framer Motion
- **Clasificación por severidad** (warning, info, error)
- **Botón para limpiar alertas**

## 🚀 Cómo Usar

### 1. Asegúrate de que el backend esté corriendo

```bash
cd katari1.0
npm start
```

El servidor debe estar en `http://localhost:3000`

### 2. Inicia el frontend

```bash
cd katarisoft
npm run dev
```

### 3. Navega a la página del CanSat

Abre tu navegador en:
```
http://localhost:5173/cansat
```

O haz clic en el enlace "CanSat" 🛰️ en el sidebar

## 🔄 Flujo de Datos

```
Arduino → Backend (puerto 3000)
    ↓
Socket.io (evento: cansat:data)
    ↓
useCansatData Hook
    ↓
CansatContext
    ↓
CansatPage → Componentes
    ↓
UI Actualizada en Tiempo Real
```

## 🎨 Personalización

### Cambiar URL del Servidor

En `src/app.jsx`:

```javascript
<CansatProvider serverUrl="http://tu-servidor:puerto">
```

### Modificar Colores de Alertas

En `src/components/cansat/CansatAlertsPanel.jsx`:

```javascript
const getAlertStyles = (severity) => {
  // Personaliza los colores aquí
}
```

### Ajustar Umbrales de Color

En cada panel (ej. `AccelerometerPanel.jsx`):

```javascript
const getMagnitudeColor = (magnitude) => {
  if (magnitude > 15) return 'text-red-400';    // Personaliza
  if (magnitude > 10) return 'text-yellow-400'; // Personaliza
  return 'text-green-400';
};
```

### Cambiar Número de Puntos en Gráficas

En `src/components/cansat/CansatChartsPanel.jsx`:

```javascript
const chartData = history.slice(-50); // Cambia 50 por el número deseado
```

## 📱 Responsive Design

La interfaz es completamente responsive:
- **Desktop**: Grid de 3 columnas
- **Tablet**: Grid de 2 columnas
- **Mobile**: Grid de 1 columna

## 🎭 Animaciones

Todas las animaciones están hechas con **Framer Motion**:
- Entrada de componentes con stagger
- Hover effects en paneles
- Transiciones suaves
- Alertas animadas

## 🐛 Debugging

### Ver logs en consola

Abre las DevTools del navegador (F12) y ve a la pestaña Console:

```
🛰️ Iniciando conexión con CanSat...
✅ Socket.io conectado al servidor CanSat
📊 Estado inicial del CanSat recibido: {...}
📡 Datos CanSat recibidos: {...}
```

### Verificar conexión Socket.io

En la consola del navegador:

```javascript
// Ver estado del socket
console.log(socket.connected); // true/false
```

### Problemas comunes

1. **No se conecta al servidor**
   - Verifica que el backend esté corriendo en puerto 3000
   - Revisa la URL en `CansatProvider`
   - Verifica CORS en el backend

2. **No llegan datos**
   - Verifica que el Arduino esté conectado
   - Revisa logs del backend
   - Verifica formato de datos CSV

3. **Gráficas no se actualizan**
   - Verifica que `history` tenga datos
   - Revisa la consola por errores de Recharts

## 📦 Dependencias Necesarias

Ya están instaladas en el proyecto:
- `socket.io-client` - Cliente Socket.io
- `recharts` - Librería de gráficas
- `framer-motion` - Animaciones
- `lucide-react` - Iconos

## ✨ Próximas Mejoras

- [ ] Agregar modo oscuro/claro
- [ ] Exportar datos a CSV
- [ ] Modo de replay de datos históricos
- [ ] Mapa interactivo con trayectoria GPS
- [ ] Notificaciones push para alertas críticas
- [ ] Comparación de múltiples vuelos
- [ ] Dashboard personalizable (drag & drop)

## 🎉 Resultado Final

La interfaz muestra:
- ✅ Datos en tiempo real de todos los sensores
- ✅ Estado de conexión del CanSat
- ✅ Estadísticas de paquetes
- ✅ Alertas automáticas
- ✅ Gráficas históricas
- ✅ Diseño moderno y responsive
- ✅ Animaciones fluidas
- ✅ Experiencia de usuario intuitiva

**¡El dashboard del CanSat está listo para usar!** 🚀
