// Servicio de autenticación con Supabase
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://wygyxqvflvjeeonifiad.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5Z3l4cXZmbHZqZWVvbmlmaWFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTczNTQwMDcsImV4cCI6MjA3MjkzMDAwN30.LiD0cCR1bdqV5knwzmD3DVIRnBj9ZG9lJT1GRayaJ4s'

const supabase = createClient(supabaseUrl, supabaseKey)

class AuthService {
  constructor() {
    this.currentUser = null
    this.initializeAuth()
  }

  async initializeAuth() {
    const { data: { session } } = await supabase.auth.getSession()
    if (session) {
      this.currentUser = session.user
    }

    // Escuchar cambios de autenticación
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        this.currentUser = session.user
        localStorage.setItem('token', session.access_token)
      } else {
        this.currentUser = null
        localStorage.removeItem('token')
      }
    })
  }

  async signUp(email, password, userData = {}) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: userData.fullName,
            business_type: userData.businessType,
            ...userData
          }
        }
      })

      if (error) throw error

      return {
        success: true,
        user: data.user,
        message: 'Usuario creado exitosamente. Revisa tu email para confirmar tu cuenta.'
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  }

  async signIn(email, password) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) throw error

      localStorage.setItem('token', data.session.access_token)
      this.currentUser = data.user

      return {
        success: true,
        user: data.user,
        session: data.session
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  }

  async signOut() {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error

      this.currentUser = null
      localStorage.removeItem('token')
      
      return { success: true }
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  }

  async resetPassword(email) {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      })

      if (error) throw error

      return {
        success: true,
        message: 'Email de recuperación enviado'
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  }

  async updateProfile(updates) {
    try {
      const { data, error } = await supabase.auth.updateUser({
        data: updates
      })

      if (error) throw error

      return {
        success: true,
        user: data.user
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  }

  getCurrentUser() {
    return this.currentUser
  }

  isAuthenticated() {
    return !!this.currentUser
  }

  getToken() {
    return localStorage.getItem('token')
  }

  // Método para autenticación offline/demo
  demoSignIn(email) {
    const demoUser = {
      id: 'demo-user-' + Date.now(),
      email: email,
      user_metadata: {
        full_name: 'Usuario Demo',
        business_type: 'demo'
      },
      created_at: new Date().toISOString()
    }

    this.currentUser = demoUser
    localStorage.setItem('token', 'demo-token-' + Date.now())
    localStorage.setItem('demo-user', JSON.stringify(demoUser))

    return {
      success: true,
      user: demoUser,
      isDemo: true
    }
  }

  // Verificar si es usuario demo
  isDemoUser() {
    return localStorage.getItem('demo-user') !== null
  }
}

export default new AuthService()