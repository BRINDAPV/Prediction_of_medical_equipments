import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Button,
  Alert,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  Divider,
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  Download,
  ExpandMore,
  Assessment,
  DataUsage,
  Warning,
  CheckCircle,
  Error,
  Search,
} from '@mui/icons-material';
import { fetchCompanies, fetchFailures } from '../services/api';

const Reports = () => {
  const [companies, setCompanies] = useState([]);
  const [failures, setFailures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCompanies, setFilteredCompanies] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const filtered = companies.filter(company =>
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.parent_company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.representative.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCompanies(filtered);
  }, [searchTerm, companies]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [companiesData, failuresData] = await Promise.all([
        fetchCompanies(),
        fetchFailures(),
      ]);
      setCompanies(companiesData);
      setFailures(failuresData);
      setFilteredCompanies(companiesData);
    } catch (err) {
      setError('Failed to load data. Using mock data instead.');
      loadMockData();
    } finally {
      setLoading(false);
    }
  };

  const loadMockData = () => {
    const mockCompanies = [
      { 
        id: 1, 
        name: 'MedTech Solutions', 
        parent_company: 'MedTech Corp', 
        address: '123 Medical Dr, Medical City, MC 12345', 
        representative: 'John Doe', 
        source: 'FDA', 
        created_at: '2024-01-01',
        updated_at: '2024-01-15',
        comment: 'Primary medical device manufacturer',
        slug: 'medtech-solutions'
      },
      { 
        id: 2, 
        name: 'HealthCare Devices', 
        parent_company: 'HealthCare Inc', 
        address: '456 Health Ave, Health Town, HT 67890', 
        representative: 'Jane Smith', 
        source: 'FDA', 
        created_at: '2024-01-02',
        updated_at: '2024-01-16',
        comment: 'Specialized in diagnostic equipment',
        slug: 'healthcare-devices'
      },
      { 
        id: 3, 
        name: 'BioMedical Systems', 
        parent_company: 'BioMedical Ltd', 
        address: '789 Bio St, Bio City, BC 11111', 
        representative: 'Bob Johnson', 
        source: 'FDA', 
        created_at: '2024-01-03',
        updated_at: '2024-01-17',
        comment: 'Life support systems manufacturer',
        slug: 'biomedical-systems'
      },
      { 
        id: 4, 
        name: 'LifeSupport Tech', 
        parent_company: 'LifeSupport Corp', 
        address: '321 Life Blvd, Life City, LC 22222', 
        representative: 'Alice Brown', 
        source: 'FDA', 
        created_at: '2024-01-04',
        updated_at: '2024-01-18',
        comment: 'Emergency medical equipment',
        slug: 'lifesupport-tech'
      },
      { 
        id: 5, 
        name: 'Emergency Medical', 
        parent_company: 'Emergency Inc', 
        address: '654 Emergency Way, Emergency City, EC 33333', 
        representative: 'Charlie Wilson', 
        source: 'FDA', 
        created_at: '2024-01-05',
        updated_at: '2024-01-19',
        comment: 'Critical care equipment provider',
        slug: 'emergency-medical'
      }
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
    setFilteredCompanies(mockCompanies);
  };

  const getDataQualityScore = () => {
    const totalFields = companies.length * 9; // 9 fields per company
    const filledFields = companies.reduce((sum, company) => {
      return sum + Object.values(company).filter(value => value !== null && value !== undefined && value !== '').length;
    }, 0);
    return Math.round((filledFields / totalFields) * 100);
  };

  const getDataCompleteness = () => {
    const fields = ['name', 'parent_company', 'address', 'representative', 'source', 'comment'];
    const completeness = {};
    
    fields.forEach(field => {
      const filled = companies.filter(company => company[field] && company[field].trim() !== '').length;
      completeness[field] = Math.round((filled / companies.length) * 100);
    });
    
    return completeness;
  };

  const exportToCSV = () => {
    const headers = ['ID', 'Name', 'Parent Company', 'Address', 'Representative', 'Source', 'Comment', 'Slug', 'Created At', 'Updated At'];
    const csvContent = [
      headers.join(','),
      ...filteredCompanies.map(company => [
        company.id,
        `"${company.name}"`,
        `"${company.parent_company}"`,
        `"${company.address}"`,
        `"${company.representative}"`,
        `"${company.source}"`,
        `"${company.comment}"`,
        `"${company.slug}"`,
        company.created_at,
        company.updated_at
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'manufacturers_report.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const exportToJSON = () => {
    const dataStr = JSON.stringify(filteredCompanies, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'manufacturers_report.json';
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

  const dataQualityScore = getDataQualityScore();
  const dataCompleteness = getDataCompleteness();

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dataset Reports & Analysis
      </Typography>

      {error && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Data Quality Metrics */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Card sx={{ borderLeft: '4px solid #1976d2' }}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Data Quality Score
              </Typography>
              <Typography variant="h4" color="primary">
                {dataQualityScore}%
              </Typography>
              <Typography variant="body2">
                Overall data completeness
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ borderLeft: '4px solid #4caf50' }}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Companies
              </Typography>
              <Typography variant="h4" color="success.main">
                {companies.length}
              </Typography>
              <Typography variant="body2">
                Manufacturers in database
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ borderLeft: '4px solid #ff9800' }}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                High Risk Companies
              </Typography>
              <Typography variant="h4" color="warning.main">
                {failures.filter(f => f.severity === 'high').length}
              </Typography>
              <Typography variant="body2">
                Requiring attention
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ borderLeft: '4px solid #f44336' }}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Failures
              </Typography>
              <Typography variant="h4" color="error">
                {failures.reduce((sum, f) => sum + f.failures, 0)}
              </Typography>
              <Typography variant="body2">
                Reported incidents
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Data Completeness Analysis */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            <DataUsage sx={{ mr: 1, verticalAlign: 'middle' }} />
            Data Completeness Analysis
          </Typography>
          <Grid container spacing={2}>
            {Object.entries(dataCompleteness).map(([field, percentage]) => (
              <Grid item xs={12} md={4} key={field}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                    {field.replace('_', ' ')}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body2" sx={{ mr: 1 }}>
                      {percentage}%
                    </Typography>
                    {percentage === 100 ? (
                      <CheckCircle color="success" fontSize="small" />
                    ) : percentage >= 80 ? (
                      <Warning color="warning" fontSize="small" />
                    ) : (
                      <Error color="error" fontSize="small" />
                    )}
                  </Box>
                </Box>
                <Box sx={{ width: '100%', bgcolor: 'grey.200', borderRadius: 1, mt: 1 }}>
                  <Box
                    sx={{
                      width: `${percentage}%`,
                      height: 8,
                      bgcolor: percentage === 100 ? 'success.main' : percentage >= 80 ? 'warning.main' : 'error.main',
                      borderRadius: 1,
                    }}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Export Controls */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            <Assessment sx={{ mr: 1, verticalAlign: 'middle' }} />
            Export Reports
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              startIcon={<Download />}
              onClick={exportToCSV}
              color="primary"
            >
              Export to CSV
            </Button>
            <Button
              variant="outlined"
              startIcon={<Download />}
              onClick={exportToJSON}
              color="secondary"
            >
              Export to JSON
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Dataset Details */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Complete Dataset Information
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
                  <TableCell>Comment</TableCell>
                  <TableCell>Slug</TableCell>
                  <TableCell>Created At</TableCell>
                  <TableCell>Updated At</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredCompanies.map((company) => (
                  <TableRow key={company.id}>
                    <TableCell>{company.id}</TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        {company.name}
                      </Typography>
                    </TableCell>
                    <TableCell>{company.parent_company}</TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ maxWidth: 200, wordWrap: 'break-word' }}>
                        {company.address}
                      </Typography>
                    </TableCell>
                    <TableCell>{company.representative}</TableCell>
                    <TableCell>
                      <Chip label={company.source} size="small" color="primary" />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ maxWidth: 150, wordWrap: 'break-word' }}>
                        {company.comment}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                        {company.slug}
                      </Typography>
                    </TableCell>
                    <TableCell>{company.created_at}</TableCell>
                    <TableCell>{company.updated_at}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="body2" color="textSecondary">
              Showing {filteredCompanies.length} of {companies.length} companies
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Data Schema Information */}
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Dataset Schema
          </Typography>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography>Field Descriptions</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List dense>
                <ListItem>
                  <ListItemText 
                    primary="id" 
                    secondary="Unique identifier for each manufacturer record" 
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="name" 
                    secondary="Company name as registered" 
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="parent_company" 
                    secondary="Parent or holding company name" 
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="address" 
                    secondary="Physical address of the company" 
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="representative" 
                    secondary="Primary contact person" 
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="source" 
                    secondary="Data source (e.g., FDA, internal)" 
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="comment" 
                    secondary="Additional notes or comments" 
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="slug" 
                    secondary="URL-friendly identifier" 
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="created_at" 
                    secondary="Record creation timestamp" 
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="updated_at" 
                    secondary="Last update timestamp" 
                  />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Reports;

