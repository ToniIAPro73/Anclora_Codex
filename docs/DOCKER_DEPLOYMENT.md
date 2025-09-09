# 🐳 Guía de Despliegue con Docker - Anclora Cortex

Esta guía te mostrará cómo ejecutar toda la aplicación Anclora Cortex usando Docker para interactuar con ella desde la web.

## 📋 Requisitos Previos

- Docker Desktop instalado y funcionando
- Docker Compose (incluido con Docker Desktop)
- Puertos disponibles: 3000, 5000, 5432, 5678

## 🏗️ Arquitectura de la Aplicación

La aplicación está compuesta por 4 servicios principales:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │   PostgreSQL    │    │      N8N        │
│   React PWA     │◄──►│   Flask API     │◄──►│   Database      │    │   Workflows     │
│   Port: 3000    │    │   Port: 5000    │    │   Port: 5432    │    │   Port: 5678    │
└─────────────────┘    └─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🚀 Inicio Rápido

### Paso 1: Navegar al directorio Docker
```bash
cd docker
```

### Paso 2: Ejecutar todos los servicios
```bash
docker-compose up -d
```

### Paso 3: Verificar el estado
```bash
docker-compose ps
```

¡Eso es todo! La aplicación estará disponible en **http://localhost:3000**

## 🌐 URLs de Acceso

Una vez que todos los contenedores estén ejecutándose:

| Servicio | URL | Descripción |
|----------|-----|-------------|
| **Frontend** | http://localhost:3000 | Aplicación web principal (React PWA) |
| **Backend API** | http://localhost:5000 | API REST para análisis de IA |
| **N8N Workflows** | http://localhost:5678 | Panel de administración de workflows |
| **PostgreSQL** | localhost:5432 | Base de datos (acceso interno) |

### Credenciales de N8N
- **Usuario**: `admin`
- **Contraseña**: `anclora2025`

## 📊 Servicios Incluidos

### 🎨 Frontend (React PWA)
- **Puerto**: 3000
- **Tecnología**: React + Vite
- **Características**:
  - Landing page profesional de Anclora Cortex
  - Formulario de análisis de negocio en 3 pasos
  - Interfaz de resultados con IA
  - Sistema de autenticación
  - Descarga de reportes

### ⚙️ Backend (Flask API)
- **Puerto**: 5000
- **Tecnología**: Python Flask
- **Características**:
  - API REST para análisis de negocio
  - Integración con modelos de IA
  - Autenticación con Supabase
  - Conexión con PostgreSQL
  - Webhooks para N8N

### 🗄️ Base de Datos (PostgreSQL)
- **Puerto**: 5432
- **Versión**: PostgreSQL 13
- **Configuración**:
  - Base de datos: `anclora_cortex`
  - Usuario: `anclora`
  - Contraseña: `password`

### 🔄 N8N (Orquestación)
- **Puerto**: 5678
- **Características**:
  - Workflows de análisis automatizado
  - Integración con servicios externos
  - Monitoreo de ejecuciones
  - Panel de administración web

## 🔧 Comandos Útiles

### Gestión de Servicios

```bash
# Iniciar todos los servicios
docker-compose up -d

# Ver logs en tiempo real
docker-compose logs -f

# Ver logs de un servicio específico
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f n8n
docker-compose logs -f db

# Verificar estado de contenedores
docker-compose ps

# Detener todos los servicios
docker-compose down

# Detener y eliminar volúmenes (reset completo)
docker-compose down -v
```

### Reconstrucción y Mantenimiento

```bash
# Reconstruir imágenes sin cache
docker-compose build --no-cache

# Reconstruir y reiniciar
docker-compose build --no-cache && docker-compose up -d

# Reiniciar un servicio específico
docker-compose restart backend

# Ver uso de recursos
docker stats
```

### Acceso a Contenedores

```bash
# Acceder al contenedor del backend
docker-compose exec backend bash

# Acceder a la base de datos
docker-compose exec db psql -U anclora -d anclora_cortex

# Acceder al contenedor de N8N
docker-compose exec n8n sh

# Ver archivos del frontend
docker-compose exec frontend sh
```

## 🎯 Cómo Probar la Aplicación

### 1. Acceso Inicial
1. Abre tu navegador web
2. Ve a **http://localhost:3000**
3. Verás la landing page de Anclora Cortex

