import { useState, useEffect } from 'react';

export const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    // Verificar si hay un tema guardado en localStorage
    const savedTheme = localStorage.getItem('anclora-theme');
    if (savedTheme) return savedTheme;
    
    // Si no hay tema guardado, usar 'system' por defecto
    return 'system';
  });

  useEffect(() => {
    const root = document.documentElement;
    
    if (theme === 'system') {
      // Usar preferencia del sistema
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const applySystemTheme = () => {
        if (mediaQuery.matches) {
          root.setAttribute('data-theme', 'dark');
        } else {
          root.removeAttribute('data-theme');
        }
      };
      
      applySystemTheme();
      mediaQuery.addEventListener('change', applySystemTheme);
      
      return () => mediaQuery.removeEventListener('change', applySystemTheme);
    } else {
      // Aplicar tema específico
      if (theme === 'dark') {
        root.setAttribute('data-theme', 'dark');
      } else {
        root.setAttribute('data-theme', 'light');
      }
    }
  }, [theme]);

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('anclora-theme', newTheme);
  };

  return { theme, changeTheme };
};