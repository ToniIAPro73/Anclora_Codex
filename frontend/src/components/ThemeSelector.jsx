import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faDesktop } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../hooks/useTheme';

const ThemeSelector = () => {
  const { theme, changeTheme } = useTheme();

  const themes = [
    { id: 'light', icon: faSun, label: 'Claro' },
    { id: 'dark', icon: faMoon, label: 'Oscuro' },
    { id: 'system', icon: faDesktop, label: 'Sistema' }
  ];

  return (
    <div className="theme-selector">
      {themes.map(({ id, icon, label }) => (
        <button
          key={id}
          className={`theme-btn ${theme === id ? 'active' : ''}`}
          onClick={() => changeTheme(id)}
          title={`Tema ${label}`}
          aria-label={`Cambiar a tema ${label}`}
        >
          <FontAwesomeIcon icon={icon} />
        </button>
      ))}
    </div>
  );
};

export default ThemeSelector;