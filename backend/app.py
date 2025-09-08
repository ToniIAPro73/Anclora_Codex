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
        
        # Aquí iría la lógica para procesar el análisis con IA
        # Por ahora, simulamos un análisis
        analysis_result = {
            "business_type": data.get("business_type"),
            "summary": "Análisis completado con éxito",
            "recommendations": [
                "Optimizar landing page para mejorar la tasa de conversión",
                "Implementar programa de referidos para adquirir clientes a menor costo",
                "Ajustar estrategia de precios basado en análisis competitivo"
            ],
            "priority": "Alta",
            "estimated_impact": "Aumento del 15-30% en conversiones"
        }
        
        # Guardar el análisis en la base de datos
        analysis_data = {
            'user_id': current_user.id,
            'business_data': data,
            'result': analysis_result,
            'created_at': datetime.datetime.utcnow().isoformat()
        }
        
        supabase.table('analyses').insert(analysis_data).execute()
        
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

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)  
