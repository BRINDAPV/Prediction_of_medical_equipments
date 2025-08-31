import React, { createContext, useContext, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProviderWrapper = ({ children }) => {
  const [themeMode, setThemeMode] = useState('day');

  const themes = {
    day: createTheme({
      palette: {
        mode: 'light',
        primary: {
          main: '#1976d2',
        },
        secondary: {
          main: '#dc004e',
        },
        background: {
          default: '#f5f5f5',
          paper: '#ffffff',
        },
        text: {
          primary: '#333333',
          secondary: '#666666',
        },
      },
      components: {
        MuiAppBar: {
          styleOverrides: {
            root: {
              backgroundColor: '#1976d2',
              color: '#ffffff',
            },
          },
        },
        MuiDrawer: {
          styleOverrides: {
            paper: {
              backgroundColor: '#ffffff',
              color: '#333333',
            },
          },
        },
      },
    }),
    night: createTheme({
      palette: {
        mode: 'dark',
        primary: {
          main: '#90caf9',
        },
        secondary: {
          main: '#f48fb1',
        },
        background: {
          default: '#2c3e50',
          paper: '#34495e',
        },
        text: {
          primary: '#ecf0f1',
          secondary: '#bdc3c7',
        },
      },
      components: {
        MuiAppBar: {
          styleOverrides: {
            root: {
              backgroundColor: '#2c3e50',
              color: '#ecf0f1',
            },
          },
        },
        MuiDrawer: {
          styleOverrides: {
            paper: {
              backgroundColor: '#34495e',
              color: '#ecf0f1',
            },
          },
        },
      },
    }),
    darkNight: createTheme({
      palette: {
        mode: 'dark',
        primary: {
          main: '#00ff00',
        },
        secondary: {
          main: '#ff00ff',
        },
        background: {
          default: '#000000',
          paper: '#111111',
        },
        text: {
          primary: '#00ff00',
          secondary: '#ff00ff',
        },
      },
      components: {
        MuiAppBar: {
          styleOverrides: {
            root: {
              backgroundColor: '#000000',
              color: '#00ff00',
              borderBottom: '1px solid #00ff00',
            },
          },
        },
        MuiDrawer: {
          styleOverrides: {
            paper: {
              backgroundColor: '#111111',
              color: '#00ff00',
              borderRight: '1px solid #00ff00',
            },
          },
        },
        MuiCard: {
          styleOverrides: {
            root: {
              backgroundColor: '#111111',
              border: '1px solid #00ff00',
            },
          },
        },
      },
    }),
  };

  const toggleTheme = () => {
    const themeOrder = ['day', 'night', 'darkNight'];
    const currentIndex = themeOrder.indexOf(themeMode);
    const nextIndex = (currentIndex + 1) % themeOrder.length;
    setThemeMode(themeOrder[nextIndex]);
  };

  const value = {
    themeMode,
    toggleTheme,
    currentTheme: themes[themeMode],
  };

  return (
    <ThemeContext.Provider value={value}>
      <ThemeProvider theme={themes[themeMode]}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

