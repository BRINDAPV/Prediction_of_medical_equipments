import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, CssBaseline, useMediaQuery, useTheme, Toolbar } from '@mui/material';
import { ThemeProviderWrapper } from './contexts/ThemeContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ManufacturerDashboard from './components/ManufacturerDashboard';
import Failures from './components/Failures';
import Visualizations from './components/Visualizations';
import Reports from './components/Reports';
import './App.css';

const drawerWidth = 240;

function AppContent() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* Header */}
      <Header onMenuClick={handleDrawerToggle} />

      {/* Sidebar */}
      <Sidebar
        open={mobileOpen}
        onToggle={handleDrawerToggle}
        drawerWidth={drawerWidth}
      />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          marginLeft: { sm: `${drawerWidth}px` }, // ✅ Push content right when sidebar is open
        }}
      >
        {/* Prevents overlap with AppBar */}
        <Toolbar />

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/manufacturers" element={<ManufacturerDashboard />} />
          <Route path="/failures" element={<Failures />} />
          <Route path="/visualizations" element={<Visualizations />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </Box>
    </Box>
  );
}

function App() {
  return (
    <ThemeProviderWrapper>
      <Router>
        <AppContent />
      </Router>
    </ThemeProviderWrapper>
  );
}

export default App;
