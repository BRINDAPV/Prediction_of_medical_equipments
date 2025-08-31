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
          main: '#3b82f6', // Tailwind blue-500
          light: '#60a5fa', // Tailwind blue-400
          dark: '#2563eb', // Tailwind blue-600
        },
        secondary: {
          main: '#8b5cf6', // Tailwind violet-500
          light: '#a78bfa', // Tailwind violet-400
          dark: '#7c3aed', // Tailwind violet-600
        },
        background: {
          default: '#f8fafc', // Tailwind slate-50
          paper: '#ffffff',
          modal: 'rgba(255, 255, 255, 0.95)',
        },
        text: {
          primary: '#1e293b', // Tailwind slate-800
          secondary: '#64748b', // Tailwind slate-500
        },
        chart: {
          primary: '#3b82f6',
          secondary: '#8b5cf6',
          success: '#10b981', // Tailwind emerald-500
          warning: '#f59e0b', // Tailwind amber-500
          error: '#ef4444', // Tailwind red-500
          info: '#06b6d4', // Tailwind cyan-500
        },
      },
      components: {
        MuiAppBar: {
          styleOverrides: {
            root: {
              backgroundColor: '#3b82f6',
              color: '#ffffff',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            },
          },
        },
        MuiDrawer: {
          styleOverrides: {
            paper: {
              backgroundColor: '#ffffff',
              color: '#1e293b',
              borderRight: '1px solid #e2e8f0',
            },
          },
        },
        MuiCard: {
          styleOverrides: {
            root: {
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                transform: 'translateY(-2px)',
              },
            },
          },
        },
        MuiModal: {
          styleOverrides: {
            root: {
              '& .MuiBackdrop-root': {
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                backdropFilter: 'blur(4px)',
              },
            },
          },
        },
        MuiDialog: {
          styleOverrides: {
            paper: {
              borderRadius: '16px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              border: '1px solid #e2e8f0',
            },
          },
        },
        MuiButton: {
          styleOverrides: {
            root: {
              borderRadius: '8px',
              textTransform: 'none',
              fontWeight: 600,
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
              '&:hover': {
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              },
            },
          },
        },
      },
    }),
    night: createTheme({
      palette: {
        mode: 'dark',
        primary: {
          main: '#60a5fa', // Tailwind blue-400
          light: '#93c5fd', // Tailwind blue-300
          dark: '#3b82f6', // Tailwind blue-500
        },
        secondary: {
          main: '#a78bfa', // Tailwind violet-400
          light: '#c4b5fd', // Tailwind violet-300
          dark: '#8b5cf6', // Tailwind violet-500
        },
        background: {
          default: '#0f172a', // Tailwind slate-900
          paper: '#1e293b', // Tailwind slate-800
          modal: 'rgba(30, 41, 59, 0.95)',
        },
        text: {
          primary: '#f1f5f9', // Tailwind slate-100
          secondary: '#cbd5e1', // Tailwind slate-300
        },
        chart: {
          primary: '#60a5fa',
          secondary: '#a78bfa',
          success: '#34d399', // Tailwind emerald-400
          warning: '#fbbf24', // Tailwind amber-400
          error: '#f87171', // Tailwind red-400
          info: '#22d3ee', // Tailwind cyan-400
        },
      },
      components: {
        MuiAppBar: {
          styleOverrides: {
            root: {
              backgroundColor: '#0f172a',
              color: '#f1f5f9',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)',
            },
          },
        },
        MuiDrawer: {
          styleOverrides: {
            paper: {
              backgroundColor: '#1e293b',
              color: '#f1f5f9',
              borderRight: '1px solid #334155',
            },
          },
        },
        MuiCard: {
          styleOverrides: {
            root: {
              backgroundColor: '#1e293b',
              border: '1px solid #334155',
              borderRadius: '12px',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px 0 rgba(0, 0, 0, 0.2)',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)',
                transform: 'translateY(-2px)',
              },
            },
          },
        },
        MuiModal: {
          styleOverrides: {
            root: {
              '& .MuiBackdrop-root': {
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                backdropFilter: 'blur(4px)',
              },
            },
          },
        },
        MuiDialog: {
          styleOverrides: {
            paper: {
              borderRadius: '16px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              border: '1px solid #334155',
            },
          },
        },
        MuiButton: {
          styleOverrides: {
            root: {
              borderRadius: '8px',
              textTransform: 'none',
              fontWeight: 600,
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.3)',
              '&:hover': {
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)',
              },
            },
          },
        },
      },
    }),
    darkNight: createTheme({
      palette: {
        mode: 'dark',
        primary: {
          main: '#00ff00', // Matrix green
          light: '#00ff40',
          dark: '#00cc00',
        },
        secondary: {
          main: '#ff00ff', // Matrix magenta
          light: '#ff40ff',
          dark: '#cc00cc',
        },
        background: {
          default: '#000000',
          paper: '#111111',
          modal: 'rgba(17, 17, 17, 0.95)',
        },
        text: {
          primary: '#00ff00',
          secondary: '#ff00ff',
        },
        chart: {
          primary: '#00ff00',
          secondary: '#ff00ff',
          success: '#00ff00',
          warning: '#ffff00', // Yellow
          error: '#ff0000', // Red
          info: '#00ffff', // Cyan
        },
      },
      components: {
        MuiAppBar: {
          styleOverrides: {
            root: {
              backgroundColor: '#000000',
              color: '#00ff00',
              borderBottom: '2px solid #00ff00',
              boxShadow: '0 0 20px rgba(0, 255, 0, 0.3)',
            },
          },
        },
        MuiDrawer: {
          styleOverrides: {
            paper: {
              backgroundColor: '#111111',
              color: '#00ff00',
              borderRight: '2px solid #00ff00',
              boxShadow: '0 0 20px rgba(0, 255, 0, 0.2)',
            },
          },
        },
        MuiCard: {
          styleOverrides: {
            root: {
              backgroundColor: '#111111',
              border: '2px solid #00ff00',
              borderRadius: '12px',
              boxShadow: '0 0 20px rgba(0, 255, 0, 0.1)',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                boxShadow: '0 0 30px rgba(0, 255, 0, 0.3)',
                transform: 'translateY(-3px)',
                borderColor: '#00ff40',
              },
            },
          },
        },
        MuiModal: {
          styleOverrides: {
            root: {
              '& .MuiBackdrop-root': {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                backdropFilter: 'blur(8px)',
              },
            },
          },
        },
        MuiDialog: {
          styleOverrides: {
            paper: {
              borderRadius: '16px',
              boxShadow: '0 0 40px rgba(0, 255, 0, 0.4)',
              border: '2px solid #00ff00',
              backgroundColor: '#111111',
            },
          },
        },
        MuiButton: {
          styleOverrides: {
            root: {
              borderRadius: '8px',
              textTransform: 'none',
              fontWeight: 600,
              border: '2px solid #00ff00',
              boxShadow: '0 0 15px rgba(0, 255, 0, 0.3)',
              '&:hover': {
                boxShadow: '0 0 25px rgba(0, 255, 0, 0.5)',
                backgroundColor: 'rgba(0, 255, 0, 0.1)',
              },
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