### 2. Análisis de Negocio con IA
1. Haz clic en **"Analizar mi Negocio"**
2. Completa el formulario en 3 pasos:
   - **Paso 1**: Tipo de negocio, nombre, website
   - **Paso 2**: Descripción y desafíos actuales
   - **Paso 3**: Objetivos y metas
3. Haz clic en **"Analizar Negocio"**
4. Observa los resultados:
   - Puntuación de optimización
   - Recomendaciones específicas
   - KPIs de mejora
   - Timeline de implementación

### 3. Funcionalidades Adicionales
- **Registro/Login**: Crea una cuenta nueva
- **Descarga de reportes**: Descarga análisis en JSON
- **Tipos de negocio**: Prueba SaaS, E-commerce, Local, Startup
- **Panel N8N**: Monitorea workflows en http://localhost:5678

## 🔍 Solución de Problemas

### Problemas Comunes

#### Puerto ya en uso
```bash
# Verificar qué proceso usa el puerto
netstat -ano | findstr :3000
netstat -ano | findstr :5000

# Cambiar puertos en docker-compose.yml si es necesario
```

#### Contenedor no inicia
```bash
# Ver logs detallados
docker-compose logs [nombre_servicio]

# Reconstruir imagen
docker-compose build --no-cache [nombre_servicio]
```

#### Base de datos no conecta
```bash
# Verificar salud de la base de datos
docker-compose exec db pg_isready -U anclora -d anclora_cortex

# Reiniciar servicio de base de datos
docker-compose restart db
```

#### Problemas de permisos
```bash
# En Windows, ejecutar como administrador
# En Linux/Mac, usar sudo si es necesario
sudo docker-compose up -d
```

### Logs y Debugging

```bash
# Ver todos los logs
docker-compose logs

# Logs con timestamps
docker-compose logs -t

# Seguir logs en tiempo real
docker-compose logs -f --tail=100

# Logs de un servicio específico
docker-compose logs -f backend
```

## 🔄 Proceso de Inicio

El sistema sigue este orden de inicio:

1. **PostgreSQL** se inicia primero
2. **Backend** espera a que la DB esté lista
3. **N8N** se conecta a la base de datos
4. **Frontend** se construye y sirve

### Tiempos Estimados
- **Primer inicio**: 2-5 minutos (descarga de imágenes)
- **Inicios posteriores**: 30-60 segundos
- **Reconstrucción completa**: 3-8 minutos

## 📁 Estructura de Archivos Docker

```
docker/
├── docker-compose.yml          # Configuración principal
├── .env                       # Variables de entorno
└── n8n/
    ├── docker-compose.n8n.yml # Configuración específica N8N
    └── workflows/             # Workflows predefinidos
```

## 🌟 Comando Todo-en-Uno

Para desarrolladores que quieren iniciar rápidamente:

```bash
cd docker && docker-compose up -d && docker-compose logs -f
```

Este comando:
1. Cambia al directorio docker
2. Inicia todos los servicios en segundo plano
3. Muestra los logs en tiempo real

## 📈 Monitoreo y Métricas

### Verificar Estado de Servicios
```bash
# Estado general
docker-compose ps

# Uso de recursos
docker stats

# Logs de salud
docker-compose logs | grep -i health
```

### URLs de Monitoreo
- **Aplicación**: http://localhost:3000
- **API Health**: http://localhost:5000/health
- **N8N Status**: http://localhost:5678

## 🔐 Configuración de Seguridad

### Variables de Entorno Importantes
- `SECRET_KEY`: Clave secreta para JWT
- `SUPABASE_URL`: URL de Supabase
- `SUPABASE_KEY`: Clave de API de Supabase
- `DATABASE_URL`: Conexión a PostgreSQL

### Cambiar Credenciales por Defecto
Edita el archivo `docker/.env` para personalizar:
```env
POSTGRES_PASSWORD=tu_password_seguro
N8N_BASIC_AUTH_PASSWORD=tu_password_n8n
SECRET_KEY=tu_clave_secreta_jwt
```

## 🎉 ¡Listo para Usar!

Una vez completados estos pasos, tendrás:

✅ **Frontend React PWA** funcionando en puerto 3000  
✅ **Backend Flask API** con IA en puerto 5000  
✅ **Base de datos PostgreSQL** en puerto 5432  
✅ **N8N Workflows** en puerto 5678  
✅ **Aplicación completa** lista para análisis de negocio  

**¡Disfruta usando Anclora Cortex!** 🚀