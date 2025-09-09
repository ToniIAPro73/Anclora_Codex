# ⚓ Anclora Cortex - Análisis de Negocio con IA

Plataforma híbrida (SaaS + PWA) de análisis de negocio con inteligencia artificial, diseñada para SaaS, e-commerce, negocios locales y proyectos de emprendimiento.

## 🚀 Características Principales

- **Análisis Inteligente**: Evaluación completa de tu negocio con recomendaciones accionables
- **PWA (Progressive Web App)**: Instalable en dispositivos móviles y desktop
- **Análisis Offline**: Funciona sin conexión a internet
- **Múltiples Tipos de Negocio**: SaaS, E-commerce, Negocio Local, Startups
- **Reportes Descargables**: Exporta análisis completos en formato JSON
- **Interfaz Moderna**: Diseño siguiendo la guía visual de Anclora Press

## 🎨 Diseño y Marca

Anclora Cortex sigue la guía visual oficial de **Anclora Press** con:

- **Paleta de colores**: Azul profundo (#23436B), Azul claro (#2EAFC4), Ámbar suave (#FFC979)
- **Tipografía**: Libre Baskerville (títulos), Inter (interfaz), JetBrains Mono (código)
- **Principios**: Calma competente y pragmatismo empático
- **Sistema de espaciado**: Grid 8pt para consistencia visual

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 19** con Vite
- **Tailwind CSS** para estilos
- **FontAwesome** para iconografía
- **PWA** con Service Worker
- **Supabase** para autenticación

### Backend
- **Flask** (Python)
- **LangChain** + **Llama.cpp** para IA local
- **Sistema Multi-Agente** especializado
- **Supabase** para base de datos
- **JWT** para autenticación
- **CORS** habilitado

### Infraestructura
- **Docker** y Docker Compose
- **PostgreSQL** como base de datos
- **N8N** para orquestación de workflows
- **ChromaDB** para almacenamiento vectorial
- **Nginx** (configuración incluida)

## 📦 Instalación y Configuración

### Prerrequisitos
- Docker y Docker Compose
- Node.js 18+ (para desarrollo local)
- Python 3.9+ (para desarrollo local)

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/anclora-cortex.git
cd anclora-cortex
```

### 2. Configurar variables de entorno
```bash
# Copiar archivo de ejemplo
cp docker/.env.example docker/.env

# Editar variables de entorno
nano docker/.env
```

### 3. Ejecutar con Docker
```bash
# Construir y ejecutar todos los servicios
docker-compose -f docker/docker-compose.yml up --build

# O ejecutar en segundo plano
docker-compose -f docker/docker-compose.yml up -d
```

### 4. Acceder a la aplicación
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **N8N Workflows**: http://localhost:5678 (admin/anclora2025)
- **Base de datos**: localhost:5432

## 🔧 Desarrollo Local

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
pip install -r requirements.txt
python app.py
```

## 📱 Funcionalidades PWA

### Instalación
1. Visita la aplicación en tu navegador
2. Busca el ícono de "Instalar" en la barra de direcciones
3. Sigue las instrucciones para instalar en tu dispositivo

### Características PWA
- ✅ Funciona offline
- ✅ Instalable en móviles y desktop
- ✅ Notificaciones push
- ✅ Sincronización en segundo plano
- ✅ Accesos directos personalizados

## 🤖 Sistema de Agentes de IA

Anclora Cortex utiliza un **sistema de agentes especializados** que trabajan de forma orquestada para realizar análisis completos de negocio:

### **Agentes Especializados**
1. **MarketResearchAgent** 📊 - Investigación de mercado y tendencias
2. **CompetitorAnalysisAgent** 🏆 - Análisis de competencia y posicionamiento  
3. **TechnicalAnalysisAgent** 🔧 - Evaluación técnica y de producto
4. **RecommendationAgent** 💡 - Síntesis y recomendaciones accionables

### **Workflow de Análisis**
```
Usuario → Datos → [Agentes Paralelos] → Síntesis → Recomendaciones → Reporte
   ↓         ↓            ↓               ↓            ↓            ↓
  3 pasos   Validación   45-60s        Contexto    Roadmap     Descarga
```

## � Sistemia de IA Multi-Agente

### Arquitectura de Agentes Especializados

Anclora Cortex utiliza un sistema de agentes de IA especializados, cada uno experto en un aspecto específico del análisis de negocio:

#### 🚀 **SaaS Analysis Agent**
- Especialista en métricas SaaS (MRR, Churn, CAC, LTV)
- Estrategias de conversión y retención
- Optimización de pricing y upselling

#### 🛒 **E-commerce Analysis Agent**  
- Experto en conversión y AOV
- Reducción de abandono de carrito
- Estrategias de customer retention

#### 🏪 **Local Business Analysis Agent**
- SEO local y presencia digital
- Optimización de Google My Business
- Estrategias de community engagement

#### 🔍 **Competitor Analysis Agent**
- Inteligencia competitiva
- Análisis de positioning
- Identificación de ventajas competitivas

#### 📊 **Market Research Agent**
- Investigación de mercado
- Análisis de tendencias
- Oportunidades de crecimiento

### Motor de IA Local
- **LangChain**: Framework para aplicaciones de IA
- **Llama.cpp**: Ejecución eficiente de modelos LLaMA
- **ChromaDB**: Base de datos vectorial para conocimiento
- **N8N**: Orquestación de workflows de IA

## 🧠 Análisis con IA

### Tipos de Análisis Soportados

#### SaaS
- Optimización de conversión
- Reducción de churn
- Crecimiento de revenue
- Métricas: Conversion Rate, Monthly Churn, ARPU, CAC Payback

#### E-commerce
- Optimización de conversión
- Gestión de inventario
- Customer experience
- Métricas: Conversion Rate, AOV, Cart Abandonment, Customer LTV

#### Negocio Local
- Presencia digital local
- Customer retention
- Optimización operacional
- Métricas: Local Search Ranking, Repeat Customer Rate, Average Transaction

#### Startup/Emprendimiento
- Product-market fit
- Go-to-market strategy
- Preparación para fundraising
- Métricas: PMF Score, Monthly Growth Rate, CAC, Runway

### Proceso de Análisis con Agentes
1. **Información Básica**: Tipo de negocio, nombre, sitio web
2. **Descripción**: Productos/servicios y desafíos actuales  
3. **Objetivos**: Metas a corto y largo plazo
4. **Análisis Orquestado**: 4 agentes especializados trabajan en paralelo
   - 📊 Investigación de mercado (TAM, SAM, tendencias)
   - 🏆 Análisis de competencia (gaps, pricing, posicionamiento)
   - 🔧 Evaluación técnica (SEO, performance, UX)
   - 💡 Síntesis y recomendaciones (roadmap, herramientas, ROI)
5. **Reporte Completo**: Análisis detallado con plan de implementación

### Recomendaciones Específicas Incluyen
- **Herramientas de Marketing**: HubSpot, SEMrush, Mailchimp, Google Analytics
- **Estrategia de Precios**: Modelos de pricing, optimización de revenue
- **Mejoras de Landing Page**: UX/UI, conversión, elementos técnicos
- **Plan de Implementación**: Roadmap por fases con presupuestos y timelines
- **Métricas y KPIs**: Objetivos específicos por tipo de negocio

## 🔐 Autenticación y Seguridad

- **Supabase Auth**: Registro y login seguro
- **JWT Tokens**: Autenticación stateless
- **CORS**: Configurado para desarrollo y producción
- **Modo Demo**: Funcionalidad offline sin registro

## 📊 API Endpoints

### Autenticación
- `POST /signup` - Registro de usuario
- `POST /login` - Inicio de sesión
- `POST /forgot-password` - Recuperar contraseña
- `POST /verify-otp` - Verificar código SMS

### Análisis Principal
- `POST /analyze` - Crear nuevo análisis (requiere auth)
- `POST /analyze-demo` - Análisis sin autenticación
- `GET /analyses` - Obtener análisis del usuario (requiere auth)
- `GET /profile` - Perfil del usuario (requiere auth)

### Agentes de IA Especializados
- `POST /ai/analyze-saas` - Análisis SaaS especializado
- `POST /ai/analyze-ecommerce` - Análisis E-commerce especializado
- `POST /ai/analyze-local` - Análisis negocio local especializado
- `POST /ai/competitor-analysis` - Análisis de competencia
- `POST /ai/market-research` - Investigación de mercado
- `POST /ai/comprehensive-analysis` - Análisis completo multi-agente

### Orquestación
- `POST /save-analysis` - Guardar análisis (usado por N8N)

### Salud
- `GET /` - Estado de la API

## 🚀 Despliegue en Producción

### Docker Production
```bash
# Construir para producción
docker-compose -f docker/docker-compose.prod.yml up --build -d
```

### Variables de Entorno Producción
```env
NODE_ENV=production
SUPABASE_URL=tu_supabase_url
SUPABASE_KEY=tu_supabase_key
SECRET_KEY=tu_secret_key_segura
DATABASE_URL=postgresql://user:pass@host:5432/db
```

## 🧪 Testing

### Frontend
```bash
cd frontend
npm run test
npm run test:coverage
```

### Backend
```bash
cd backend
python -m pytest
python -m pytest --cov=app
```

## 📈 Métricas y Monitoreo

La aplicación incluye métricas integradas para:
- Análisis completados
- Tiempo de respuesta
- Errores de API
- Uso de PWA
- Conversiones de usuario

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 🆘 Soporte

- **Documentación**: [docs.anclora.com/cortex](https://docs.anclora.com/cortex)
- **Issues**: [GitHub Issues](https://github.com/tu-usuario/anclora-cortex/issues)
- **Email**: soporte@anclora.com

## 🎯 Roadmap

### v1.1 (Próximo)
- [ ] Modelos LLaMA más grandes (13B, 70B)
- [ ] Agentes adicionales (SEO, Social Media, Finance)
- [ ] Workflows N8N más complejos
- [ ] Dashboard de métricas en tiempo real
- [ ] Exportación a PDF

### v1.2 (Futuro)
- [ ] Integración con APIs externas (Google Analytics, etc.)
- [ ] Fine-tuning de modelos con datos específicos
- [ ] Análisis de sentiment avanzado
- [ ] Modo colaborativo multi-usuario
- [ ] API pública para terceros

---

**Desarrollado con ❤️ por el equipo de Anclora**

*"En un mar de ruido y herramientas desconectadas, Anclora ofrece el punto de anclaje"*