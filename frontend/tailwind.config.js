/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'azul-principal': '#23436B',
        'azul-claro': '#2EAFC4',
        'ambar-suave': '#FFC979',
        'negro-azulado': '#162032',
        'gris-claro': '#F6F7F9',
        'blanco': '#FFFFFF',
        // Colores adicionales del sistema Anclora
        'azul-hero': '#38BDF8',
        'verde-guardian': '#D6F8E3',
        'gris-render': '#37475A',
        'teal-kairon': '#37B5A4',
      },
      fontFamily: {
        'libre': ['Libre Baskerville', 'serif'],
        'inter': ['Inter', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'gradient-hero': 'linear-gradient(120deg, #23436B 0%, #2EAFC4 100%)',
        'gradient-action': 'linear-gradient(90deg, #2EAFC4 0%, #FFC979 100%)',
        'gradient-subtle': 'linear-gradient(180deg, #F6F7F9 0%, #FFFFFF 100%)',
        'gradient-cortex': 'linear-gradient(120deg, #23436B 0%, #2EAFC4 100%)',
      }
    },
  },
  plugins: [],
}