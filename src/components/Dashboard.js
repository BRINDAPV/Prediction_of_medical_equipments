// src/components/Dashboard.js
import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  Chip,
  useTheme,
} from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";

const Dashboard = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const leftRef = useRef(null);
  const [leftHeight, setLeftHeight] = useState(0);
  const theme = useTheme();

  // Update height of left column dynamically
  useEffect(() => {
    if (leftRef.current) setLeftHeight(leftRef.current.clientHeight);
    const handleResize = () => {
      if (leftRef.current) setLeftHeight(leftRef.current.clientHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Mock data
  const stats = {
    total_manufacturers: 12,
    total_devices: 56,
    total_failures: 8,
    total_parent_companies: 4,
    total_representatives: 10,
  };

  const parentCompanies = [
    { name: "Parent A", count: 5 },
    { name: "Parent B", count: 3 },
    { name: "Parent C", count: 2 },
    { name: "Parent D", count: 2 },
  ];

  const failures = [
    { device: "Device 101", failures: 2 },
    { device: "Device 102", failures: 1 },
    { device: "Device 103", failures: 3 },
    { device: "Device 104", failures: 2 },
  ];

  const manufacturers = [
    { ID: 1, NAME: "Manufacturer A", PARENT_COMPANY: "Parent A", REPRESENTATIVE: "Rep A", ADDRESS: "123 Street", SOURCE: "Manual", CREATED_AT: "2025-01-01", UPDATED_AT: "2025-07-01" },
    { ID: 2, NAME: "Manufacturer B", PARENT_COMPANY: "Parent B", REPRESENTATIVE: "Rep B", ADDRESS: "456 Avenue", SOURCE: "Manual", CREATED_AT: "2025-02-01", UPDATED_AT: "2025-07-15" },
    { ID: 3, NAME: "Manufacturer C", PARENT_COMPANY: "Parent A", REPRESENTATIVE: "Rep C", ADDRESS: "789 Boulevard", SOURCE: "Manual", CREATED_AT: "2025-03-01", UPDATED_AT: "2025-07-20" },
    { ID: 4, NAME: "Manufacturer D", PARENT_COMPANY: "Parent D", REPRESENTATIVE: "Rep D", ADDRESS: "101 Road", SOURCE: "Manual", CREATED_AT: "2025-04-01", UPDATED_AT: "2025-07-25" },
    { ID: 5, NAME: "Manufacturer E", PARENT_COMPANY: "Parent C", REPRESENTATIVE: "Rep A", ADDRESS: "202 Lane", SOURCE: "Manual", CREATED_AT: "2025-05-01", UPDATED_AT: "2025-07-30" },
    { ID: 6, NAME: "Manufacturer F", PARENT_COMPANY: "Parent B", REPRESENTATIVE: "Rep B", ADDRESS: "303 Circle", SOURCE: "Manual", CREATED_AT: "2025-06-01", UPDATED_AT: "2025-07-31" },
    { ID: 7, NAME: "Manufacturer G", PARENT_COMPANY: "Parent A", REPRESENTATIVE: "Rep C", ADDRESS: "404 Square", SOURCE: "Manual", CREATED_AT: "2025-06-15", UPDATED_AT: "2025-08-01" },
    { ID: 8, NAME: "Manufacturer H", PARENT_COMPANY: "Parent D", REPRESENTATIVE: "Rep D", ADDRESS: "505 Street", SOURCE: "Manual", CREATED_AT: "2025-06-20", UPDATED_AT: "2025-08-02" },
    { ID: 9, NAME: "Manufacturer I", PARENT_COMPANY: "Parent C", REPRESENTATIVE: "Rep A", ADDRESS: "606 Avenue", SOURCE: "Manual", CREATED_AT: "2025-07-01", UPDATED_AT: "2025-08-05" },
  ];

  // Get chart colors from theme
  const getChartColors = () => {
    if (theme.palette.chart) {
      return {
        primary: theme.palette.chart.primary,
        secondary: theme.palette.chart.secondary,
        success: theme.palette.chart.success,
        warning: theme.palette.chart.warning,
        error: theme.palette.chart.error,
        info: theme.palette.chart.info,
      };
    }
    // Fallback colors
    return {
      primary: '#3b82f6',
      secondary: '#8b5cf6',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#06b6d4',
    };
  };

  const chartColors = getChartColors();

  return (
    <Box className="fade-in" sx={{ flexGrow: 1, p: 3 }}>
      <Typography 
        variant="h4" 
        gutterBottom 
        className="slide-up"
        sx={{ 
          fontWeight: 700, 
          color: 'text.primary',
          mb: 4,
          textAlign: 'center'
        }}
      >
        Manufacturers Dashboard
      </Typography>

      {/* KPI Cards */}
      <Grid container spacing={3} mb={4} className="slide-up">
        {[
          { title: "Total Manufacturers", value: stats.total_manufacturers, color: chartColors.primary },
          { title: "Total Devices", value: stats.total_devices, color: chartColors.info },
          { title: "Total Failures", value: stats.total_failures, color: chartColors.error },
          { title: "Parent Companies", value: stats.total_parent_companies, color: chartColors.secondary },
          { title: "Active Representatives", value: stats.total_representatives, color: chartColors.success },
        ].map((kpi, idx) => (
          <Grid item xs={12} sm={6} md={2.4} key={idx}>
            <Card 
              className="card-hover"
              sx={{ 
                height: 140, 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center",
                background: `linear-gradient(135deg, ${kpi.color}15, ${kpi.color}05)`,
                border: `1px solid ${kpi.color}30`,
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: kpi.color,
                }
              }}
            >
              <CardContent sx={{ textAlign: "center", position: 'relative', zIndex: 1 }}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: 'text.secondary', 
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    mb: 1
                  }}
                >
                  {kpi.title}
                </Typography>
                <Typography 
                  variant="h3" 
                  sx={{ 
                    color: kpi.color,
                    fontWeight: 800,
                    textShadow: `0 0 20px ${kpi.color}40`
                  }}
                >
                  {kpi.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Three-container layout */}
      <Grid container spacing={3} className="slide-up">
        {/* Left column */}
        <Grid item xs={12} md={6} ref={leftRef} container direction="column" spacing={3}>
          <Grid item>
            <Card className="chart-container">
              <CardContent>
                <Typography 
                  variant="h6" 
                  gutterBottom 
                  sx={{ 
                    fontWeight: 600,
                    color: 'text.primary',
                    mb: 3,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  📊 Top Parent Companies
                </Typography>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={parentCompanies}>
                    <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fill: theme.palette.text.secondary }}
                      axisLine={{ stroke: theme.palette.divider }}
                    />
                    <YAxis 
                      tick={{ fill: theme.palette.text.secondary }}
                      axisLine={{ stroke: theme.palette.divider }}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: theme.palette.background.paper,
                        border: `1px solid ${theme.palette.divider}`,
                        borderRadius: '8px',
                        boxShadow: theme.shadows[4]
                      }}
                    />
                    <Legend />
                    <Bar 
                      dataKey="count" 
                      fill={chartColors.primary}
                      radius={[4, 4, 0, 0]}
                      stroke={chartColors.primary}
                      strokeWidth={2}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Card className="chart-container">
              <CardContent>
                <Typography 
                  variant="h6" 
                  gutterBottom 
                  sx={{ 
                    fontWeight: 600,
                    color: 'text.primary',
                    mb: 3,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  ⚠️ Major Failures
                </Typography>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={failures}>
                    <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                    <XAxis 
                      dataKey="device" 
                      tick={{ fill: theme.palette.text.secondary }}
                      axisLine={{ stroke: theme.palette.divider }}
                    />
                    <YAxis 
                      tick={{ fill: theme.palette.text.secondary }}
                      axisLine={{ stroke: theme.palette.divider }}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: theme.palette.background.paper,
                        border: `1px solid ${theme.palette.divider}`,
                        borderRadius: '8px',
                        boxShadow: theme.shadows[4]
                      }}
                    />
                    <Legend />
                    <Bar 
                      dataKey="failures" 
                      fill={chartColors.error}
                      radius={[4, 4, 0, 0]}
                      stroke={chartColors.error}
                      strokeWidth={2}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Right column */}
        <Grid item xs={12} md={6}>
          <Card 
            className="chart-container"
            sx={{ 
              minHeight: leftHeight,
              background: `linear-gradient(135deg, ${theme.palette.background.paper}, ${theme.palette.background.default})`
            }}
          >
            <CardContent>
              <Typography 
                variant="h6" 
                gutterBottom 
                sx={{ 
                  fontWeight: 600,
                  color: 'text.primary',
                  mb: 3,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                🏢 Manufacturers Details
              </Typography>
              <Box className="table-container">
                <Table>
                  <TableHead>
                    <TableRow className="table-header">
                      <TableCell sx={{ fontWeight: 600 }}>ID</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Parent Company</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Representative</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Address</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Source</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Created</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Updated</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {manufacturers
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row, index) => (
                        <TableRow 
                          key={row.ID} 
                          className="table-row"
                          sx={{ 
                            animationDelay: `${index * 0.1}s`,
                            '&:nth-of-type(odd)': {
                              backgroundColor: theme.palette.action.hover,
                            },
                          }}
                        >
                          <TableCell>{row.ID}</TableCell>
                          <TableCell sx={{ fontWeight: 500 }}>{row.NAME}</TableCell>
                          <TableCell>{row.PARENT_COMPANY}</TableCell>
                          <TableCell>{row.REPRESENTATIVE}</TableCell>
                          <TableCell>{row.ADDRESS}</TableCell>
                          <TableCell>
                            <Chip 
                              label={row.SOURCE} 
                              size="small" 
                              sx={{ 
                                backgroundColor: chartColors.info,
                                color: 'white',
                                fontWeight: 600
                              }} 
                            />
                          </TableCell>
                          <TableCell>{row.CREATED_AT}</TableCell>
                          <TableCell>{row.UPDATED_AT}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </Box>
              <TablePagination
                component="div"
                count={manufacturers.length}
                page={page}
                rowsPerPage={rowsPerPage}
                onPageChange={(_, newPage) => setPage(newPage)}
                onRowsPerPageChange={(e) => {
                  setRowsPerPage(parseInt(e.target.value, 10));
                  setPage(0);
                }}
                rowsPerPageOptions={[5, 8, 10]}
                sx={{
                  '& .MuiTablePagination-select': {
                    borderRadius: '8px',
                  },
                  '& .MuiTablePagination-actions button': {
                    borderRadius: '8px',
                  }
                }}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
