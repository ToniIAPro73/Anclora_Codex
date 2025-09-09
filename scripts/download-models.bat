@echo off
REM Script para descargar modelos de IA para Anclora Cortex (Windows)
REM Descarga modelos LLaMA optimizados para análisis de negocio

echo 🤖 Descargando modelos de IA para Anclora Cortex
echo ================================================

REM Crear directorio de modelos
if not exist "backend\models" mkdir backend\models
cd backend\models

REM Función para verificar si curl está disponible
curl --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Error: curl requerido para descargar modelos
    echo    Instala curl desde: https://curl.se/windows/
    pause
    exit /b 1
)

REM Descargar modelo LLaMA 2 7B Chat (cuantizado)
echo 🦙 Descargando LLaMA 2 7B Chat (GGUF)...
if not exist "llama-2-7b-chat.q4_0.gguf" (
    echo 📥 Descargando llama-2-7b-chat.q4_0.gguf...
    curl -L --progress-bar -o "llama-2-7b-chat.q4_0.gguf" "https://huggingface.co/TheBloke/Llama-2-7B-Chat-GGUF/resolve/main/llama-2-7b-chat.q4_0.gguf"
    echo ✅ LLaMA 2 7B Chat descargado
) else (
    echo ✅ LLaMA 2 7B Chat ya existe
)

REM Descargar modelo de embeddings
echo 🔍 Descargando modelo de embeddings...
if not exist "all-MiniLM-L6-v2.bin" (
    echo 📥 Descargando all-MiniLM-L6-v2.bin...
    curl -L --progress-bar -o "all-MiniLM-L6-v2.bin" "https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2/resolve/main/pytorch_model.bin"
    echo ✅ Modelo de embeddings descargado
) else (
    echo ✅ Modelo de embeddings ya existe
)

REM Crear archivo de configuración
(
    echo {
    echo   "llama_model": {
    echo     "path": "./models/llama-2-7b-chat.q4_0.gguf",
    echo     "type": "llama-cpp",
    echo     "context_length": 4096,
    echo     "temperature": 0.7,
    echo     "max_tokens": 2048
    echo   },
    echo   "embeddings_model": {
    echo     "path": "./models/all-MiniLM-L6-v2.bin",
    echo     "type": "sentence-transformers",
    echo     "model_name": "sentence-transformers/all-MiniLM-L6-v2"
    echo   },
    echo   "vector_store": {
    echo     "type": "chroma",
    echo     "persist_directory": "./data/vectorstore"
    echo   }
    echo }
) > model_config.json

echo ✅ Configuración de modelos creada

REM Crear directorio para vector store
if not exist "..\data\vectorstore" mkdir ..\data\vectorstore

echo.
echo 🎉 ¡Modelos descargados exitosamente!
echo ================================================
echo 📁 Ubicación: backend\models\
echo 📊 LLaMA 2 7B Chat: llama-2-7b-chat.q4_0.gguf
echo 🔍 Embeddings: all-MiniLM-L6-v2.bin
echo ⚙️  Configuración: model_config.json
echo.
echo 💡 Para usar los modelos:
echo    set LLAMA_MODEL_PATH=.\models\llama-2-7b-chat.q4_0.gguf
echo    python backend\app.py
echo.
echo ⚠️  Nota: Los modelos requieren al menos 8GB de RAM
echo.
pause