import React, { useState } from 'react'
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
  faTimes
} from '@fortawesome/free-solid-svg-icons'
import '../styles/AncloraCortex.css'

const AncloraCortex = () => {
  const [showLogin, setShowLogin] = useState(false)
  const [showSignup, setShowSignup] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="anclora-cortex">
      {/* Navigation */}
      <nav className="bg-white shadow-sm fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-libre font-bold text-azul-principal">⚓ Anclora Cortex</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-azul-principal transition">Características</a>
              <a href="#pricing" className="text-gray-600 hover:text-azul-principal transition">Precios</a>
              <button 
                onClick={() => setShowLogin(true)} 
                className="text-azul-claro hover:text-azul-principal transition"
              >
                Iniciar Sesión
              </button>
              <button 
                onClick={() => setShowSignup(true)} 
                className="action-gradient text-white px-6 py-2 rounded-lg font-semibold"
              >
                Registrarse
              </button>
            </div>
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-600"
              >
                <FontAwesomeIcon icon={faBars} className="text-xl" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Siguiendo el Design System Anclora */}
      <section className="hero-gradient pt-20 pb-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-libre font-bold mb-6 leading-tight">
              Potencia tu negocio con <span className="text-ambar-suave">IA</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-95 leading-relaxed">
              En un mar de ruido y herramientas desconectadas, Anclora Cortex ofrece el punto de anclaje para tu análisis de negocio.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setShowSignup(true)}
                className="action-gradient px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <FontAwesomeIcon icon={faRocket} className="mr-2" />
                Comenzar Gratis
              </button>
              <button className="border-2 border-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-azul-principal transition-all duration-300">
                Ver Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gris-claro">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-libre font-bold text-negro-azulado mb-4">
              Análisis inteligente que conecta tus datos
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Diseñamos con <strong>calma competente</strong> y <em>pragmatismo empático</em>: lo esencial por encima del adorno.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="feature-card text-center">
              <div className="w-16 h-16 action-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                <FontAwesomeIcon icon={faChartLine} className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Análisis Predictivo</h3>
              <p className="text-gray-600">
                Predice tendencias y comportamientos futuros con algoritmos de machine learning avanzados.
              </p>
            </div>
            
            <div className="feature-card text-center">
              <div className="w-16 h-16 action-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                <FontAwesomeIcon icon={faBrain} className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">IA Conversacional</h3>
              <p className="text-gray-600">
                Interactúa con tus datos usando lenguaje natural y obtén insights instantáneos.
              </p>
            </div>
            
            <div className="feature-card text-center">
              <div className="w-16 h-16 action-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                <FontAwesomeIcon icon={faShieldAlt} className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Seguridad Avanzada</h3>
              <p className="text-gray-600">
                Protección de datos de nivel empresarial con encriptación end-to-end.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Business Types Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-libre font-bold text-negro-azulado mb-4">
              Perfecto para tu tipo de negocio
            </h2>
            <div className="max-w-3xl mx-auto bg-white border-l-4 border-azul-claro rounded-r-xl p-6 shadow-sm">
              <p className="text-lg font-libre italic text-azul-claro leading-relaxed">
                "No prometemos cambiar tu vida. Prometemos devolverte el control sobre tu trabajo."
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl hover:shadow-lg transition">
              <FontAwesomeIcon icon={faUsers} className="text-5xl text-azul-claro mb-6" />
              <h3 className="text-2xl font-semibold mb-4">SaaS</h3>
              <p className="text-gray-600">
                Optimiza métricas clave, reduce churn y acelera el crecimiento de tu software como servicio.
              </p>
            </div>
            
            <div className="text-center p-8 rounded-2xl hover:shadow-lg transition">
              <FontAwesomeIcon icon={faStore} className="text-5xl text-azul-claro mb-6" />
              <h3 className="text-2xl font-semibold mb-4">E-commerce</h3>
              <p className="text-gray-600">
                Aumenta conversiones, optimiza inventario y mejora la experiencia del cliente.
              </p>
            </div>
            
            <div className="text-center p-8 rounded-2xl hover:shadow-lg transition">
              <FontAwesomeIcon icon={faBuilding} className="text-5xl text-azul-claro mb-6" />
              <h3 className="text-2xl font-semibold mb-4">Negocio Local</h3>
              <p className="text-gray-600">
                Atrae más clientes locales y optimiza operaciones con insights basados en datos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gris-claro">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-libre font-bold text-negro-azulado mb-4">
              Planes que se adaptan a ti
            </h2>
            <p className="text-xl text-gray-600">
              Comienza gratis y escala según tus necesidades
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Plan Básico */}
            <div className="pricing-card bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">Básico</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-gray-600">/mes</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <FontAwesomeIcon icon={faCheck} className="text-green-500 mr-3" />
                  Hasta 1,000 análisis/mes
                </li>
                <li className="flex items-center">
                  <FontAwesomeIcon icon={faCheck} className="text-green-500 mr-3" />
                  Dashboards básicos
                </li>
                <li className="flex items-center">
                  <FontAwesomeIcon icon={faCheck} className="text-green-500 mr-3" />
                  Soporte por email
                </li>
              </ul>
              <button className="w-full border-2 border-azul-principal text-azul-principal py-3 rounded-lg font-semibold hover:bg-azul-principal hover:text-white transition">
                Comenzar Gratis
              </button>
            </div>

            {/* Plan Pro */}
            <div className="pricing-card popular bg-white rounded-2xl p-8 shadow-lg relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-azul-claro text-white px-4 py-1 rounded-full text-sm font-semibold">
                Más Popular
              </div>
              <h3 className="text-2xl font-semibold mb-4">Pro</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">$49</span>
                <span className="text-gray-600">/mes</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <FontAwesomeIcon icon={faCheck} className="text-green-500 mr-3" />
                  Análisis ilimitados
                </li>
                <li className="flex items-center">
                  <FontAwesomeIcon icon={faCheck} className="text-green-500 mr-3" />
                  IA conversacional
                </li>
                <li className="flex items-center">
                  <FontAwesomeIcon icon={faCheck} className="text-green-500 mr-3" />
                  Integraciones avanzadas
                </li>
                <li className="flex items-center">
                  <FontAwesomeIcon icon={faCheck} className="text-green-500 mr-3" />
                  Soporte prioritario
                </li>
              </ul>
              <button className="w-full action-gradient text-white py-3 rounded-lg font-semibold hover:shadow-lg transition">
                Comenzar Prueba
              </button>
            </div>

            {/* Plan Enterprise */}
            <div className="pricing-card bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">Enterprise</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">$199</span>
                <span className="text-gray-600">/mes</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <FontAwesomeIcon icon={faCheck} className="text-green-500 mr-3" />
                  Todo en Pro
                </li>
                <li className="flex items-center">
                  <FontAwesomeIcon icon={faCheck} className="text-green-500 mr-3" />
                  API personalizada
                </li>
                <li className="flex items-center">
                  <FontAwesomeIcon icon={faCheck} className="text-green-500 mr-3" />
                  Soporte dedicado
                </li>
                <li className="flex items-center">
                  <FontAwesomeIcon icon={faCheck} className="text-green-500 mr-3" />
                  SLA garantizado
                </li>
              </ul>
              <button className="w-full border-2 border-azul-principal text-azul-principal py-3 rounded-lg font-semibold hover:bg-azul-principal hover:text-white transition">
                Contactar Ventas
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Estilo Anclora Design System */}
      <footer className="bg-negro-azulado text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-azul-claro to-ambar-suave rounded-xl flex items-center justify-center text-2xl">
                ⚓
              </div>
              <div>
                <div className="text-2xl font-libre font-bold">ANCLORA</div>
                <div className="text-sm opacity-75">Cortex v1.0</div>
              </div>
            </div>
            <p className="text-gray-300 mb-8 text-lg">
              Análisis de negocio con IA • Parte del ecosistema Anclora
            </p>
            <div className="border-t border-gray-600 pt-8">
              <p className="text-gray-400">
                © 2025 Anclora Cortex. Diseñado con el Sistema Visual Anclora v5.0
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal de Login */}
      {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Iniciar Sesión</h2>
              <button 
                onClick={() => setShowLogin(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-azul-claro focus:border-transparent"
                  placeholder="tu@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contraseña
                </label>
                <input 
                  type="password" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-azul-claro focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>
              <button 
                type="submit"
                className="w-full action-gradient text-white py-3 rounded-lg font-semibold hover:shadow-lg transition"
              >
                Iniciar Sesión
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Signup */}
      {showSignup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Registrarse</h2>
              <button 
                onClick={() => setShowSignup(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre completo
                </label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-azul-claro focus:border-transparent"
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-azul-claro focus:border-transparent"
                  placeholder="tu@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contraseña
                </label>
                <input 
                  type="password" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-azul-claro focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>
              <button 
                type="submit"
                className="w-full action-gradient text-white py-3 rounded-lg font-semibold hover:shadow-lg transition"
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