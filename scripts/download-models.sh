#!/bin/bash

# Script para descargar modelos de IA para Anclora Cortex
# Descarga modelos LLaMA optimizados para análisis de negocio

set -e

echo "🤖 Descargando modelos de IA para Anclora Cortex"
echo "================================================"

# Crear directorio de modelos
mkdir -p backend/models
cd backend/models

# Función para descargar con progreso
download_with_progress() {
    local url=$1
    local filename=$2
    echo "📥 Descargando $filename..."
    
    if command -v wget &> /dev/null; then
        wget --progress=bar:force:noscroll -O "$filename" "$url"
    elif command -v curl &> /dev/null; then
        curl -L --progress-bar -o "$filename" "$url"
    else
        echo "❌ Error: wget o curl requerido para descargar"
        exit 1
    fi
}

# Descargar modelo LLaMA 2 7B Chat (cuantizado para mejor rendimiento)
echo "🦙 Descargando LLaMA 2 7B Chat (GGUF)..."
if [ ! -f "llama-2-7b-chat.q4_0.gguf" ]; then
    download_with_progress \
        "https://huggingface.co/TheBloke/Llama-2-7B-Chat-GGUF/resolve/main/llama-2-7b-chat.q4_0.gguf" \
        "llama-2-7b-chat.q4_0.gguf"
    echo "✅ LLaMA 2 7B Chat descargado"
else
    echo "✅ LLaMA 2 7B Chat ya existe"
fi

# Descargar modelo de embeddings (más pequeño, para búsqueda semántica)
echo "🔍 Descargando modelo de embeddings..."
if [ ! -f "all-MiniLM-L6-v2.bin" ]; then
    download_with_progress \
        "https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2/resolve/main/pytorch_model.bin" \
        "all-MiniLM-L6-v2.bin"
    echo "✅ Modelo de embeddings descargado"
else
    echo "✅ Modelo de embeddings ya existe"
fi

# Crear archivo de configuración
cat > model_config.json << EOF
{
  "llama_model": {
    "path": "./models/llama-2-7b-chat.q4_0.gguf",
    "type": "llama-cpp",
    "context_length": 4096,
    "temperature": 0.7,
    "max_tokens": 2048
  },
  "embeddings_model": {
    "path": "./models/all-MiniLM-L6-v2.bin",
    "type": "sentence-transformers",
    "model_name": "sentence-transformers/all-MiniLM-L6-v2"
  },
  "vector_store": {
    "type": "chroma",
    "persist_directory": "./data/vectorstore"
  }
}
EOF

echo "✅ Configuración de modelos creada"

# Crear directorio para vector store
mkdir -p ../data/vectorstore

echo ""
echo "🎉 ¡Modelos descargados exitosamente!"
echo "================================================"
echo "📁 Ubicación: backend/models/"
echo "📊 LLaMA 2 7B Chat: llama-2-7b-chat.q4_0.gguf"
echo "🔍 Embeddings: all-MiniLM-L6-v2.bin"
echo "⚙️  Configuración: model_config.json"
echo ""
echo "💡 Para usar los modelos:"
echo "   export LLAMA_MODEL_PATH=./models/llama-2-7b-chat.q4_0.gguf"
echo "   python backend/app.py"
echo ""
echo "⚠️  Nota: Los modelos requieren al menos 8GB de RAM"