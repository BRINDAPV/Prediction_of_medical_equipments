import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  useTheme,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import WarningIcon from '@mui/icons-material/Warning';
import BarChartIcon from '@mui/icons-material/BarChart';
import AssessmentIcon from '@mui/icons-material/Assessment';
import BusinessIcon from '@mui/icons-material/Business';
import BuildIcon from '@mui/icons-material/Build';
import TimelineIcon from '@mui/icons-material/Timeline';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import SettingsIcon from '@mui/icons-material/Settings';
import OpenInNewIcon from '@mui/icons-material/OpenInNew'; // Fixed icon

import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 240;

const Sidebar = ({ open, onToggle }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  // Combined menu items
  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Manufacturer Analysis', icon: <BusinessIcon />, path: '/manufacturers' },
    { text: 'Major Failures', icon: <WarningIcon />, path: '/failures' },
    { text: 'Visualizations', icon: <BarChartIcon />, path: '/visualizations' },
    { text: 'Reports', icon: <AssessmentIcon />, path: '/reports' },

    // Predictive Failure Items
    { text: 'Equipment Risk Overview', icon: <BuildIcon />, path: '/risk-overview' },
    { text: 'Predicted Failures', icon: <WarningIcon />, path: '/predicted-failures' },
    { text: 'Maintenance & Preventive Actions', icon: <BuildIcon />, path: '/maintenance' },
    { text: 'Failure Logs & Prediction Accuracy', icon: <ReportGmailerrorredIcon />, path: '/failure-logs' },
    { text: 'Analytics & Reports', icon: <TimelineIcon />, path: '/analytics-reports' },
    { text: 'Regulatory Compliance & Alerts', icon: <AssessmentIcon />, path: '/regulatory-alerts' },
    { text: 'Settings / Admin', icon: <SettingsIcon />, path: '/settings' },
    { text: 'Modal Examples', icon: <OpenInNewIcon />, path: '/modal-example' }, // Fixed
  ];

  const handleItemClick = (path) => {
    navigate(path);
    if (window.innerWidth < 960 && onToggle) onToggle();
  };

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          marginTop: "64px",
          height: "calc(100% - 64px)",
        },
      }}
    >
      <Box sx={{ overflow: 'auto', mt: 1 }}>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                onClick={() => handleItemClick(item.path)}
                selected={isActive(item.path)}
                sx={{
                  mx: 1,
                  borderRadius: 1,
                  '&.Mui-selected': {
                    backgroundColor: theme.palette.primary.main + '20',
                    '&:hover': {
                      backgroundColor: theme.palette.primary.main + '30',
                    },
                  },
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: isActive(item.path) ? theme.palette.primary.main : 'inherit',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{
                    '& .MuiTypography-root': {
                      fontWeight: isActive(item.path) ? 'bold' : 'normal',
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
