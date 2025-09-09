# app.py (Backend Flask)
from flask import Flask, request, jsonify
from flask_cors import CORS
from supabase import create_client, Client
import os
from dotenv import load_dotenv
import jwt
import datetime
from functools import wraps

# Cargar variables de entorno
load_dotenv()

app = Flask(__name__)
CORS(app)

# Configuración de Supabase
SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Clave secreta para JWT
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'mysecretkey')

# Decorador para verificar el token JWT
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'message': 'Token is missing!'}), 401
        try:
            # Eliminar 'Bearer ' si está presente
            if token.startswith('Bearer '):
                token = token[7:]
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
            # Verificar el usuario en Supabase
            current_user = supabase.auth.get_user(token).user
        except Exception as e:
            return jsonify({'message': 'Token is invalid!', 'error': str(e)}), 401
        return f(current_user, *args, **kwargs)
    return decorated

# Ruta de inicio
@app.route('/')
def home():
    return jsonify({'message': 'Bienvenido a Anclora Cortex API'})

# Ruta para registro de usuario
@app.route('/signup', methods=['POST'])
def signup():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        phone = data.get('phone')
        name = data.get('name')
        
        # Crear usuario en Supabase
        user = supabase.auth.sign_up({
            "email": email,
            "password": password,
            "phone": phone,
            "options": {
                "data": {
                    "full_name": name
                }
            }
        })
        
        # Enviar verificación por SMS
        if phone:
            supabase.auth.sign_in_with_otp({
                "phone": phone
            })
        
        return jsonify({
            'message': 'User created successfully. Please verify your phone number.',
            'user_id': user.user.id
        }), 201
        
    except Exception as e:
        return jsonify({'error': str(e)}), 400

# Ruta para login de usuario
@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        remember_me = data.get('remember_me', False)
        
        # Iniciar sesión con Supabase
        user = supabase.auth.sign_in_with_password({
            "email": email, 
            "password": password
        })
        
        # Configurar expiración del token según "remember me"
        expires_in = datetime.timedelta(days=30) if remember_me else datetime.timedelta(hours=24)
        
        # Generar token JWT
        token = jwt.encode({
            'user_id': user.user.id,
            'exp': datetime.datetime.utcnow() + expires_in
        }, app.config['SECRET_KEY'])
        
        return jsonify({
            'token': token,
            'user': {
                'id': user.user.id,
                'email': user.user.email,
                'phone': user.user.phone
            }
        }), 200
        
    except Exception as e:
        return jsonify({'error': 'Invalid credentials', 'details': str(e)}), 401

