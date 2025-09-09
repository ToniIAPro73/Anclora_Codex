/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta base Anclora Press
        'azul-principal': '#23436B',
        'azul-claro': '#2EAFC4',
        'ambar-suave': '#FFC979',
        'negro-azulado': '#162032',
        'gris-claro': '#F6F7F9',
        'blanco': '#FFFFFF',
        // Colores específicos Anclora Press
        'card-bg-light': '#FFECB3',
        'border-subtle': '#E1E8ED',
        'text-primary': '#162032',
        'accent-warm': '#FFC979',
        // Colores adicionales del ecosistema
        'azul-hero': '#38BDF8',
        'verde-suave': '#37B5A4',
        'verde-claro': '#D6F8E3',
        'gris-render': '#37475A',
        'grises': {
          '100': '#DCE8F0',
          '200': '#E1E8ED',
          '300': '#313848',
          '400': '#202837',
          '500': '#263043',
        }
      },
      fontFamily: {
        'libre': ['Libre Baskerville', 'serif'],
        'inter': ['Inter', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        // Degradados principales Anclora
        'gradient-hero': 'linear-gradient(120deg, #23436B 0%, #38BDF8 100%)',
        'gradient-action': 'linear-gradient(90deg, #2EAFC4 0%, #FFC979 100%)',
        'gradient-subtle': 'linear-gradient(180deg, #F6F7F9 0%, #FFFFFF 100%)',
        // Degradados específicos por producto
        'gradient-press': 'linear-gradient(120deg, #FFC979 70%, #FFECB3 100%)',
        'gradient-cortex': 'linear-gradient(120deg, #23436B 0%, #38BDF8 100%)',
        'gradient-nexus': 'linear-gradient(120deg, #23436B 70%, #38BDF8 100%)',
        'gradient-kairon': 'linear-gradient(120deg, #37B5A4 70%, #2EAFC4 100%)',
        'gradient-render': 'linear-gradient(120deg, #37475A 88%, #2EAFC4 100%)',
        'gradient-guardian': 'linear-gradient(120deg, #2EAFC4 75%, #D6F8E3 100%)',
      },
      borderRadius: {
        'anclora': '12px',
        'card': '20px',
      },
      boxShadow: {
        'anclora': '0 4px 20px rgba(0,0,0,0.08)',
        'card': '0 4px 20px rgba(0,0,0,0.08)',
      }
    },
  },
  plugins: [],
}