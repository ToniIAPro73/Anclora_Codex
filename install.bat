@echo off
REM 🚀 Anclora Cortex - Script de Instalación Rápida para Windows
REM Instala y configura Anclora Cortex en tu sistema local

echo ⚓ Bienvenido a Anclora Cortex
echo ================================
echo.

REM Verificar Docker
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker no está instalado. Por favor instala Docker primero.
    echo    Visita: https://docs.docker.com/get-docker/
    pause
    exit /b 1
)

REM Verificar Docker Compose
docker-compose --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker Compose no está instalado. Por favor instala Docker Compose primero.
    echo    Visita: https://docs.docker.com/compose/install/
    pause
    exit /b 1
)

echo ✅ Docker y Docker Compose detectados
echo.

REM Crear archivo .env si no existe
if not exist "docker\.env" (
    echo 📝 Creando archivo de configuración...
    (
        echo # Supabase Configuration
        echo SUPABASE_URL=https://wygyxqvflvjeeonifiad.supabase.co
        echo SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5Z3l4cXZmbHZqZWVvbmlmaWFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTczNTQwMDcsImV4cCI6MjA3MjkzMDAwN30.LiD0cCR1bdqV5knwzmD3DVIRnBj9ZG9lJT1GRayaJ4s
        echo SECRET_KEY=d1d2b39b76a19ccb96d49f5ec3d5f720ccd1e37405317fb19301e0a67374e3f2
        echo JWT_SECRET_KEY=f86b5b96edc7f6ded25caaafb2224effa7238d87b9dd1a173ed378e7d4d049d8
        echo.
        echo # Database Configuration
        echo DATABASE_URL=postgresql://anclora:password@db:5432/anclora_cortex
        echo.
        echo # Environment
        echo NODE_ENV=development
    ) > docker\.env
    echo ✅ Archivo de configuración creado
) else (
    echo ✅ Archivo de configuración encontrado
)

echo.
echo 🔧 Construyendo contenedores Docker...
docker-compose -f docker/docker-compose.yml build

echo.
echo 🚀 Iniciando servicios...
docker-compose -f docker/docker-compose.yml up -d

echo.
echo ⏳ Esperando que los servicios estén listos...
timeout /t 10 /nobreak >nul

REM Verificar que los servicios estén corriendo
docker-compose -f docker/docker-compose.yml ps | findstr "Up" >nul
if %errorlevel% equ 0 (
    echo ✅ Servicios iniciados correctamente
) else (
    echo ❌ Error al iniciar los servicios
    echo    Ejecuta: docker-compose -f docker/docker-compose.yml logs
    pause
    exit /b 1
)

echo.
echo 🎉 ¡Anclora Cortex está listo!
echo ================================
echo.
echo 📱 Accede a la aplicación:
echo    Frontend: http://localhost:3000
echo    Backend:  http://localhost:5000
echo    N8N:      http://localhost:5678 ^(admin/anclora2025^)
echo    Base de datos: localhost:5432
echo.
echo 🤖 Configuración de IA:
echo    Para habilitar IA local, ejecuta:
echo    scripts\download-models.bat
echo.
echo 🔧 Comandos útiles:
echo    Ver logs:     docker-compose -f docker/docker-compose.yml logs
echo    Detener:      docker-compose -f docker/docker-compose.yml down
echo    Reiniciar:    docker-compose -f docker/docker-compose.yml restart
echo.
echo 📚 Documentación:
echo    README.md - Guía general
echo    docs\AI_AGENTS_SYSTEM.md - Sistema de IA
echo.
echo ¡Disfruta analizando tu negocio con IA! 🚀
echo.
pause