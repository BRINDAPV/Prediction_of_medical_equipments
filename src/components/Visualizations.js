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

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d'];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return '#f44336';
      case 'medium': return '#ff9800';
      case 'low': return '#4caf50';
      default: return '#8884d8';
    }
  };

  const renderChart = () => {
    switch (chartType) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="failures" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        );
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="failures"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="failures" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        );
      case 'area':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="failures" fill="#8884d8" stroke="#8884d8" />
            </AreaChart>
          </ResponsiveContainer>
        );
      case 'composed':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="failures" fill="#8884d8" />
              <Line type="monotone" dataKey="failures" stroke="#ff7300" />
            </ComposedChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Device Fault Visualizations
      </Typography>

      {error && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Chart Controls */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Chart Type</InputLabel>
                <Select
                  value={chartType}
                  label="Chart Type"
                  onChange={(e) => setChartType(e.target.value)}
                >
                  <MenuItem value="bar">Bar Chart</MenuItem>
                  <MenuItem value="pie">Pie Chart</MenuItem>
                  <MenuItem value="line">Line Chart</MenuItem>
                  <MenuItem value="area">Area Chart</MenuItem>
                  <MenuItem value="composed">Composed Chart</MenuItem>
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
                >
                  <MenuItem value="week">Last Week</MenuItem>
                  <MenuItem value="month">Last Month</MenuItem>
                  <MenuItem value="quarter">Last Quarter</MenuItem>
                  <MenuItem value="year">Last Year</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Main Chart */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {chartType.charAt(0).toUpperCase() + chartType.slice(1)} Chart - Device Faults by Company
          </Typography>
          {renderChart()}
        </CardContent>
      </Card>

      {/* Additional Charts Grid */}
      <Grid container spacing={3}>
        {/* Severity Distribution */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Failures by Severity
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={[
                      { name: 'High', value: failures.filter(f => f.severity === 'high').length, color: '#f44336' },
                      { name: 'Medium', value: failures.filter(f => f.severity === 'medium').length, color: '#ff9800' },
                      { name: 'Low', value: failures.filter(f => f.severity === 'low').length, color: '#4caf50' },
                    ]}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {[
                      { name: 'High', value: failures.filter(f => f.severity === 'high').length, color: '#f44336' },
                      { name: 'Medium', value: failures.filter(f => f.severity === 'medium').length, color: '#ff9800' },
                      { name: 'Low', value: failures.filter(f => f.severity === 'low').length, color: '#4caf50' },
                    ].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Company Performance */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Company Performance Ranking
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={chartData.sort((a, b) => b.failures - a.failures)}
                  layout="horizontal"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={100} />
                  <Tooltip />
                  <Bar dataKey="failures" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Trend Analysis */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Failure Trend Analysis
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="failures" 
                    stroke="#8884d8" 
                    strokeWidth={3}
                    dot={{ fill: '#8884d8', strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Chart Summary */}
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Chart Summary
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <Typography variant="body2" color="textSecondary">
                Total Companies
              </Typography>
              <Typography variant="h6">
                {companies.length}
              </Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="body2" color="textSecondary">
                Total Failures
              </Typography>
              <Typography variant="h6">
                {failures.reduce((sum, f) => sum + f.failures, 0)}
              </Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="body2" color="textSecondary">
                High Severity
              </Typography>
              <Typography variant="h6" color="error">
                {failures.filter(f => f.severity === 'high').length}
              </Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="body2" color="textSecondary">
                Average Failures
              </Typography>
              <Typography variant="h6">
                {(failures.reduce((sum, f) => sum + f.failures, 0) / failures.length).toFixed(1)}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Visualizations;

