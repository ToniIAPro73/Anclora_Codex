// Servicio para análisis de negocio con IA
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://api.ancloracortex.com' 
  : 'http://localhost:5000'

class AnalysisService {
  async analyzeBusinessData(businessData) {
    try {
      const response = await fetch(`${API_BASE_URL}/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(businessData)
      })

      if (!response.ok) {
        throw new Error('Error en el análisis')
      }

      return await response.json()
    } catch (error) {
      console.error('Error analyzing business:', error)
      throw error
    }
  }

  async getUserAnalyses() {
    try {
      const response = await fetch(`${API_BASE_URL}/analyses`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })

      if (!response.ok) {
        throw new Error('Error obteniendo análisis')
      }

      return await response.json()
    } catch (error) {
      console.error('Error fetching analyses:', error)
      throw error
    }
  }

  // Análisis offline con IA simulada
  generateOfflineAnalysis(businessData) {
    const { businessType, businessName, description, currentChallenges, goals } = businessData

    // Simulación de análisis basado en tipo de negocio
    const analysisTemplates = {
      saas: {
        score: Math.floor(Math.random() * 20) + 70, // 70-90
        recommendations: [
          {
            category: "Optimización de Conversión",
            priority: "Alta",
            impact: "25-40% aumento en conversiones",
            actions: [
              "Implementar onboarding interactivo con progress tracking",
              "Optimizar landing page con social proof y testimonios",
              "Crear free trial extendido con features premium limitadas"
            ]
          },
          {
            category: "Reducción de Churn",
            priority: "Alta", 
            impact: "30% reducción en cancelaciones",
            actions: [
              "Implementar sistema de alertas tempranas de churn",
              "Crear programa de customer success proactivo",
              "Desarrollar feature adoption tracking y nudges"
            ]
          },
          {
            category: "Crecimiento de Revenue",
            priority: "Media",
            impact: "20% aumento en ARPU",
            actions: [
              "Implementar pricing basado en valor y uso",
              "Crear tiers premium con features avanzadas",
              "Desarrollar programa de upselling automatizado"
            ]
          }
        ],
        kpis: [
          { name: "Conversion Rate", current: "2.1%", target: "3.8%", improvement: "+81%" },
          { name: "Monthly Churn", current: "7.2%", target: "4.5%", improvement: "-38%" },
          { name: "ARPU", current: "$89", target: "$127", improvement: "+43%" },
          { name: "CAC Payback", current: "8.2 meses", target: "5.1 meses", improvement: "-38%" }
        ]
      },
      ecommerce: {
        score: Math.floor(Math.random() * 25) + 65,
        recommendations: [
          {
            category: "Optimización de Conversión",
            priority: "Alta",
            impact: "35% aumento en conversiones",
            actions: [
              "Implementar abandoned cart recovery con secuencia de emails",
              "Optimizar checkout process reduciendo pasos a 2-3",
              "Agregar reviews y ratings prominentes en product pages"
            ]
          },
          {
            category: "Gestión de Inventario",
            priority: "Media",
            impact: "20% reducción en costos",
            actions: [
              "Implementar sistema de forecasting con IA",
              "Optimizar stock levels basado en seasonality",
              "Crear alertas automáticas de restock"
            ]
          },
          {
            category: "Customer Experience",
            priority: "Alta",
            impact: "40% aumento en repeat purchases",
            actions: [
              "Implementar chatbot para soporte 24/7",
              "Crear programa de loyalty con rewards",
              "Personalizar product recommendations con ML"
            ]
          }
        ],
        kpis: [
          { name: "Conversion Rate", current: "1.8%", target: "2.9%", improvement: "+61%" },
          { name: "Average Order Value", current: "$67", target: "$89", improvement: "+33%" },
          { name: "Cart Abandonment", current: "69%", target: "52%", improvement: "-25%" },
          { name: "Customer LTV", current: "$156", target: "$218", improvement: "+40%" }
        ]
      },
      local: {
        score: Math.floor(Math.random() * 30) + 60,
        recommendations: [
          {
            category: "Presencia Digital Local",
            priority: "Alta",
            impact: "50% más visibilidad local",
            actions: [
              "Optimizar Google My Business con fotos y reviews",
              "Implementar SEO local con keywords geográficas",
              "Crear contenido local relevante y actualizado"
            ]
          },
          {
            category: "Customer Retention",
            priority: "Media",
            impact: "30% aumento en repeat customers",
            actions: [
              "Implementar programa de loyalty local",
              "Crear sistema de referidos con incentivos",
              "Desarrollar email marketing segmentado"
            ]
          },
          {
            category: "Operaciones",
            priority: "Media",
            impact: "25% mejora en eficiencia",
            actions: [
              "Implementar sistema de reservas online",
              "Optimizar horarios basado en traffic patterns",
              "Crear dashboard de métricas operacionales"
            ]
          }
        ],
        kpis: [
          { name: "Local Search Ranking", current: "#8", target: "#3", improvement: "+63%" },
          { name: "Repeat Customer Rate", current: "23%", target: "35%", improvement: "+52%" },
          { name: "Average Transaction", current: "$34", target: "$45", improvement: "+32%" },
          { name: "Customer Acquisition Cost", current: "$28", target: "$19", improvement: "-32%" }
        ]
      },
      startup: {
        score: Math.floor(Math.random() * 35) + 55,
        recommendations: [
          {
            category: "Product-Market Fit",
            priority: "Alta",
            impact: "Validación de mercado",
            actions: [
              "Implementar customer development interviews",
              "Crear MVP con core features validadas",
              "Desarrollar métricas de product-market fit"
            ]
          },
          {
            category: "Go-to-Market Strategy",
            priority: "Alta",
            impact: "Aceleración de crecimiento",
            actions: [
              "Definir ICP (Ideal Customer Profile) detallado",
              "Crear content marketing strategy",
              "Implementar growth hacking experiments"
            ]
          },
          {
            category: "Fundraising Preparation",
            priority: "Media",
            impact: "Preparación para inversión",
            actions: [
              "Crear financial model y projections",
              "Desarrollar pitch deck compelling",
              "Establecer métricas clave para investors"
            ]
          }
        ],
        kpis: [
          { name: "Product-Market Fit Score", current: "6.2/10", target: "8.5/10", improvement: "+37%" },
          { name: "Monthly Growth Rate", current: "12%", target: "25%", improvement: "+108%" },
          { name: "Customer Acquisition Cost", current: "$67", target: "$42", improvement: "-37%" },
          { name: "Runway", current: "8 meses", target: "14 meses", improvement: "+75%" }
        ]
      }
    }

    const template = analysisTemplates[businessType] || analysisTemplates.startup
    
    return {
      businessType,
      businessName,
      summary: `Análisis completado para ${businessName}. Identificamos ${template.recommendations.length} áreas clave de mejora con potencial de impacto significativo.`,
      score: template.score,
      recommendations: template.recommendations,
      kpis: template.kpis,
      timeline: businessType === 'startup' ? "2-4 meses para validación inicial" : "3-6 meses para implementación completa",
      estimatedROI: `${Math.floor(Math.random() * 100) + 150}%`,
      generatedAt: new Date().toISOString(),
      analysisType: 'offline_simulation'
    }
  }

  // Generar recomendaciones específicas basadas en desafíos
  generateChallengeBasedRecommendations(challenges, businessType) {
    const challengeKeywords = challenges.toLowerCase()
    const recommendations = []

    // Análisis de palabras clave en desafíos
    if (challengeKeywords.includes('tráfico') || challengeKeywords.includes('visitas')) {
      recommendations.push({
        category: "Generación de Tráfico",
        priority: "Alta",
        impact: "40% aumento en tráfico orgánico",
        actions: [
          "Implementar estrategia de SEO técnico y contenido",
          "Crear campaña de Google Ads optimizada",
          "Desarrollar content marketing con blog regular"
        ]
      })
    }

    if (challengeKeywords.includes('conversión') || challengeKeywords.includes('ventas')) {
      recommendations.push({
        category: "Optimización de Conversión",
        priority: "Alta", 
        impact: "25% aumento en conversiones",
        actions: [
          "Implementar A/B testing en landing pages",
          "Optimizar funnel de conversión",
          "Agregar elementos de urgencia y escasez"
        ]
      })
    }

    if (challengeKeywords.includes('competencia') || challengeKeywords.includes('diferenciación')) {
      recommendations.push({
        category: "Diferenciación Competitiva",
        priority: "Media",
        impact: "Mejor posicionamiento de marca",
        actions: [
          "Desarrollar propuesta de valor única",
          "Crear análisis competitivo detallado",
          "Implementar estrategia de branding diferenciada"
        ]
      })
    }

    return recommendations
  }
}

export default new AnalysisService()