import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  useTheme,
} from '@mui/material';
import {
  Brightness4,
  Brightness7,
  DarkMode,
} from '@mui/icons-material';
import { useTheme as useCustomTheme } from '../contexts/ThemeContext';

const Header = () => {
  const theme = useTheme();
  const { themeMode, toggleTheme } = useCustomTheme();

  const getThemeIcon = () => {
    switch (themeMode) {
      case 'day':
        return <Brightness4 />;
      case 'night':
        return <DarkMode />;
      case 'darkNight':
        return <Brightness7 />;
      default:
        return <Brightness4 />;
    }
  };

  const getThemeLabel = () => {
    switch (themeMode) {
      case 'day':
        return 'Switch to Night';
      case 'night':
        return 'Switch to Dark Night';
      case 'darkNight':
        return 'Switch to Day';
      default:
        return 'Toggle Theme';
    }
  };

  return (
    <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <img
            src="/favicon.ico"
            alt="Logo"
            style={{
              width: 32,
              height: 32,
              marginRight: 16,
              borderRadius: '4px',
            }}
          />
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            Medical Equipment Manufacturers Dashboard
          </Typography>
        </Box>
        
        <IconButton
          color="inherit"
          onClick={toggleTheme}
          aria-label={getThemeLabel()}
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
            },
          }}
        >
          {getThemeIcon()}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

