# 🏎️ CarStreams - MONOHOBI Racing Game

Una aplicación web interactiva de carreras desarrollada con Next.js que permite a los usuarios crear competencias entre equipos con seguimiento de progreso en tiempo real y animaciones dinámicas.

## 📋 Tabla de Contenidos

- [Descripción](#descripción)
- [Características](#características)
- [Tecnologías y Dependencias](#tecnologías-y-dependencias)
- [Instalación](#instalación)
- [Uso](#uso)
- [Arquitectura del Proyecto](#arquitectura-del-proyecto)
- [Principios SOLID Aplicados](#principios-solid-aplicados)
- [Clean Code Implementado](#clean-code-implementado)
- [Estructura de Archivos](#estructura-de-archivos)

## 🎯 Descripción

CarStreams es una aplicación de carreras interactiva donde los usuarios pueden:
- Seleccionar equipos de diferentes países
- Establecer metas de progreso
- Seguir el avance en tiempo real con animaciones
- Visualizar carreras con gráficos SVG animados
- Descargar capturas de pantalla de los resultados

## ✨ Características

- **Interfaz Responsiva**: Diseño adaptable para dispositivos móviles y desktop
- **Animaciones Fluidas**: Implementadas con GSAP para transiciones suaves
- **Persistencia de Datos**: LocalStorage para mantener el estado entre sesiones
- **Visualización Dinámica**: Carreras animadas con SVG y Canvas
- **Descarga de Imágenes**: Captura de pantalla de resultados con html2canvas
- **Tipado Fuerte**: TypeScript para mayor seguridad y mantenibilidad

## 🛠️ Tecnologías y Dependencias

### Dependencias de Producción

| Dependencia | Versión | Propósito |
|-------------|---------|----------|
| **next** | 15.5.3 | Framework React para aplicaciones web |
| **react** | 19.1.0 | Biblioteca para interfaces de usuario |
| **react-dom** | 19.1.0 | Renderizado DOM para React |
| **@gsap/react** | ^2.1.2 | Integración de GSAP con React |
| **gsap** | ^3.13.0 | Biblioteca de animaciones de alto rendimiento |
| **flowbite-react** | ^0.12.9 | Componentes UI basados en Tailwind CSS |
| **html2canvas-pro** | ^1.5.11 | Captura de pantalla de elementos HTML |
| **react-icons** | ^5.5.0 | Biblioteca de iconos para React |


## 🚀 Instalación

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd CarStreams
```

2. **Instalar dependencias**
```bash
npm install
# o
yarn install
# o
pnpm install
```

3. **Ejecutar en modo desarrollo**
```bash
npm run dev
# o
yarn dev
# o
pnpm dev
```

4. **Abrir en el navegador**
```
http://localhost:3000
```

## 📖 Uso

1. **Selección de Equipos**: Elige dos equipos diferentes de la lista desplegable
2. **Establecer Metas**: Define los objetivos numéricos para cada equipo
3. **Iniciar Carrera**: Haz clic en "START" para comenzar la competencia
4. **Seguimiento**: Actualiza el progreso de cada equipo en tiempo real
5. **Visualización**: Observa las animaciones de carrera y progreso
6. **Descarga**: Captura y descarga imágenes de los resultados

## 🏗️ Arquitectura del Proyecto

### Estructura de Carpetas

```
src/
├── app/                    # App Router de Next.js
│   ├── globals.css        # Estilos globales
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx          # Página de inicio
│   └── match/            # Rutas dinámicas de partidos
├── components/           # Componentes reutilizables
│   ├── ButtonUtil.tsx    # Botón utilitario
│   ├── CardProgress.tsx  # Tarjeta de progreso
│   ├── InputGoal.tsx     # Input para metas
│   ├── InputProgress.tsx # Input para progreso
│   └── SelectorTeams.tsx # Selector de equipos
├── context/             # Context API providers
│   ├── DownloadProvider.tsx # Contexto de descarga
│   ├── RaceProvider.tsx     # Contexto de carrera
│   └── TeamsProvider.tsx    # Contexto de equipos
├── hooks/               # Custom hooks
│   ├── useDownload.tsx  # Hook para descargas
│   ├── useRace.tsx      # Hook para carreras
│   └── useTeams.tsx     # Hook para equipos
├── types/               # Definiciones TypeScript
│   └── index.ts         # Tipos principales
└── utils/               # Utilidades y helpers
    ├── helpers.tsx      # Funciones auxiliares
    └── teams.ts         # Datos de equipos
```

## 🎯 Principios SOLID Aplicados

### 1. **Single Responsibility Principle (SRP)**

**Archivos que lo implementan:**
- `src/components/ButtonUtil.tsx` - Solo maneja la lógica de botones
- `src/components/SelectorTeams.tsx` - Solo maneja selección de equipos
- `src/hooks/useTeams.tsx` - Solo maneja la lógica de equipos
- `src/hooks/useDownload.tsx` - Solo maneja descargas

**Ejemplo:**
```typescript
// ButtonUtil.tsx - Una sola responsabilidad: renderizar botones
const ButtonUtil = ({ label, onClick, className, icon, title }) => {
  return (
    <button
      type="submit"
      className={className}
      onClick={onClick}
      title={title}
    >
      {label} {icon}
    </button>
  );
};
```

### 2. **Open/Closed Principle (OCP)**

**Archivos que lo implementan:**
- `src/types/index.ts` - Interfaces extensibles
- `src/components/SelectorTeams.tsx` - Componente extensible via props

**Ejemplo:**
```typescript
// SelectorProps interface - Abierta para extensión
export type SelectorProps = {
  id: string;
  placeholder: string;
  options: Team[];
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  excludeTeam?: string; // Extensible sin modificar código existente
};
```

### 3. **Liskov Substitution Principle (LSP)**

**Archivos que lo implementan:**
- `src/context/TeamsProvider.tsx` - Implementa TeamsContextType
- `src/context/DownloadProvider.tsx` - Implementa DownloadContextType

### 4. **Interface Segregation Principle (ISP)**

**Archivos que lo implementan:**
- `src/types/index.ts` - Interfaces específicas y segregadas

**Ejemplo:**
```typescript
// Interfaces segregadas por responsabilidad
export type InputGoalProps = {
  id: string;
  type: string;
  value: number;
  handleGoalChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export type CardProgressProps = {
  teamName: string;
  teamGoal: number;
  // ... solo propiedades relevantes para CardProgress
};
```

### 5. **Dependency Inversion Principle (DIP)**

**Archivos que lo implementan:**
- `src/hooks/useTeams.tsx` - Depende de abstracciones (Context)
- `src/components/` - Todos los componentes dependen de props (abstracciones)

**Ejemplo:**
```typescript
// useTeams.tsx - Depende de la abstracción TeamsContext
const useTeams = () => {
  return useContext(TeamsContext); // Abstracción, no implementación concreta
};
```

## 🧹 Clean Code Implementado

### 1. **Nombres Descriptivos**

**Archivos que lo implementan:**
- `src/components/SelectorTeams.tsx`
- `src/hooks/useTeams.tsx`
- `src/utils/helpers.tsx`

**Ejemplos:**
```typescript
// Nombres de funciones descriptivos
const handleTeam1Change = (e: React.ChangeEvent<HTMLSelectElement>) => {...}
const handleSaveProgress1 = () => {...}
const formatNumberWithCommas = (quantity: number) => {...}
```

### 2. **Funciones Pequeñas**

**Archivos que lo implementan:**
- `src/components/ButtonUtil.tsx` - Función de 15 líneas
- `src/hooks/useTeams.tsx` - Hook simple de 5 líneas
- `src/utils/helpers.tsx` - Funciones utilitarias pequeñas

### 3. **Separación de Responsabilidades**

**Archivos que lo implementan:**
- `src/context/` - Manejo de estado global
- `src/components/` - Componentes de UI
- `src/hooks/` - Lógica reutilizable
- `src/utils/` - Funciones auxiliares

### 4. **Tipado Fuerte**

**Archivos que lo implementan:**
- `src/types/index.ts` - Definiciones completas de tipos
- Todos los archivos `.tsx` - Uso consistente de TypeScript

**Ejemplo:**
```typescript
export type Team = {
  id: number;
  name: string;
  spelling: string;
  flag: string;
  car: string;
};
```

### 5. **Manejo de Errores**

**Archivos que lo implementan:**
- `src/context/TeamsProvider.tsx` - Validaciones y manejo de errores

**Ejemplo:**
```typescript
if (progressValue > remaining) {
  setTeam1Error(`You can't add more than ${remaining}.`);
} else {
  setTeam1Error("");
}
```

### 6. **Código DRY (Don't Repeat Yourself)**

**Archivos que lo implementan:**
- `src/components/` - Componentes reutilizables
- `src/hooks/` - Lógica reutilizable
- `src/utils/helpers.tsx` - Funciones auxiliares compartidas

### 7. **Comentarios Significativos**

**Archivos que lo implementan:**
- `src/context/TeamsProvider.tsx` - Comentarios explicativos en lógica compleja
- `src/utils/helpers.tsx` - Documentación de funciones

## 📁 Estructura de Archivos Detallada

### Componentes Principales
- **`src/app/page.tsx`** - Página principal con formulario de selección
- **`src/app/layout.tsx`** - Layout con providers y metadata
- **`src/app/match/[id]/page.tsx`** - Página de carrera dinámica

### Componentes Reutilizables
- **`src/components/ButtonUtil.tsx`** - Botón genérico reutilizable
- **`src/components/SelectorTeams.tsx`** - Selector de equipos con filtrado
- **`src/components/InputGoal.tsx`** - Input para establecer metas
- **`src/components/CardProgress.tsx`** - Tarjeta de progreso con historial

### Gestión de Estado
- **`src/context/TeamsProvider.tsx`** - Estado global de equipos y partidos
- **`src/context/DownloadProvider.tsx`** - Funcionalidad de descarga
- **`src/context/RaceProvider.tsx`** - Estado de animaciones de carrera

### Hooks Personalizados
- **`src/hooks/useTeams.tsx`** - Hook para acceder al contexto de equipos
- **`src/hooks/useDownload.tsx`** - Hook para funcionalidad de descarga
- **`src/hooks/useRace.tsx`** - Hook para animaciones de carrera

### Utilidades
- **`src/utils/helpers.tsx`** - Funciones auxiliares y configuración de fuentes
- **`src/utils/teams.ts`** - Datos estáticos de equipos y países
- **`src/types/index.ts`** - Definiciones TypeScript centralizadas

## 🚀 Scripts Disponibles

```json
{
  "dev": "next dev --turbopack",     // Desarrollo con Turbopack
  "build": "next build --turbopack",  // Build de producción
  "start": "next start",             // Servidor de producción
  "lint": "eslint"                   // Linting del código
}
```

## 🎨 Características Técnicas

- **App Router**: Utiliza el nuevo sistema de rutas de Next.js 13+
- **Turbopack**: Bundler de alta velocidad para desarrollo
- **TypeScript**: Tipado estático para mayor robustez
- **Tailwind CSS**: Framework CSS utilitario para estilos
- **GSAP**: Animaciones de alto rendimiento
- **Context API**: Gestión de estado global sin librerías externas
- **LocalStorage**: Persistencia de datos del lado del cliente

---

**Desarrollado con ❤️ usando Next.js, TypeScript y principios de Clean Code**
