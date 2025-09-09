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
        elif business_type == 'ecommerce':
            analysis_result = {
                'business_type': 'ecommerce',
                'business_name': business_name,
                'score': 68,
                'summary': f"Análisis completado para {business_name}. Identificamos oportunidades para optimizar conversiones y AOV.",
                'recommendations': [
                    {
                        'category': 'Optimización de Conversión',
                        'priority': 'Alta',
                        'impact': '35% aumento en conversiones',
                        'actions': [
                            'Implementar abandoned cart recovery con secuencia de emails',
                            'Optimizar checkout process reduciendo pasos a 2-3',
                            'Agregar reviews y ratings prominentes en product pages'
                        ]
                    },
                    {
                        'category': 'Customer Experience',
                        'priority': 'Alta',
                        'impact': '40% aumento en repeat purchases',
                        'actions': [
                            'Implementar chatbot para soporte 24/7',
                            'Crear programa de loyalty con rewards',
                            'Personalizar product recommendations con ML'
                        ]
                    }
                ],
                'kpis': [
                    {'name': 'Conversion Rate', 'current': '1.8%', 'target': '2.9%', 'improvement': '+61%'},
                    {'name': 'Average Order Value', 'current': '$67', 'target': '$89', 'improvement': '+33%'},
                    {'name': 'Cart Abandonment', 'current': '69%', 'target': '52%', 'improvement': '-25%'},
                    {'name': 'Customer LTV', 'current': '$156', 'target': '$218', 'improvement': '+40%'}
                ],
                'timeline': '2-4 meses para implementación completa',
                'estimated_roi': '165%',
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