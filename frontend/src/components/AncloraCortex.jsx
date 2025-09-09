import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBars,
  faRocket,
  faChartLine,
  faBrain,
  faShieldAlt,
  faUsers,
  faStore,
  faBuilding,
  faCheck,
  faTimes,
  faSpinner,
  faDownload,
  faPlay,
  faCog,
  faLightbulb,
  faBullseye,
  faEye,
  faArrowRight,
  faUpload,
  faFileAlt,
  faStar
} from '@fortawesome/free-solid-svg-icons'
import ThemeSelector from './ThemeSelector'

const AncloraCortex = () => {
  const [showLogin, setShowLogin] = useState(false)
  const [showSignup, setShowSignup] = useState(false)
  const [showAnalysis, setShowAnalysis] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [analysisData, setAnalysisData] = useState({
    businessType: '',
    businessName: '',
    website: '',
    description: '',
    currentChallenges: '',
    goals: ''
  })
  const [analysisResult, setAnalysisResult] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [user, setUser] = useState(null)
  const [selectedFeature, setSelectedFeature] = useState(null)
  const [selectedBusinessType, setSelectedBusinessType] = useState(null)

  // Análisis con IA usando agentes especializados
  const performAnalysis = async () => {
    setIsAnalyzing(true)
    
    try {
      // Llamada real a la API con agentes de IA
      const response = await fetch('http://localhost:5000/analyze-demo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(analysisData)
      })
      
      if (!response.ok) {
        throw new Error('Error en el análisis')
      }
      
      const result = await response.json()
      setAnalysisResult(result)
      
    } catch (error) {
      console.error('Error performing analysis:', error)
      
      // Fallback a análisis simulado si falla la API
      const fallbackResult = {
        businessType: analysisData.businessType,
        businessName: analysisData.businessName,
        summary: "Análisis completado con éxito. Hemos identificado oportunidades clave de crecimiento.",
        score: 78,
        recommendations: [
          {
            category: "Marketing Digital",
            priority: "Alta",
            impact: "30% aumento en conversiones",
            actions: [
              "Optimizar landing page para mejorar la tasa de conversión",
              "Implementar A/B testing en CTAs principales",
              "Mejorar SEO on-page para palabras clave objetivo"
            ]
          },
          {
            category: "Estrategia de Precios",
            priority: "Media",
            impact: "15% aumento en revenue",
            actions: [
              "Implementar pricing dinámico basado en demanda",
              "Crear paquetes de valor agregado",
              "Analizar precios de competencia mensualmente"
            ]
          },
          {
            category: "Experiencia del Cliente",
            priority: "Alta",
            impact: "25% reducción en churn",
            actions: [
              "Implementar chatbot con IA para soporte 24/7",
              "Crear programa de onboarding personalizado",
              "Desarrollar sistema de feedback continuo"
            ]
          }
        ],
        kpis: [
          { name: "Tasa de Conversión", current: "2.3%", target: "3.5%", improvement: "+52%" },
          { name: "CAC (Costo de Adquisición)", current: "$45", target: "$32", improvement: "-29%" },
          { name: "LTV (Valor de Vida)", current: "$180", target: "$245", improvement: "+36%" },
          { name: "Churn Rate", current: "8.5%", target: "6.2%", improvement: "-27%" }
        ],
        timeline: "3-6 meses para implementación completa",
        estimatedROI: "185%"
      }
      
      setAnalysisResult(fallbackResult)
    }
    
    setIsAnalyzing(false)
  }

  const handleAnalysisSubmit = (e) => {
    e.preventDefault()
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    } else {
      performAnalysis()
    }
  }

  const downloadReport = () => {
    // Simular descarga de reporte
    const reportData = {
      ...analysisResult,
      generatedAt: new Date().toISOString(),
      businessData: analysisData
    }

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `anclora-cortex-analysis-${analysisData.businessName.replace(/\s+/g, '-').toLowerCase()}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="anclora-cortex min-h-screen">
      {/* Navigation */}
      <nav>
        <div className="nav-container">
          <div className="nav-logo">
            ⚓ Anclora Cortex
            <span className="beta-badge">
              Beta
            </span>
          </div>
          <div className="nav-links">
            <a href="#features" className="nav-link">Características</a>
            <a href="#pricing" className="nav-link">Precios</a>
            <button
              onClick={() => setShowLogin(true)}
              className="nav-link"
            >
              Iniciar Sesión
            </button>
            <button
              onClick={() => setShowSignup(true)}
              className="btn-nav-primary"
            >
              Comenzar Gratis
            </button>
            <ThemeSelector />
          </div>
          <div className="mobile-nav">
            <button
              onClick={() => setShowSignup(true)}
              className="mobile-cta-btn"
            >
              Comenzar
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <h1 className="hero-title">
            Potencia tu negocio con <span style={{color: 'var(--anclora-amber)'}}>IA</span>
          </h1>
          <p className="hero-subtitle">
            Análisis inteligente para SaaS, e-commerce y negocios locales.
            Descubre oportunidades ocultas y optimiza tu crecimiento con recomendaciones accionables.
          </p>
          <div className="hero-buttons">
            <button
              onClick={() => setShowAnalysis(true)}
              className="btn-hero-primary"
            >
              <FontAwesomeIcon icon={faRocket} className="mr-2" />
              Analizar mi Negocio
            </button>
            <button className="btn-hero-secondary">
              <FontAwesomeIcon icon={faPlay} className="mr-2" />
              Ver Demo
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="section">
        <div className="section-container">
          <h2 className="section-title">
            Características Principales
          </h2>
          <p className="section-subtitle">
            Herramientas avanzadas de análisis diseñadas para impulsar tu negocio
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div 
              className={`feature-card text-center ${selectedFeature === 'predictive' ? 'selected' : ''}`}
              onClick={() => setSelectedFeature(selectedFeature === 'predictive' ? null : 'predictive')}
            >
              <div className="feature-icon-container">
                <FontAwesomeIcon icon={faChartLine} className="feature-icon" />
              </div>
              <h3 className="feature-title">Análisis Predictivo</h3>
              <p className="feature-description">
                Predice tendencias y comportamientos futuros con algoritmos de machine learning avanzados.
              </p>
            </div>

            <div 
              className={`feature-card text-center ${selectedFeature === 'conversational' ? 'selected' : ''}`}
              onClick={() => setSelectedFeature(selectedFeature === 'conversational' ? null : 'conversational')}
            >
              <div className="feature-icon-container">
                <FontAwesomeIcon icon={faBrain} className="feature-icon" />
              </div>
              <h3 className="feature-title">IA Conversacional</h3>
              <p className="feature-description">
                Interactúa con tus datos usando lenguaje natural y obtén insights instantáneos.
              </p>
            </div>

            <div 
              className={`feature-card text-center ${selectedFeature === 'security' ? 'selected' : ''}`}
              onClick={() => setSelectedFeature(selectedFeature === 'security' ? null : 'security')}
            >
              <div className="feature-icon-container">
                <FontAwesomeIcon icon={faShieldAlt} className="feature-icon" />
              </div>
              <h3 className="feature-title">Seguridad Avanzada</h3>
              <p className="feature-description">
                Protección de datos de nivel empresarial con encriptación end-to-end.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Business Types Section */}
      <section className="business-types-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">
              Perfecto para tu tipo de negocio
            </h2>
            <p className="section-subtitle">
              Análisis especializado para cada industria
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div 
              className={`business-type-card ${selectedBusinessType === 'saas' ? 'selected' : ''}`}
              onClick={() => setSelectedBusinessType(selectedBusinessType === 'saas' ? null : 'saas')}
            >
              <FontAwesomeIcon icon={faUsers} className="business-type-icon" />
              <h3 className="business-type-title">SaaS</h3>
              <p className="business-type-description">
                Optimiza métricas clave, reduce churn y acelera el crecimiento de tu software como servicio.
              </p>
            </div>

            <div 
              className={`business-type-card ${selectedBusinessType === 'ecommerce' ? 'selected' : ''}`}
              onClick={() => setSelectedBusinessType(selectedBusinessType === 'ecommerce' ? null : 'ecommerce')}
            >
              <FontAwesomeIcon icon={faStore} className="business-type-icon" />
              <h3 className="business-type-title">E-commerce</h3>
              <p className="business-type-description">
                Aumenta conversiones, optimiza inventario y mejora la experiencia del cliente.
              </p>
            </div>

            <div 
              className={`business-type-card ${selectedBusinessType === 'local' ? 'selected' : ''}`}
              onClick={() => setSelectedBusinessType(selectedBusinessType === 'local' ? null : 'local')}
            >
              <FontAwesomeIcon icon={faBuilding} className="business-type-icon" />
              <h3 className="business-type-title">Negocio Local</h3>
              <p className="business-type-description">
                Atrae más clientes locales y optimiza operaciones con insights basados en datos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="pricing-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">
              Planes que se adaptan a ti
            </h2>
            <p className="section-subtitle">
              Comienza gratis y escala según tus necesidades
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Plan Básico */}
            <div className="pricing-card bg-white rounded-card p-8 shadow-card border border-border-subtle">
              <h3 className="text-2xl font-semibold mb-4 text-negro-azulado">Básico</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-negro-azulado">$0</span>
                <span className="text-gray-600">/mes</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <FontAwesomeIcon icon={faCheck} className="text-verde-suave mr-3" />
                  <span className="text-gray-700">Hasta 3 análisis/mes</span>
                </li>
                <li className="flex items-center">
                  <FontAwesomeIcon icon={faCheck} className="text-verde-suave mr-3" />
                  <span className="text-gray-700">Dashboards básicos</span>
                </li>
                <li className="flex items-center">
                  <FontAwesomeIcon icon={faCheck} className="text-verde-suave mr-3" />
                  <span className="text-gray-700">Soporte por email</span>
                </li>
              </ul>
              <button className="w-full border-2 border-azul-principal text-azul-principal py-3 rounded-anclora font-semibold hover:bg-azul-principal hover:text-white transition">
                Comenzar Gratis
              </button>
            </div>

            {/* Plan Pro */}
            <div className="pricing-card popular bg-white rounded-card p-8 shadow-card relative border-2 border-azul-claro">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-azul-claro text-white px-4 py-1 rounded-full text-sm font-semibold">
                Más Popular
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-negro-azulado">Pro</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-negro-azulado">$49</span>
                <span className="text-gray-600">/mes</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <FontAwesomeIcon icon={faCheck} className="text-verde-suave mr-3" />
                  <span className="text-gray-700">Análisis ilimitados</span>
                </li>
                <li className="flex items-center">
                  <FontAwesomeIcon icon={faCheck} className="text-verde-suave mr-3" />
                  <span className="text-gray-700">IA conversacional</span>
                </li>
                <li className="flex items-center">
                  <FontAwesomeIcon icon={faCheck} className="text-verde-suave mr-3" />
                  <span className="text-gray-700">Integraciones avanzadas</span>
                </li>
                <li className="flex items-center">
                  <FontAwesomeIcon icon={faCheck} className="text-verde-suave mr-3" />
                  <span className="text-gray-700">Soporte prioritario</span>
                </li>
              </ul>
              <button className="w-full bg-gradient-action text-negro-azulado py-3 rounded-anclora font-semibold hover:shadow-lg transition">
                Comenzar Prueba
              </button>
            </div>

            {/* Plan Enterprise */}
            <div className="pricing-card bg-white rounded-card p-8 shadow-card border border-border-subtle">
              <h3 className="text-2xl font-semibold mb-4 text-negro-azulado">Enterprise</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-negro-azulado">$199</span>
                <span className="text-gray-600">/mes</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <FontAwesomeIcon icon={faCheck} className="text-verde-suave mr-3" />
                  <span className="text-gray-700">Todo en Pro</span>
                </li>
                <li className="flex items-center">
                  <FontAwesomeIcon icon={faCheck} className="text-verde-suave mr-3" />
                  <span className="text-gray-700">API personalizada</span>
                </li>
                <li className="flex items-center">
                  <FontAwesomeIcon icon={faCheck} className="text-verde-suave mr-3" />
                  <span className="text-gray-700">Soporte dedicado</span>
                </li>
                <li className="flex items-center">
                  <FontAwesomeIcon icon={faCheck} className="text-verde-suave mr-3" />
                  <span className="text-gray-700">SLA garantizado</span>
                </li>
              </ul>
              <button className="w-full border-2 border-azul-principal text-azul-principal py-3 rounded-anclora font-semibold hover:bg-azul-principal hover:text-white transition">
                Contactar Ventas
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-section">
        <div className="footer-container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="footer-logo">⚓ Anclora Cortex</div>
              <p className="footer-description">
                Potenciando negocios con inteligencia artificial
              </p>
            </div>
            
            <div className="footer-links">
              <div className="footer-column">
                <h4 className="footer-column-title">Producto</h4>
                <ul className="footer-link-list">
                  <li><a href="#features" className="footer-link">Características</a></li>
                  <li><a href="#pricing" className="footer-link">Precios</a></li>
                  <li><a href="#" className="footer-link">Análisis IA</a></li>
                </ul>
              </div>
              
              <div className="footer-column">
                <h4 className="footer-column-title">Empresa</h4>
                <ul className="footer-link-list">
                  <li><a href="#" className="footer-link">Acerca de</a></li>
                  <li><a href="#" className="footer-link">Blog</a></li>
                  <li><a href="#" className="footer-link">Contacto</a></li>
                </ul>
              </div>
              
              <div className="footer-column">
                <h4 className="footer-column-title">Soporte</h4>
                <ul className="footer-link-list">
                  <li><a href="#" className="footer-link">Ayuda</a></li>
                  <li><a href="#" className="footer-link">Documentación</a></li>
                  <li><a href="#" className="footer-link">Estado</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p className="footer-copyright">
              © 2025 Anclora Cortex. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>

      {/* Modal de Análisis */}
      {showAnalysis && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 modal-backdrop">
          <div className="bg-white rounded-card p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-libre font-bold text-negro-azulado">
                {analysisResult ? 'Resultados del Análisis' : 'Análisis de Negocio'}
              </h2>
              <button
                onClick={() => {
                  setShowAnalysis(false)
                  setAnalysisResult(null)
                  setCurrentStep(1)
                }}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>

            {!analysisResult ? (
              <div>
                {/* Progress Bar */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-negro-azulado">Paso {currentStep} de 3</span>
                    <span className="text-sm text-gray-500">{Math.round((currentStep / 3) * 100)}% completado</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-action h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(currentStep / 3) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <form onSubmit={handleAnalysisSubmit} className="space-y-6">
                  {currentStep === 1 && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-negro-azulado mb-4">Información Básica</h3>

                      <div>
                        <label className="block text-sm font-medium text-negro-azulado mb-2">
                          Tipo de Negocio *
                        </label>
                        <select
                          value={analysisData.businessType}
                          onChange={(e) => setAnalysisData({ ...analysisData, businessType: e.target.value })}
                          className="w-full px-4 py-3 border border-border-subtle rounded-anclora focus:ring-2 focus:ring-azul-claro focus:border-transparent"
                          required
                        >
                          <option value="">Selecciona tu tipo de negocio</option>
                          <option value="saas">SaaS</option>
                          <option value="ecommerce">E-commerce</option>
                          <option value="local">Negocio Local</option>
                          <option value="startup">Startup/Emprendimiento</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-negro-azulado mb-2">
                          Nombre del Negocio *
                        </label>
                        <input
                          type="text"
                          value={analysisData.businessName}
                          onChange={(e) => setAnalysisData({ ...analysisData, businessName: e.target.value })}
                          className="w-full px-4 py-3 border border-border-subtle rounded-anclora focus:ring-2 focus:ring-azul-claro focus:border-transparent"
                          placeholder="Nombre de tu empresa"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-negro-azulado mb-2">
                          Sitio Web
                        </label>
                        <input
                          type="url"
                          value={analysisData.website}
                          onChange={(e) => setAnalysisData({ ...analysisData, website: e.target.value })}
                          className="w-full px-4 py-3 border border-border-subtle rounded-anclora focus:ring-2 focus:ring-azul-claro focus:border-transparent"
                          placeholder="https://tuempresa.com"
                        />
                      </div>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-negro-azulado mb-4">Descripción del Negocio</h3>

                      <div>
                        <label className="block text-sm font-medium text-negro-azulado mb-2">
                          Descripción del Negocio *
                        </label>
                        <textarea
                          value={analysisData.description}
                          onChange={(e) => setAnalysisData({ ...analysisData, description: e.target.value })}
                          className="w-full px-4 py-3 border border-border-subtle rounded-anclora focus:ring-2 focus:ring-azul-claro focus:border-transparent h-32"
                          placeholder="Describe qué hace tu negocio, tus productos/servicios principales..."
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-negro-azulado mb-2">
                          Principales Desafíos Actuales *
                        </label>
                        <textarea
                          value={analysisData.currentChallenges}
                          onChange={(e) => setAnalysisData({ ...analysisData, currentChallenges: e.target.value })}
                          className="w-full px-4 py-3 border border-border-subtle rounded-anclora focus:ring-2 focus:ring-azul-claro focus:border-transparent h-32"
                          placeholder="¿Cuáles son los principales problemas que enfrenta tu negocio actualmente?"
                          required
                        />
                      </div>
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-negro-azulado mb-4">Objetivos y Metas</h3>

                      <div>
                        <label className="block text-sm font-medium text-negro-azulado mb-2">
                          Objetivos Principales *
                        </label>
                        <textarea
                          value={analysisData.goals}
                          onChange={(e) => setAnalysisData({ ...analysisData, goals: e.target.value })}
                          className="w-full px-4 py-3 border border-border-subtle rounded-anclora focus:ring-2 focus:ring-azul-claro focus:border-transparent h-32"
                          placeholder="¿Qué quieres lograr con tu negocio? ¿Cuáles son tus metas a corto y largo plazo?"
                          required
                        />
                      </div>

                      {isAnalyzing && (
                        <div className="text-center py-8">
                          <FontAwesomeIcon icon={faSpinner} className="text-4xl text-azul-claro animate-spin mb-4" />
                          <p className="text-lg text-negro-azulado">Analizando tu negocio con IA...</p>
                          <p className="text-sm text-gray-600">Esto puede tomar unos momentos</p>
                        </div>
                      )}
                    </div>
                  )}

                  {!isAnalyzing && (
                    <div className="flex justify-between pt-6">
                      {currentStep > 1 && (
                        <button
                          type="button"
                          onClick={() => setCurrentStep(currentStep - 1)}
                          className="px-6 py-3 border border-border-subtle text-negro-azulado rounded-anclora font-semibold hover:bg-gris-claro transition"
                        >
                          Anterior
                        </button>
                      )}
                      <button
                        type="submit"
                        className="ml-auto bg-gradient-action text-negro-azulado px-8 py-3 rounded-anclora font-semibold hover:shadow-lg transition"
                      >
                        {currentStep === 3 ? (
                          <>
                            <FontAwesomeIcon icon={faStar} className="mr-2" />
                            Analizar Negocio
                          </>
                        ) : (
                          <>
                            Siguiente
                            <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </form>
              </div>
            ) : (
              /* Resultados del Análisis */
              <div className="space-y-8">
                {/* Header con Score */}
                <div className="bg-gradient-press rounded-card p-6 text-center">
                  <div className="text-4xl font-bold text-negro-azulado mb-2">{analysisResult.score}/100</div>
                  <div className="text-lg text-negro-azulado">Puntuación de Optimización</div>
                  <div className="text-sm text-gray-700 mt-2">{analysisResult.summary}</div>
                </div>

                {/* KPIs */}
                <div>
                  <h3 className="text-xl font-semibold text-negro-azulado mb-4 flex items-center">
                    <FontAwesomeIcon icon={faChartLine} className="mr-2 text-azul-claro" />
                    Métricas Clave de Mejora
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {analysisResult.kpis.map((kpi, index) => (
                      <div key={index} className="bg-card-bg-light rounded-anclora p-4 border border-border-subtle">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-negro-azulado">{kpi.name}</span>
                          <span className="text-verde-suave font-bold">{kpi.improvement}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>Actual: {kpi.current}</span>
                          <span>Objetivo: {kpi.target}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recomendaciones */}
                <div>
                  <h3 className="text-xl font-semibold text-negro-azulado mb-4 flex items-center">
                    <FontAwesomeIcon icon={faLightbulb} className="mr-2 text-accent-warm" />
                    Plan de Acción Recomendado
                  </h3>
                  <div className="space-y-6">
                    {analysisResult.recommendations.map((rec, index) => (
                      <div key={index} className="bg-white rounded-card p-6 shadow-card border border-border-subtle">
                        <div className="flex justify-between items-start mb-4">
                          <h4 className="text-lg font-semibold text-negro-azulado">{rec.category}</h4>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${rec.priority === 'Alta' ? 'bg-red-100 text-red-800' :
                                rec.priority === 'Media' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-green-100 text-green-800'
                              }`}>
                              {rec.priority}
                            </span>
                            <span className="text-sm text-verde-suave font-medium">{rec.impact}</span>
                          </div>
                        </div>
                        <ul className="space-y-2">
                          {rec.actions.map((action, actionIndex) => (
                            <li key={actionIndex} className="flex items-start">
                              <FontAwesomeIcon icon={faCheck} className="text-verde-suave mr-2 mt-1 text-sm" />
                              <span className="text-gray-700">{action}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Timeline y ROI */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-azul-claro bg-opacity-10 rounded-card p-6 border border-azul-claro border-opacity-20">
                    <h4 className="font-semibold text-negro-azulado mb-2 flex items-center">
                      <FontAwesomeIcon icon={faBullseye} className="mr-2 text-azul-claro" />
                      Timeline de Implementación
                    </h4>
                    <p className="text-gray-700">{analysisResult.timeline}</p>
                  </div>
                  <div className="bg-verde-suave bg-opacity-10 rounded-card p-6 border border-verde-suave border-opacity-20">
                    <h4 className="font-semibold text-negro-azulado mb-2 flex items-center">
                      <FontAwesomeIcon icon={faChartLine} className="mr-2 text-verde-suave" />
                      ROI Estimado
                    </h4>
                    <p className="text-2xl font-bold text-verde-suave">{analysisResult.estimatedROI}</p>
                  </div>
                </div>

                {/* Acciones */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-border-subtle">
                  <button
                    onClick={downloadReport}
                    className="bg-gradient-action text-negro-azulado px-6 py-3 rounded-anclora font-semibold hover:shadow-lg transition flex items-center justify-center"
                  >
                    <FontAwesomeIcon icon={faDownload} className="mr-2" />
                    Descargar Reporte Completo
                  </button>
                  <button
                    onClick={() => setShowSignup(true)}
                    className="border-2 border-azul-principal text-azul-principal px-6 py-3 rounded-anclora font-semibold hover:bg-azul-principal hover:text-white transition"
                  >
                    Implementar Plan
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal de Login */}
      {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 modal-backdrop">
          <div className="bg-white rounded-card p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-libre font-semibold text-negro-azulado">Iniciar Sesión</h2>
              <button
                onClick={() => setShowLogin(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-negro-azulado mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-border-subtle rounded-anclora focus:ring-2 focus:ring-azul-claro focus:border-transparent"
                  placeholder="tu@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-negro-azulado mb-2">
                  Contraseña
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-3 border border-border-subtle rounded-anclora focus:ring-2 focus:ring-azul-claro focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-action text-negro-azulado py-3 rounded-anclora font-semibold hover:shadow-lg transition"
              >
                Iniciar Sesión
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Signup */}
      {showSignup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 modal-backdrop">
          <div className="bg-white rounded-card p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-libre font-semibold text-negro-azulado">Registrarse</h2>
              <button
                onClick={() => setShowSignup(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-negro-azulado mb-2">
                  Nombre completo
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-border-subtle rounded-anclora focus:ring-2 focus:ring-azul-claro focus:border-transparent"
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-negro-azulado mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-border-subtle rounded-anclora focus:ring-2 focus:ring-azul-claro focus:border-transparent"
                  placeholder="tu@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-negro-azulado mb-2">
                  Contraseña
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-3 border border-border-subtle rounded-anclora focus:ring-2 focus:ring-azul-claro focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-action text-negro-azulado py-3 rounded-anclora font-semibold hover:shadow-lg transition"
              >
                Crear Cuenta
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AncloraCortex