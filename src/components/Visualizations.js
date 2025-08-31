import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress,
  Paper,
  useTheme,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
  ComposedChart,
} from 'recharts';
import { fetchCompanies, fetchFailures } from '../services/api';

const Visualizations = () => {
  const [companies, setCompanies] = useState([]);
  const [failures, setFailures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartType, setChartType] = useState('bar');
  const [timeRange, setTimeRange] = useState('month');
  const theme = useTheme();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [companiesData, failuresData] = await Promise.all([
        fetchCompanies(),
        fetchFailures(),
      ]);
      setCompanies(companiesData);
      setFailures(failuresData);
    } catch (err) {
      setError('Failed to load data. Using mock data instead.');
      loadMockData();
    } finally {
      setLoading(false);
    }
  };

  const loadMockData = () => {
    const mockCompanies = [
      { id: 1, name: 'MedTech Solutions', parent_company: 'MedTech Corp' },
      { id: 2, name: 'HealthCare Devices', parent_company: 'HealthCare Inc' },
      { id: 3, name: 'BioMedical Systems', parent_company: 'BioMedical Ltd' },
      { id: 4, name: 'LifeSupport Tech', parent_company: 'LifeSupport Corp' },
      { id: 5, name: 'Emergency Medical', parent_company: 'Emergency Inc' },
    ];

    const mockFailures = [
      { company: 'MedTech Solutions', failures: 15, severity: 'high', month: 'Jan', quarter: 'Q1' },
      { company: 'HealthCare Devices', failures: 8, severity: 'medium', month: 'Jan', quarter: 'Q1' },
      { company: 'BioMedical Systems', failures: 22, severity: 'high', month: 'Jan', quarter: 'Q1' },
      { company: 'LifeSupport Tech', failures: 5, severity: 'low', month: 'Jan', quarter: 'Q1' },
      { company: 'Emergency Medical', failures: 18, severity: 'high', month: 'Jan', quarter: 'Q1' },
    ];

    setCompanies(mockCompanies);
    setFailures(mockFailures);
  };

  const chartData = failures.map(failure => ({
    name: failure.company,
    failures: failure.failures,
    severity: failure.severity,
  }));

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

  const COLORS = [
    chartColors.primary,
    chartColors.secondary,
    chartColors.success,
    chartColors.warning,
    chartColors.error,
    chartColors.info,
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return chartColors.error;
      case 'medium': return chartColors.warning;
      case 'low': return chartColors.success;
      default: return chartColors.secondary;
    }
  };

  const renderChart = () => {
    const commonChartProps = {
      data: chartData,
      margin: { top: 20, right: 30, left: 20, bottom: 20 }
    };

    const commonAxisProps = {
      tick: { fill: theme.palette.text.secondary, fontSize: 12 },
      axisLine: { stroke: theme.palette.divider },
      tickLine: { stroke: theme.palette.divider }
    };

    const commonTooltipStyle = {
      backgroundColor: theme.palette.background.paper,
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: '12px',
      boxShadow: theme.shadows[8],
      padding: '12px'
    };

    switch (chartType) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={450}>
            <BarChart {...commonChartProps}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} opacity={0.3} />
              <XAxis 
                dataKey="name" 
                angle={-45} 
                textAnchor="end" 
                height={100}
                {...commonAxisProps}
              />
              <YAxis {...commonAxisProps} />
              <Tooltip contentStyle={commonTooltipStyle} />
              <Legend />
              <Bar 
                dataKey="failures" 
                fill={chartColors.primary}
                radius={[6, 6, 0, 0]}
                stroke={chartColors.primary}
                strokeWidth={2}
              />
            </BarChart>
          </ResponsiveContainer>
        );
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={450}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={140}
                fill={chartColors.primary}
                dataKey="failures"
                stroke={theme.palette.background.paper}
                strokeWidth={3}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={commonTooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
        );
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={450}>
            <LineChart {...commonChartProps}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} opacity={0.3} />
              <XAxis dataKey="name" {...commonAxisProps} />
              <YAxis {...commonAxisProps} />
              <Tooltip contentStyle={commonTooltipStyle} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="failures" 
                stroke={chartColors.primary} 
                strokeWidth={3}
                dot={{ 
                  fill: chartColors.primary, 
                  strokeWidth: 2, 
                  r: 6,
                  stroke: theme.palette.background.paper
                }}
                activeDot={{ 
                  r: 8, 
                  stroke: chartColors.primary, 
                  strokeWidth: 2,
                  fill: theme.palette.background.paper
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        );
      case 'area':
        return (
          <ResponsiveContainer width="100%" height={450}>
            <AreaChart {...commonChartProps}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} opacity={0.3} />
              <XAxis dataKey="name" {...commonAxisProps} />
              <YAxis {...commonAxisProps} />
              <Tooltip contentStyle={commonTooltipStyle} />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="failures" 
                fill={chartColors.primary}
                fillOpacity={0.6}
                stroke={chartColors.primary} 
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        );
      case 'composed':
        return (
          <ResponsiveContainer width="100%" height={450}>
            <ComposedChart {...commonChartProps}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} opacity={0.3} />
              <XAxis dataKey="name" {...commonAxisProps} />
              <YAxis {...commonAxisProps} />
              <Tooltip contentStyle={commonTooltipStyle} />
              <Legend />
              <Bar 
                dataKey="failures" 
                fill={chartColors.primary}
                radius={[4, 4, 0, 0]}
                opacity={0.8}
              />
              <Line 
                type="monotone" 
                dataKey="failures" 
                stroke={chartColors.warning} 
                strokeWidth={3}
                dot={{ 
                  fill: chartColors.warning, 
                  strokeWidth: 2, 
                  r: 4,
                  stroke: theme.palette.background.paper
                }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="500px"
        className="fade-in"
      >
        <CircularProgress 
          size={60} 
          thickness={4}
          sx={{ color: chartColors.primary }}
        />
      </Box>
    );
  }

  return (
    <Box className="fade-in" sx={{ p: 3 }}>
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
        📊 Device Fault Visualizations
      </Typography>

      {error && (
        <Alert 
          severity="warning" 
          sx={{ 
            mb: 3,
            borderRadius: '12px',
            '& .MuiAlert-icon': {
              color: chartColors.warning
            }
          }}
          className="slide-up"
        >
          {error}
        </Alert>
      )}

      {/* Chart Controls */}
      <Card className="chart-container" sx={{ mb: 4 }}>
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
            🎛️ Chart Controls
          </Typography>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Chart Type</InputLabel>
                <Select
                  value={chartType}
                  label="Chart Type"
                  onChange={(e) => setChartType(e.target.value)}
                  sx={{
                    borderRadius: '8px',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: theme.palette.divider,
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: chartColors.primary,
                    },
                  }}
                >
                  <MenuItem value="bar">📊 Bar Chart</MenuItem>
                  <MenuItem value="pie">🥧 Pie Chart</MenuItem>
                  <MenuItem value="line">📈 Line Chart</MenuItem>
                  <MenuItem value="area">📊 Area Chart</MenuItem>
                  <MenuItem value="composed">🎭 Composed Chart</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Time Range</InputLabel>
                <Select
                  value={timeRange}
                  label="Time Range"
                  onChange={(e) => setTimeRange(e.target.value)}
                  sx={{
                    borderRadius: '8px',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: theme.palette.divider,
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: chartColors.primary,
                    },
                  }}
                >
                  <MenuItem value="week">📅 Last Week</MenuItem>
                  <MenuItem value="month">📅 Last Month</MenuItem>
                  <MenuItem value="quarter">📅 Last Quarter</MenuItem>
                  <MenuItem value="year">📅 Last Year</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Main Chart */}
      <Card className="chart-container" sx={{ mb: 4 }}>
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
            {chartType === 'bar' && '📊'}
            {chartType === 'pie' && '🥧'}
            {chartType === 'line' && '📈'}
            {chartType === 'area' && '📊'}
            {chartType === 'composed' && '🎭'}
            {' '}
            {chartType.charAt(0).toUpperCase() + chartType.slice(1)} Chart - Device Faults by Company
          </Typography>
          {renderChart()}
        </CardContent>
      </Card>

      {/* Additional Charts Grid */}
      <Grid container spacing={4} className="slide-up">
        {/* Severity Distribution */}
        <Grid item xs={12} md={6}>
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
                🎯 Failures by Severity
              </Typography>
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={[
                      { name: 'High', value: failures.filter(f => f.severity === 'high').length, color: chartColors.error },
                      { name: 'Medium', value: failures.filter(f => f.severity === 'medium').length, color: chartColors.warning },
                      { name: 'Low', value: failures.filter(f => f.severity === 'low').length, color: chartColors.success },
                    ]}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    stroke={theme.palette.background.paper}
                    strokeWidth={2}
                  >
                    {[
                      { name: 'High', value: failures.filter(f => f.severity === 'high').length, color: chartColors.error },
                      { name: 'Medium', value: failures.filter(f => f.severity === 'medium').length, color: chartColors.warning },
                      { name: 'Low', value: failures.filter(f => f.severity === 'low').length, color: chartColors.success },
                    ].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: theme.palette.background.paper,
                      border: `1px solid ${theme.palette.divider}`,
                      borderRadius: '12px',
                      boxShadow: theme.shadows[8]
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Company Performance */}
        <Grid item xs={12} md={6}>
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
                🏆 Company Performance Ranking
              </Typography>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart
                  data={chartData.sort((a, b) => b.failures - a.failures)}
                  layout="horizontal"
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} opacity={0.3} />
                  <XAxis 
                    type="number" 
                    tick={{ fill: theme.palette.text.secondary }}
                    axisLine={{ stroke: theme.palette.divider }}
                  />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    width={120}
                    tick={{ fill: theme.palette.text.secondary }}
                    axisLine={{ stroke: theme.palette.divider }}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: theme.palette.background.paper,
                      border: `1px solid ${theme.palette.divider}`,
                      borderRadius: '12px',
                      boxShadow: theme.shadows[8]
                    }}
                  />
                  <Bar 
                    dataKey="failures" 
                    fill={chartColors.secondary}
                    radius={[0, 4, 4, 0]}
                    stroke={chartColors.secondary}
                    strokeWidth={2}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Trend Analysis */}
        <Grid item xs={12}>
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
                📈 Failure Trend Analysis
              </Typography>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart 
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} opacity={0.3} />
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
                      borderRadius: '12px',
                      boxShadow: theme.shadows[8]
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="failures" 
                    stroke={chartColors.primary} 
                    strokeWidth={4}
                    dot={{ 
                      fill: chartColors.primary, 
                      strokeWidth: 3, 
                      r: 8,
                      stroke: theme.palette.background.paper
                    }}
                    activeDot={{ 
                      r: 10, 
                      stroke: chartColors.primary, 
                      strokeWidth: 3,
                      fill: theme.palette.background.paper
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Chart Summary */}
      <Card className="chart-container" sx={{ mt: 4 }}>
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
            📋 Chart Summary
          </Typography>
          <Grid container spacing={3}>
            {[
              { label: "Total Companies", value: companies.length, color: chartColors.primary },
              { label: "Total Failures", value: failures.reduce((sum, f) => sum + f.failures, 0), color: chartColors.error },
              { label: "High Severity", value: failures.filter(f => f.severity === 'high').length, color: chartColors.error },
              { label: "Average Failures", value: (failures.reduce((sum, f) => sum + f.failures, 0) / failures.length).toFixed(1), color: chartColors.warning },
            ].map((item, index) => (
              <Grid item xs={12} md={3} key={index}>
                <Box 
                  sx={{ 
                    textAlign: 'center',
                    p: 2,
                    borderRadius: '12px',
                    background: `linear-gradient(135deg, ${item.color}15, ${item.color}05)`,
                    border: `1px solid ${item.color}30`,
                  }}
                >
                  <Typography 
                    variant="body2" 
                    color="textSecondary"
                    sx={{ fontWeight: 600, mb: 1 }}
                  >
                    {item.label}
                  </Typography>
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      color: item.color,
                      fontWeight: 800,
                      textShadow: `0 0 20px ${item.color}40`
                    }}
                  >
                    {item.value}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Visualizations;

