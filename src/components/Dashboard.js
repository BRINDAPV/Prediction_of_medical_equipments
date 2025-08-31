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
} from '@mui/material';
import { Search, Warning } from '@mui/icons-material';
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
} from 'recharts';
import { fetchCompanies, fetchFailures } from '../services/api';

const Dashboard = () => {
  const [companies, setCompanies] = useState([]);
  const [failures, setFailures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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
      { id: 1, name: 'MedTech Solutions', parent_company: 'MedTech Corp', address: '123 Medical Dr', representative: 'John Doe', source: 'FDA', created_at: '2024-01-01' },
      { id: 2, name: 'HealthCare Devices', parent_company: 'HealthCare Inc', address: '456 Health Ave', representative: 'Jane Smith', source: 'FDA', created_at: '2024-01-02' },
      { id: 3, name: 'BioMedical Systems', parent_company: 'BioMedical Ltd', address: '789 Bio St', representative: 'Bob Johnson', source: 'FDA', created_at: '2024-01-03' },
      { id: 4, name: 'LifeSupport Tech', parent_company: 'LifeSupport Corp', address: '321 Life Blvd', representative: 'Alice Brown', source: 'FDA', created_at: '2024-01-04' },
      { id: 5, name: 'Emergency Medical', parent_company: 'Emergency Inc', address: '654 Emergency Way', representative: 'Charlie Wilson', source: 'FDA', created_at: '2024-01-05' },
    ];

    const mockFailures = [
      { company: 'MedTech Solutions', failures: 15, severity: 'high' },
      { company: 'HealthCare Devices', failures: 8, severity: 'medium' },
      { company: 'BioMedical Systems', failures: 22, severity: 'high' },
      { company: 'LifeSupport Tech', failures: 5, severity: 'low' },
      { company: 'Emergency Medical', failures: 18, severity: 'high' },
    ];

    setCompanies(mockCompanies);
    setFailures(mockFailures);
  };

  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.parent_company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.representative.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  const chartData = failures.map((failure) => ({
    name: failure.company,
    failures: failure.failures,
    severity: failure.severity,
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard Overview
      </Typography>

      {error && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Major Failure Companies */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Major Failure Companies
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {failures
              .filter((f) => f.severity === 'high')
              .map((failure, index) => (
                <Chip
                  key={index}
                  icon={<Warning />}
                  label={`${failure.company} (${failure.failures} failures)`}
                  color="error"
                  variant="outlined"
                />
              ))}
          </Box>
        </CardContent>
      </Card>

      {/* Charts */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Device Faults by Company
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="failures" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Failure Distribution
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
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
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Data Table */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Company Data
          </Typography>

          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search companies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ mb: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Parent Company</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Representative</TableCell>
                  <TableCell>Source</TableCell>
                  <TableCell>Created At</TableCell>
                  <TableCell>Severity</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredCompanies
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((company) => {
                    const failure = failures.find((f) => f.company === company.name);
                    return (
                      <TableRow key={company.id}>
                        <TableCell>{company.id}</TableCell>
                        <TableCell>{company.name}</TableCell>
                        <TableCell>{company.parent_company}</TableCell>
                        <TableCell>{company.address}</TableCell>
                        <TableCell>{company.representative}</TableCell>
                        <TableCell>{company.source}</TableCell>
                        <TableCell>{company.created_at}</TableCell>
                        <TableCell>
                          {failure && (
                            <Chip
                              label={failure.severity}
                              color={getSeverityColor(failure.severity)}
                              size="small"
                            />
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredCompanies.length}
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

export default Dashboard;
