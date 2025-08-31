import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  InputAdornment,
  Chip,
  Alert,
  CircularProgress,
  Tabs,
  Tab,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
} from '@mui/material';
import {
  Search,
  Warning,
  Error,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  ExpandMore,
  Download,
  Assessment,
  Business,
} from '@mui/icons-material';
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
} from 'recharts';

const ManufacturerDashboard = () => {
  const [manufacturerData, setManufacturerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [activeTab, setActiveTab] = useState(0);
  const [filteredData, setFilteredData] = useState({
    worst: [],
    best: []
  });

  useEffect(() => {
    loadManufacturerData();
  }, []);

  useEffect(() => {
    if (manufacturerData) {
      filterData();
    }
  }, [searchTerm, manufacturerData]);

  const loadManufacturerData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/dashboard_data.json');
      const data = await response.json();
      setManufacturerData(data);
    } catch (err) {
      setError('Failed to load manufacturer data. Using mock data instead.');
      loadMockData();
    } finally {
      setLoading(false);
    }
  };

  const loadMockData = () => {
    const mockData = {
      worst_manufacturers: [
        { manufacturer_id: 21240, Class_I: 8, Class_II: 1, Class_III: 1, total_events: 10 },
        { manufacturer_id: 19483, Class_I: 7, Class_II: 1, Class_III: 1, total_events: 9 },
        { manufacturer_id: 21099, Class_I: 7, Class_II: 1, Class_III: 0, total_events: 8 },
      ],
      best_manufacturers: [
        { manufacturer_id: 12345, Class_I: 0, Class_II: 1, Class_III: 8, total_events: 9 },
        { manufacturer_id: 67890, Class_I: 0, Class_II: 2, Class_III: 7, total_events: 9 },
        { manufacturer_id: 11111, Class_I: 1, Class_II: 0, Class_III: 7, total_events: 8 },
      ],
      summary_stats: {
        total_manufacturers: 10137,
        total_events: 45678,
        total_class_i: 1234,
        total_class_ii: 5678,
        total_class_iii: 8765
      }
    };
    setManufacturerData(mockData);
  };

  const filterData = () => {
    if (!manufacturerData) return;

    const filter = (manufacturers) => {
      return manufacturers.filter(manufacturer =>
        manufacturer.manufacturer_id.toString().includes(searchTerm) ||
        manufacturer.total_events.toString().includes(searchTerm)
      );
    };

    setFilteredData({
      worst: filter(manufacturerData.worst_manufacturers),
      best: filter(manufacturerData.best_manufacturers)
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getSeverityColor = (classType, count) => {
    if (count === 0) return 'default';
    switch (classType) {
      case 'Class_I': return 'error';
      case 'Class_II': return 'warning';
      case 'Class_III': return 'success';
      default: return 'default';
    }
  };

  const getSeverityIcon = (classType) => {
    switch (classType) {
      case 'Class_I': return <Error color="error" />;
      case 'Class_II': return <Warning color="warning" />;
      case 'Class_III': return <CheckCircle color="success" />;
      default: return null;
    }
  };

  const exportToCSV = (data, filename) => {
    const headers = ['Manufacturer ID', 'Class I', 'Class II', 'Class III', 'Total Events'];
    const csvContent = [
      headers.join(','),
      ...data.map(item => [
        item.manufacturer_id,
        item.Class_I,
        item.Class_II,
        item.Class_III,
        item.total_events
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (!manufacturerData) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <Alert severity="error">No manufacturer data available</Alert>
      </Box>
    );
  }

  const currentData = activeTab === 0 ? filteredData.worst : filteredData.best;
  const chartData = currentData.slice(0, 20).map(item => ({
    manufacturer_id: item.manufacturer_id,
    Class_I: item.Class_I,
    Class_II: item.Class_II,
    Class_III: item.Class_III,
    total: item.total_events
  }));

  const COLORS = ['#f44336', '#ff9800', '#4caf50'];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        <Business sx={{ mr: 1, verticalAlign: 'middle' }} />
        Manufacturer Action Classification Dashboard
      </Typography>

      {error && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Summary Statistics */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={2.4}>
          <Card sx={{ borderLeft: '4px solid #1976d2' }}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Manufacturers
              </Typography>
              <Typography variant="h4" color="primary">
                {manufacturerData.summary_stats.total_manufacturers.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={2.4}>
          <Card sx={{ borderLeft: '4px solid #f44336' }}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Class I Incidents
              </Typography>
              <Typography variant="h4" color="error">
                {manufacturerData.summary_stats.total_class_i.toLocaleString()}
              </Typography>
              <Typography variant="body2">
                Most Severe
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={2.4}>
          <Card sx={{ borderLeft: '4px solid #ff9800' }}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Class II Incidents
              </Typography>
              <Typography variant="h4" color="warning.main">
                {manufacturerData.summary_stats.total_class_ii.toLocaleString()}
              </Typography>
              <Typography variant="body2">
                Moderate
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={2.4}>
          <Card sx={{ borderLeft: '4px solid #4caf50' }}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Class III Incidents
              </Typography>
              <Typography variant="h4" color="success.main">
                {manufacturerData.summary_stats.total_class_iii.toLocaleString()}
              </Typography>
              <Typography variant="body2">
                Least Severe
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={2.4}>
          <Card sx={{ borderLeft: '4px solid #9c27b0' }}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Events
              </Typography>
              <Typography variant="h4" color="secondary">
                {manufacturerData.summary_stats.total_events.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Priority Explanation */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            <Assessment sx={{ mr: 1, verticalAlign: 'middle' }} />
            Action Classification Priority System
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Error color="error" sx={{ mr: 1 }} />
                <Typography variant="subtitle1" color="error">
                  Class I (Most Severe)
                </Typography>
              </Box>
              <Typography variant="body2" color="textSecondary">
                Life-threatening or serious health risks. Immediate action required.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Warning color="warning" sx={{ mr: 1 }} />
                <Typography variant="subtitle1" color="warning.main">
                  Class II (Moderate)
                </Typography>
              </Box>
              <Typography variant="body2" color="textSecondary">
                Temporary or medically reversible health risks. Prompt action needed.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <CheckCircle color="success" sx={{ mr: 1 }} />
                <Typography variant="subtitle1" color="success.main">
                  Class III (Least Severe)
                </Typography>
              </Box>
              <Typography variant="body2" color="textSecondary">
                Minimal health risks. Routine action may be required.
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Tabs for Worst vs Best Manufacturers */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
            <Tab 
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TrendingDown color="error" sx={{ mr: 1 }} />
                  Worst Manufacturers (Class I Priority)
                </Box>
              } 
            />
            <Tab 
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TrendingUp color="success" sx={{ mr: 1 }} />
                  Best Manufacturers (Class III Priority)
                </Box>
              } 
            />
          </Tabs>

          {/* Search and Export */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
            <TextField
              variant="outlined"
              placeholder="Search by manufacturer ID or event count..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ width: 400 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="outlined"
              startIcon={<Download />}
              onClick={() => exportToCSV(
                currentData, 
                `${activeTab === 0 ? 'worst' : 'best'}_manufacturers.csv`
              )}
            >
              Export to CSV
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Charts */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Top 20 Manufacturers - Incident Distribution
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="manufacturer_id" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Class_I" fill="#f44336" name="Class I" />
                  <Bar dataKey="Class_II" fill="#ff9800" name="Class II" />
                  <Bar dataKey="Class_III" fill="#4caf50" name="Class III" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Classification Distribution
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Class I', value: manufacturerData.summary_stats.total_class_i, color: '#f44336' },
                      { name: 'Class II', value: manufacturerData.summary_stats.total_class_ii, color: '#ff9800' },
                      { name: 'Class III', value: manufacturerData.summary_stats.total_class_iii, color: '#4caf50' },
                    ]}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value.toLocaleString()}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {[
                      { name: 'Class I', value: manufacturerData.summary_stats.total_class_i, color: '#f44336' },
                      { name: 'Class II', value: manufacturerData.summary_stats.total_class_ii, color: '#ff9800' },
                      { name: 'Class III', value: manufacturerData.summary_stats.total_class_iii, color: '#4caf50' },
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
      </Grid>

      {/* Data Table */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {activeTab === 0 ? 'Worst' : 'Best'} Manufacturers - Detailed View
          </Typography>
          
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Manufacturer ID</TableCell>
                  <TableCell>Class I (Most Severe)</TableCell>
                  <TableCell>Class II (Moderate)</TableCell>
                  <TableCell>Class III (Least Severe)</TableCell>
                  <TableCell>Total Events</TableCell>
                  <TableCell>Risk Level</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((manufacturer, index) => (
                    <TableRow key={manufacturer.manufacturer_id}>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                          {manufacturer.manufacturer_id}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          icon={getSeverityIcon('Class_I')}
                          label={manufacturer.Class_I}
                          color={getSeverityColor('Class_I', manufacturer.Class_I)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          icon={getSeverityIcon('Class_II')}
                          label={manufacturer.Class_II}
                          color={getSeverityColor('Class_II', manufacturer.Class_II)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          icon={getSeverityIcon('Class_III')}
                          label={manufacturer.Class_III}
                          color={getSeverityColor('Class_III', manufacturer.Class_III)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {manufacturer.total_events}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {manufacturer.Class_I > 0 ? (
                          <Chip label="High Risk" color="error" size="small" />
                        ) : manufacturer.Class_II > 0 ? (
                          <Chip label="Medium Risk" color="warning" size="small" />
                        ) : (
                          <Chip label="Low Risk" color="success" size="small" />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={currentData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default ManufacturerDashboard;
