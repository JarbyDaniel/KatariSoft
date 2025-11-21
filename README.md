# 🚀 KatariSoft - Katari Society Telemetry Platform

<div align="center">

![Katari Society](https://img.shields.io/badge/Katari-Society-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC?style=for-the-badge&logo=tailwind-css)

**Plataforma de telemetría en tiempo real para Katari Society 2025**

[Instalación](#installation) •
[Características](#features) •
[Uso](#usage) •
[Licencia](#license)

</div>

---

## 📋 Tabla de Contenidos

- [Descripción del Proyecto](#project-overview)
- [Características Principales](#features)
- [Tecnologías](#technologies)
- [Instalación](#installation)
- [Uso](#usage)
- [Estructura del Proyecto](#project-structure)
- [Scripts Disponibles](#scripts)
- [Despliegue](#deployment)
- [Contribuciones](#contributing)
- [Licencia](#license)
- [Autor](#author)

## 🎯 Descripción del Proyecto {#project-overview}

**KatariSoft** es la plataforma de Katari Society para monitoreo y análisis de telemetría en tiempo real de un cohete y un satélite CanSat. Desarrollada específicamente para el grupo Katari Society 2025, esta aplicación proporciona visualización avanzada de datos de sensores, análisis histórico y control de misiones.

### Sobre Katari Society

Katari Society es un grupo de investigación dedicado a la exploración y desarrollo de tecnologías aeroespaciales. Compuesto por estudiantes de diversas disciplinas de la Universidad del Cauca, el grupo busca promover la investigación en ciencias y tecnología espacial a través de proyectos innovadores que protegen los recursos naturales del Amazonas, llevando las ideas de jóvenes entusiastas del espacio a proyectos reales.

## ✨ Características Principales {#features}

- 📊 **Dashboard en Tiempo Real**: Visualización de datos de sensores en vivo
- 📈 **Análisis Histórico**: Gráficas y tablas de datos históricos de misiones
- 🗺️ **Mapas Geoespaciales**: Tracking GPS y visualización de trayectorias
- 🎮 **Modelos 3D Interactivos**: Visualización de cohetes y CanSat en 3D
- 📡 **Monitoreo de Sensores**: IMU, GPS, presión, temperatura, altitud
- 👥 **Gestión de Usuarios**: Sistema de autenticación y roles
- ⚙️ **Configuración Flexible**: Gestión de sensores y parámetros de prueba
- 📱 **Diseño Responsivo**: Optimizado para todos los dispositivos

## 🛠️ Tecnologías {#technologies}

### Frontend
- **React** - Biblioteca de UI
- **Vite** - Build tool y dev server
- **TailwindCSS** - Framework de estilos
- **Three.js / React Three Fiber** - Renderizado 3D
- **Recharts** - Visualización de datos
- **Leaflet** - Mapas interactivos

### Backend & Servicios
> 📦 **Backend Repository**: [Katari_backend](https://github.com/KatariSociety/Katari_backend) - Desarrollado por [Juanes Yepez](https://github.com/juanesyepez)

- **Node.js** - Servidor backend
- **Express** - Framework web
- **WebSocket** - Comunicación en tiempo real
- **API REST** - Endpoints para telemetría y gestión de datos

## 📥 Instalación {#installation}

### Prerrequisitos

- Node.js 18.x o superior
- npm o yarn
- Git

### Pasos de Instalación

1. **Clonar el repositorio del frontend**
   ```bash
   git clone https://github.com/jarbydaniel/KatariSoft.git
   cd KatariSoft
   ```

2. **Instalar dependencias del frontend**
   ```bash
   npm install
   ```

3. **Configurar el backend**
   
   El backend se encuentra en un repositorio separado:
   ```bash
   # En otra terminal o directorio
   git clone https://github.com/KatariSociety/Katari_backend.git
   cd Katari_backend
   npm install
   ```
   
   Sigue las instrucciones del [repositorio del backend](https://github.com/KatariSociety/Katari_backend) para su configuración.

4. **Configurar variables de entorno**
   ```bash
   cp .env.example .env
   # Editar .env con las configuraciones dadas por el autor.
   ```

5. **Iniciar servidor de desarrollo**
   ```bash
   npm run dev
   ```

La aplicación estará disponible en `http://localhost:5173`

## 🚀 Uso {#usage}

### Desarrollo

Iniciar el servidor de desarrollo con hot-reload:

```bash
npm run dev
```

### Build de Producción

Generar build optimizado para producción:

```bash
npm run build
```

### Vista Previa del Build

Previsualizar el build de producción localmente:

```bash
npm run preview
```

## 📁 Estructura del Proyecto {#project-structure}

```
katarisoft/
├── public/              # Archivos estáticos
├── servidor/            # Backend Node.js
│   └── app.js          # Servidor Express
├── src/
│   ├── assets/         # Recursos (imágenes, HDR)
│   ├── components/     # Componentes React
│   │   ├── common/     # Componentes compartidos
│   │   ├── dashboard/  # Dashboard principal
│   │   ├── historical/ # Datos históricos
│   │   ├── realtime/   # Monitoreo en tiempo real
│   │   ├── settings/   # Configuración
│   │   └── users/      # Gestión de usuarios
│   ├── context/        # Context API
│   ├── pages/          # Páginas principales
│   ├── services/       # Servicios API
│   └── utils/          # Utilidades
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## 📜 Scripts Disponibles {#scripts}

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Genera build de producción |
| `npm run preview` | Previsualiza el build |
| `npm run deploy:gh` | Despliega en GitHub Pages |
| `npm run deploy:vercel` | Despliega en Vercel |

## 🌐 Despliegue {#deployment}

### GitHub Pages

```bash
npm run deploy:gh
```

### Vercel

```bash
npm run deploy:vercel
```

### Otros Servicios

El proyecto puede ser desplegado en cualquier servicio que soporte aplicaciones React (Netlify, AWS, etc.). Solo ejecuta `npm run build` y sube la carpeta `dist/`.

## 🤝 Contribuciones {#contributing}

Este proyecto es de uso interno para Katari Society 2025. Si eres miembro del grupo y deseas contribuir:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia {#license}

Copyright © 2025 [jarbydaniel](https://github.com/jarbydaniel)

Este software está licenciado bajo una licencia personalizada basada en MIT con las siguientes condiciones:

**Permisos:**
- ✅ Uso personal y educativo
- ✅ Modificación del código
- ✅ Uso por parte de Katari Society y sus miembros
- ✅ Distribución y uso con atribución

**Condiciones:**
- 📝 Debe incluir atribución al autor original
- 🔗 Debe incluir un enlace a este repositorio
- 🚫 **No se permite uso comercial o con fines de lucro**
- 🚫 **No se puede usar para generar ingresos directos o indirectos**
- 🚫 **Prohibido su distribución o uso por fuera de Katari Society**

**Limitaciones:**
- ❌ Sin garantía
- ❌ Sin responsabilidad del autor

### Texto Completo de la Licencia

```
MIT License - Non-Commercial Katari Society Edition

Copyright (c) 2025 jarbydaniel (https://github.com/jarbydaniel)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to use,
copy, modify, merge, and distribute copies of the Software, subject to the
following conditions:

1. ATTRIBUTION: The above copyright notice, this permission notice, and a link
   to the original repository (https://github.com/jarbydaniel/KatariSoft) shall
   be included in all copies or substantial portions of the Software.

2. NON-COMMERCIAL USE: The Software may be used by Katari Society members and
   for educational purposes only. Commercial use, including but not limited to
   selling, licensing for profit, or using the Software as part of a paid
   service, is strictly prohibited without explicit written permission from
   the copyright holder.

3. REFERENCE REQUIREMENT: Any use, modification, or distribution of this
   Software must include clear attribution to the original author (jarbydaniel)
   and reference this repository.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

Para solicitudes de uso comercial o permisos especiales, contactar al autor.

## 👨‍💻 Autores {#author}

**jarbydaniel y Juanes Yepez**
- GitHub: [@jarbydaniel](https://github.com/jarbydaniel)
- GitHub: [@juanesyepez](https://github.com/JYPPZ)

### Frontend
- Repositorio: [KatariSoft](https://github.com/jarbydaniel/KatariSoft)

### Backend
- Repositorio: [Katari_backend](https://github.com/KatariSociety/Katari_backend)

Desarrollado con ❤️ para Katari Society

---

<div align="center">

**[Katari Society](https://github.com/KatariSociety)** | Universidad del Cauca

*Llevando las ideas espaciales a la realidad* 🚀

</div>