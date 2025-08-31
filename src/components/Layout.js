import React from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { Dashboard, BarChart, Settings, Logout } from "@mui/icons-material";

const drawerWidth = "30%"; // Sidebar fixed at 20%

const Layout = ({ children }) => {
  return (
    <Box sx={{ display: "flex", height: "100vh", width: "100%" }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#1e293b",
            color: "white",
          },
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap>
            MedTech Admin
          </Typography>
        </Toolbar>
        <List>
          <ListItem button>
            <ListItemIcon sx={{ color: "white" }}>
              <Dashboard />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button>
            <ListItemIcon sx={{ color: "white" }}>
              <BarChart />
            </ListItemIcon>
            <ListItemText primary="Reports" />
          </ListItem>
          <ListItem button>
            <ListItemIcon sx={{ color: "white" }}>
              <Settings />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
          <ListItem button>
            <ListItemIcon sx={{ color: "white" }}>
              <Logout />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>

      {/* Dashboard Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "#f9fafb",
          p: 3,
          ml: drawerWidth, // 👈 Push content to the right of sidebar (fixes space issue)
          
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