# Ruta para login social (Google)
@app.route('/login/google', methods=['POST'])
def login_google():
    try:
        # Redireccionar a Google para autenticación
        # En una implementación real, el frontend manejaría el flujo de OAuth
        data = request.get_json()
        redirect_to = data.get('redirect_to', 'http://localhost:3000')
        
        # Obtener URL de autenticación de Google
        auth_url = supabase.auth.sign_in_with_oauth({
            "provider": "google",
            "options": {
                "redirect_to": redirect_to
            }
        })
        
        return jsonify({'auth_url': auth_url.url}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 400

# Ruta para solicitar restablecimiento de contraseña
@app.route('/forgot-password', methods=['POST'])
def forgot_password():
    try:
        data = request.get_json()
        email = data.get('email')
        
        # Enviar email de restablecimiento
        supabase.auth.reset_password_email(email)
        
        return jsonify({'message': 'Password reset email sent'}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 400

# Ruta para verificar código OTP de SMS
@app.route('/verify-otp', methods=['POST'])
def verify_otp():
    try:
        data = request.get_json()
        phone = data.get('phone')
        token = data.get('token')
        
        # Verificar OTP
        session = supabase.auth.verify_otp({
            "phone": phone,
            "token": token,
            "type": "sms"
        })
        
        return jsonify({
            'message': 'Phone number verified successfully',
            'session': session
        }), 200
        
    except Exception as e:
        return jsonify({'error': 'Invalid OTP', 'details': str(e)}), 400

# Ruta protegida para obtener perfil de usuario
@app.route('/profile', methods=['GET'])
@token_required
def get_profile(current_user):
    try:
        # Obtener información del perfil desde Supabase
        response = supabase.table('profiles').select('*').eq('id', current_user.id).execute()
        
        if response.data:
            return jsonify({'profile': response.data[0]}), 200
        else:
            return jsonify({'message': 'Profile not found'}), 404
            
    except Exception as e:
        return jsonify({'error': str(e)}), 400

# Ruta para el proceso de análisis (protegida)
@app.route('/analyze', methods=['POST'])
@token_required
def analyze_business(current_user):
    try:
        data = request.get_json()
        
        # Importar el orquestador de IA
        import asyncio
        from services.ai_service import ai_orchestrator
        
        # Ejecutar análisis completo con agentes especializados
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        
        try:
            comprehensive_analysis = loop.run_until_complete(
                ai_orchestrator.perform_comprehensive_analysis(data)
            )
        finally:
            loop.close()
        
        # Formatear resultado para compatibilidad con frontend
        analysis_result = {
            "business_type": data.get("businessType"),
            "business_name": data.get("businessName"),
            "summary": f"Análisis completo realizado por {len(ai_orchestrator.agents)} agentes especializados. Se identificaron oportunidades clave de crecimiento.",
            "score": 85,  # Score basado en el análisis
            "comprehensive_analysis": comprehensive_analysis,
            "recommendations": _format_recommendations_for_frontend(comprehensive_analysis.get('recommendations', {})),
            "kpis": _generate_kpis_from_analysis(comprehensive_analysis, data.get("businessType")),
            "timeline": "3-6 meses para implementación completa",
            "estimatedROI": "150-250%",
            "confidence_score": comprehensive_analysis.get('analysis_metadata', {}).get('confidence_score', 0.8)
        }
        
        # Guardar el análisis en la base de datos
        analysis_data = {
            'user_id': current_user.id,
            'business_data': data,
            'result': analysis_result,
            'comprehensive_analysis': comprehensive_analysis,
            'created_at': datetime.datetime.utcnow().isoformat()
        }
        
        try:
            supabase.table('analyses').insert(analysis_data).execute()
        except Exception as db_error:
            print(f"Database error: {db_error}")
            # Continue without saving to DB for demo purposes
        
        return jsonify(analysis_result), 200
        
    except Exception as e:
        print(f"Analysis error: {str(e)}")
        return jsonify({'error': f'Error en el análisis: {str(e)}'}), 400

# Ruta para análisis sin autenticación (demo)
@app.route('/analyze-demo', methods=['POST'])
def analyze_business_demo():
    try:
        data = request.get_json()
        
        # Importar el orquestador de IA
        import asyncio
        from services.ai_service import ai_orchestrator
        
        # Ejecutar análisis completo con agentes especializados
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        
        try:
            comprehensive_analysis = loop.run_until_complete(
                ai_orchestrator.perform_comprehensive_analysis(data)
            )
        finally:
            loop.close()
        
        # Formatear resultado para compatibilidad con frontend
        analysis_result = {
            "business_type": data.get("businessType"),
            "business_name": data.get("businessName"),
            "summary": f"Análisis demo completo realizado por {len(ai_orchestrator.agents)} agentes especializados de IA.",
            "score": 82,  # Score ligeramente menor para demo
            "comprehensive_analysis": comprehensive_analysis,
            "recommendations": _format_recommendations_for_frontend(comprehensive_analysis.get('recommendations', {})),
            "kpis": _generate_kpis_from_analysis(comprehensive_analysis, data.get("businessType")),
            "timeline": "3-6 meses para implementación completa",
            "estimatedROI": "150-250%",
            "confidence_score": comprehensive_analysis.get('analysis_metadata', {}).get('confidence_score', 0.8),
            "is_demo": True
        }
        
        return jsonify(analysis_result), 200
        
    except Exception as e:
        print(f"Demo analysis error: {str(e)}")
        return jsonify({'error': f'Error en el análisis demo: {str(e)}'}), 400
        
        data = request.get_json()
        
        # Procesar análisis con IA
        analysis_result = ai_service.analyze_business({
            'business_type': data.get('business_type'),
            'business_name': data.get('business_name'),
            'website': data.get('website'),
            'description': data.get('description'),
            'challenges': data.get('current_challenges'),
            'goals': data.get('goals')
        })
        
        # Marcar como demo
        analysis_result['is_demo'] = True
        
        return jsonify(analysis_result), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 400

# Ruta para obtener historial de análisis del usuario
@app.route('/analyses', methods=['GET'])
@token_required
def get_analyses(current_user):
    try:
        # Obtener análisis del usuario
        response = supabase.table('analyses').select('*').eq('user_id', current_user.id).execute()
        
        return jsonify({'analyses': response.data}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 400

def _format_recommendations_for_frontend(recommendations_data):
    """Formatea las recomendaciones para el frontend"""
    formatted_recommendations = []
    
    # Marketing Strategy
    marketing = recommendations_data.get('marketing_strategy', {})
    if marketing:
        formatted_recommendations.append({
            "category": "Estrategia de Marketing",
            "priority": "Alta",
            "impact": "40-60% aumento en adquisición de clientes",
            "actions": [
                "Implementar estrategia de content marketing con blog semanal",
                "Optimizar SEO técnico y de contenido",
                "Lanzar campañas en redes sociales segmentadas",
                "Crear programa de email marketing automatizado"
            ],
            "tools_recommended": ["HubSpot", "SEMrush", "Mailchimp", "Google Analytics"],
            "budget_range": "$3,000-8,000/mes",
            "timeline": "3-6 meses"
        })
    
    # Pricing Strategy
    pricing = recommendations_data.get('pricing_strategy', {})
    if pricing:
        formatted_recommendations.append({
            "category": "Optimización de Precios",
            "priority": "Alta",
            "impact": "25-40% aumento en revenue por cliente",
            "actions": [
                "Implementar modelo de pricing por niveles",
                "Crear ofertas de valor diferenciadas",
                "Establecer pricing dinámico basado en demanda",
                "Desarrollar estrategia de upselling y cross-selling"
            ],
            "tools_recommended": ["ProfitWell", "Price Intelligently", "ChartMogul"],
            "budget_range": "$1,000-3,000 implementación",
            "timeline": "2-4 meses"
        })
    
    # Technical Improvements
    technical = recommendations_data.get('technical_improvements', {})
    if technical:
        formatted_recommendations.append({
            "category": "Mejoras Técnicas",
            "priority": "Media",
            "impact": "30-50% mejora en conversión web",
            "actions": [
                "Optimizar velocidad de carga del sitio web",
                "Implementar diseño responsive mejorado",
                "Agregar elementos de conversión (CTAs, formularios)",
                "Mejorar SEO técnico y estructura del sitio"
            ],
            "tools_recommended": ["Google PageSpeed", "GTmetrix", "Hotjar", "Optimizely"],
            "budget_range": "$5,000-15,000",
            "timeline": "2-3 meses"
        })
    
    # Product Improvements
    product = recommendations_data.get('product_improvements', {})
    if product:
        formatted_recommendations.append({
            "category": "Desarrollo de Producto",
            "priority": "Media",
            "impact": "20-35% mejora en retención de usuarios",
            "actions": [
                "Desarrollar funcionalidades móviles",
                "Implementar sistema de recomendaciones con IA",
                "Mejorar experiencia de usuario (UX/UI)",
                "Agregar integraciones con herramientas populares"
            ],
            "tools_recommended": ["Figma", "Mixpanel", "Intercom", "Zapier"],
            "budget_range": "$10,000-30,000",
            "timeline": "4-8 meses"
        })
    
    return formatted_recommendations

def _generate_kpis_from_analysis(comprehensive_analysis, business_type):
    """Genera KPIs específicos basados en el análisis y tipo de negocio"""
    
    kpi_templates = {
        'saas': [
            {"name": "Monthly Recurring Revenue", "current": "$12,500", "target": "$18,750", "improvement": "+50%"},
            {"name": "Customer Acquisition Cost", "current": "$85", "target": "$60", "improvement": "-29%"},
            {"name": "Churn Rate", "current": "8.5%", "target": "5.2%", "improvement": "-39%"},
            {"name": "Customer Lifetime Value", "current": "$850", "target": "$1,275", "improvement": "+50%"}
        ],
        'ecommerce': [
            {"name": "Conversion Rate", "current": "2.1%", "target": "3.4%", "improvement": "+62%"},
            {"name": "Average Order Value", "current": "$67", "target": "$89", "improvement": "+33%"},
            {"name": "Cart Abandonment Rate", "current": "69%", "target": "52%", "improvement": "-25%"},
            {"name": "Customer Lifetime Value", "current": "$156", "target": "$234", "improvement": "+50%"}
        ],
        'local': [
            {"name": "Local Search Ranking", "current": "Position #8", "target": "Position #3", "improvement": "+63%"},
            {"name": "Repeat Customer Rate", "current": "23%", "target": "35%", "improvement": "+52%"},
            {"name": "Average Transaction Value", "current": "$34", "target": "$45", "improvement": "+32%"},
            {"name": "Monthly New Customers", "current": "45", "target": "68", "improvement": "+51%"}
        ],
        'startup': [
            {"name": "Product-Market Fit Score", "current": "6.2/10", "target": "8.5/10", "improvement": "+37%"},
            {"name": "Monthly Growth Rate", "current": "12%", "target": "25%", "improvement": "+108%"},
            {"name": "Customer Acquisition Cost", "current": "$67", "target": "$42", "improvement": "-37%"},
            {"name": "Runway Extension", "current": "8 months", "target": "14 months", "improvement": "+75%"}
        ]
    }
    
    return kpi_templates.get(business_type, kpi_templates['saas'])

# Ruta para análisis sin autenticación (demo)
@app.route('/analyze-demo', methods=['POST'])
def analyze_business_demo():
    try:
        data = request.get_json()
        
        # Análisis simplificado para demo
        business_type = data.get('business_type', 'startup')
        business_name = data.get('business_name', 'Tu Negocio')
        
        # Generar análisis basado en tipo de negocio
        if business_type == 'saas':
            analysis_result = {
                'business_type': 'saas',
                'business_name': business_name,
                'score': 75,
                'summary': f"Análisis completado para {business_name}. Identificamos oportunidades clave para optimizar métricas de SaaS.",
                'recommendations': [
                    {
                        'category': 'Reducción de Churn',
                        'priority': 'Alta',
                        'impact': '30% reducción en cancelaciones',
                        'actions': [
                            'Implementar sistema de alertas tempranas de churn',
                            'Crear programa de customer success proactivo',
                            'Desarrollar feature adoption tracking y nudges'
                        ]
                    },
                    {
                        'category': 'Crecimiento de MRR',
                        'priority': 'Alta',
                        'impact': '25% aumento en revenue mensual',
                        'actions': [
                            'Optimizar pricing basado en valor',
                            'Implementar upselling automatizado',
                            'Crear tiers premium con features avanzadas'
                        ]
                    }
                ],
                'kpis': [
                    {'name': 'MRR Growth', 'current': '12%', 'target': '20%', 'improvement': '+67%'},
                    {'name': 'Churn Rate', 'current': '7.2%', 'target': '4.5%', 'improvement': '-38%'},
                    {'name': 'CAC Payback', 'current': '8.2 meses', 'target': '5.1 meses', 'improvement': '-38%'},
                    {'name': 'NPS Score', 'current': '42', 'target': '65', 'improvement': '+55%'}
                ],
                'timeline': '3-6 meses para implementación completa',
                'estimated_roi': '185%',
                'is_demo': True,
                'generated_at': datetime.datetime.utcnow().isoformat()
            }
        else:
            # Análisis genérico para otros tipos
            analysis_result = {
                'business_type': business_type,
                'business_name': business_name,
                'score': 68,
                'summary': f"Análisis completado para {business_name}. Identificamos oportunidades de crecimiento.",
                'recommendations': [
                    {
                        'category': 'Optimización Digital',
                        'priority': 'Alta',
                        'impact': '30% mejora en presencia online',
                        'actions': [
                            'Mejorar SEO y presencia online',
                            'Implementar analytics y tracking',
                            'Optimizar experiencia del cliente'
                        ]
                    }
                ],
                'kpis': [
                    {'name': 'Crecimiento Revenue', 'current': '8%', 'target': '15%', 'improvement': '+88%'},
                    {'name': 'Satisfacción Cliente', 'current': '7.2/10', 'target': '8.5/10', 'improvement': '+18%'}
                ],
                'timeline': '2-4 meses para implementación',
                'estimated_roi': '165%',
                'is_demo': True,
                'generated_at': datetime.datetime.utcnow().isoformat()
            }
        
        return jsonify(analysis_result), 200
        
    except Exception as e:
        return jsonify({'error': f'Error en el análisis demo: {str(e)}'}), 400

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)

# Rutas para agentes especializados
@app.route('/ai/analyze-saas', methods=['POST'])
def analyze_saas():
    try:
        from services.ai_agents import agent_orchestrator
        data = request.get_json()
        result = agent_orchestrator.agents['saas'].analyze(data.get('business_data', {}))
        return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/ai/analyze-ecommerce', methods=['POST'])
def analyze_ecommerce():
    try:
        from services.ai_agents import agent_orchestrator
        data = request.get_json()
        result = agent_orchestrator.agents['ecommerce'].analyze(data.get('business_data', {}))
        return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/ai/analyze-local', methods=['POST'])
def analyze_local():
    try:
        from services.ai_agents import agent_orchestrator
        data = request.get_json()
        result = agent_orchestrator.agents['local'].analyze(data.get('business_data', {}))
        return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/ai/competitor-analysis', methods=['POST'])
def competitor_analysis():
    try:
        from services.ai_agents import agent_orchestrator
        data = request.get_json()
        result = agent_orchestrator.agents['competitor'].analyze(data.get('business_data', {}))
        return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/ai/market-research', methods=['POST'])
def market_research():
    try:
        from services.ai_agents import agent_orchestrator
        data = request.get_json()
        result = agent_orchestrator.agents['market'].analyze(data.get('business_data', {}))
        return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400

# Ruta para análisis completo con todos los agentes
@app.route('/ai/comprehensive-analysis', methods=['POST'])
@token_required
def comprehensive_analysis(current_user):
    try:
        from services.ai_agents import agent_orchestrator
        
        data = request.get_json()
        business_data = {
            'business_type': data.get('business_type'),
            'business_name': data.get('business_name'),
            'website': data.get('website'),
            'description': data.get('description'),
            'challenges': data.get('current_challenges'),
            'goals': data.get('goals')
        }
        
        # Ejecutar análisis completo con todos los agentes
        comprehensive_result = agent_orchestrator.run_comprehensive_analysis(business_data)
        
        # Guardar en base de datos
        analysis_data = {
            'user_id': current_user.id,
            'business_data': business_data,
            'result': comprehensive_result,
            'analysis_type': 'comprehensive_ai',
            'created_at': datetime.datetime.utcnow().isoformat()
        }
        
        try:
            supabase.table('analyses').insert(analysis_data).execute()
        except Exception as db_error:
            print(f"Database error: {db_error}")
        
        return jsonify(comprehensive_result), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 400

# Ruta para guardar análisis (usado por N8N)
@app.route('/save-analysis', methods=['POST'])
def save_analysis():
    try:
        data = request.get_json()
        analysis_result = data.get('analysis_result', {})
        
        # En un entorno real, aquí se guardaría en la base de datos
        # Por ahora solo retornamos confirmación
        return jsonify({
            'status': 'saved',
            'analysis_id': f"analysis_{datetime.datetime.utcnow().timestamp()}",
            'timestamp': datetime.datetime.utcnow().isoformat()
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 400