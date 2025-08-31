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

// Predictive Failure Pages
import RiskOverview from './components/RiskOverview';
import PredictedFailures from './components/PredictedFailures';
import Maintenance from './components/Maintenance';
import FailureLogs from './components/FailureLogs';
import AnalyticsReports from './components/AnalyticsReports';
import RegulatoryAlerts from './components/RegulatoryAlerts';
import SettingsAdmin from './components/SettingsAdmin';
import ModalExample from './components/ModalExample';

const drawerWidth = 240;

function AppContent() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header onMenuClick={handleDrawerToggle} />
      <Sidebar open={mobileOpen} onToggle={handleDrawerToggle} drawerWidth={drawerWidth} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          marginLeft: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/manufacturers" element={<ManufacturerDashboard />} />
          <Route path="/failures" element={<Failures />} />
          <Route path="/visualizations" element={<Visualizations />} />
          <Route path="/reports" element={<Reports />} />

          {/* Predictive Failure Routes */}
          <Route path="/risk-overview" element={<RiskOverview />} />
          <Route path="/predicted-failures" element={<PredictedFailures />} />
          <Route path="/maintenance" element={<Maintenance />} />
          <Route path="/failure-logs" element={<FailureLogs />} />
          <Route path="/analytics-reports" element={<AnalyticsReports />} />
          <Route path="/regulatory-alerts" element={<RegulatoryAlerts />} />
          <Route path="/settings" element={<SettingsAdmin />} />
          <Route path="/modal-example" element={<ModalExample />} />
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
