import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Alert,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import { Warning, ExpandMore, Error, Warning as WarningIcon, CheckCircle } from '@mui/icons-material';
import { fetchFailures } from '../services/api';

const Failures = () => {
  const [failures, setFailures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadFailures();
  }, []);

  const loadFailures = async () => {
    try {
      setLoading(true);
      const failuresData = await fetchFailures();
      setFailures(failuresData);
    } catch (err) {
      setError('Failed to load failure data. Using mock data instead.');
      loadMockFailures();
    } finally {
      setLoading(false);
    }
  };

  const loadMockFailures = () => {
    const mockFailures = [
      {
        company: 'MedTech Solutions',
        failures: 15,
        severity: 'high',
        details: [
          'Device malfunction in ICU monitors',
          'Software bug in patient monitoring system',
          'Hardware failure in ventilators',
          'Calibration issues in diagnostic equipment',
          'Power supply problems in emergency devices'
        ],
        lastIncident: '2024-01-15',
        totalDevices: 150,
        affectedDevices: 23
      },
      {
        company: 'BioMedical Systems',
        failures: 22,
        severity: 'high',
        details: [
          'Critical failure in life support systems',
          'Data corruption in patient records',
          'Network connectivity issues',
          'Battery failure in portable devices',
          'Sensor calibration drift'
        ],
        lastIncident: '2024-01-20',
        totalDevices: 200,
        affectedDevices: 45
      },
      {
        company: 'Emergency Medical',
        failures: 18,
        severity: 'high',
        details: [
          'Emergency response system failure',
          'Communication breakdown in critical situations',
          'Device overheating issues',
          'Software crash during emergency procedures',
          'Backup system failure'
        ],
        lastIncident: '2024-01-18',
        totalDevices: 180,
        affectedDevices: 38
      },
      {
        company: 'HealthCare Devices',
        failures: 8,
        severity: 'medium',
        details: [
          'Minor software glitches',
          'Intermittent connectivity issues',
          'User interface problems',
          'Documentation errors'
        ],
        lastIncident: '2024-01-10',
        totalDevices: 120,
        affectedDevices: 12
      },
      {
        company: 'LifeSupport Tech',
        failures: 5,
        severity: 'low',
        details: [
          'Cosmetic display issues',
          'Minor performance degradation',
          'User training requirements'
        ],
        lastIncident: '2024-01-05',
        totalDevices: 80,
        affectedDevices: 8
      }
    ];
    setFailures(mockFailures);
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'high':
        return <Error color="error" />;
      case 'medium':
        return <WarningIcon color="warning" />;
      case 'low':
        return <CheckCircle color="success" />;
      default:
        return <WarningIcon />;
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'default';
    }
  };

  const getFailureRate = (affected, total) => {
    return ((affected / total) * 100).toFixed(1);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  const highSeverityFailures = failures.filter(f => f.severity === 'high');
  const mediumSeverityFailures = failures.filter(f => f.severity === 'medium');
  const lowSeverityFailures = failures.filter(f => f.severity === 'low');

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Major Failure Companies
      </Typography>

      {error && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ borderLeft: '4px solid #f44336' }}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                High Severity Failures
              </Typography>
              <Typography variant="h4" color="error">
                {highSeverityFailures.length}
              </Typography>
              <Typography variant="body2">
                Companies with critical issues
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ borderLeft: '4px solid #ff9800' }}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Medium Severity Failures
              </Typography>
              <Typography variant="h4" color="warning.main">
                {mediumSeverityFailures.length}
              </Typography>
              <Typography variant="body2">
                Companies with moderate issues
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ borderLeft: '4px solid #4caf50' }}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Low Severity Failures
              </Typography>
              <Typography variant="h4" color="success.main">
                {lowSeverityFailures.length}
              </Typography>
              <Typography variant="body2">
                Companies with minor issues
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* High Severity Failures */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 2 }}>
        <Error color="error" sx={{ mr: 1, verticalAlign: 'middle' }} />
        Critical Failures Requiring Immediate Attention
      </Typography>

      {highSeverityFailures.map((failure, index) => (
        <Accordion key={index} sx={{ mb: 2 }}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                {getSeverityIcon(failure.severity)}
                <Typography variant="h6" sx={{ ml: 1 }}>
                  {failure.company}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Chip
                  label={`${failure.failures} failures`}
                  color={getSeverityColor(failure.severity)}
                  size="small"
                />
                <Chip
                  label={`${getFailureRate(failure.affectedDevices, failure.totalDevices)}% affected`}
                  variant="outlined"
                  size="small"
                />
              </Box>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" gutterBottom>
                  <strong>Failure Details:</strong>
                </Typography>
                <List dense>
                  {failure.details.map((detail, idx) => (
                    <ListItem key={idx}>
                      <ListItemText primary={detail} />
                    </ListItem>
                  ))}
                </List>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" gutterBottom>
                  <strong>Statistics:</strong>
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText 
                      primary="Total Devices" 
                      secondary={failure.totalDevices} 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Affected Devices" 
                      secondary={failure.affectedDevices} 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Failure Rate" 
                      secondary={`${getFailureRate(failure.affectedDevices, failure.totalDevices)}%`} 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Last Incident" 
                      secondary={failure.lastIncident} 
                    />
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      ))}

      {/* Medium and Low Severity Failures */}
      {mediumSeverityFailures.length > 0 && (
        <>
          <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 2 }}>
            <WarningIcon color="warning" sx={{ mr: 1, verticalAlign: 'middle' }} />
            Moderate Issues
          </Typography>
          {mediumSeverityFailures.map((failure, index) => (
            <Card key={index} sx={{ mb: 2, p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">{failure.company}</Typography>
                <Chip label={`${failure.failures} failures`} color="warning" />
              </Box>
            </Card>
          ))}
        </>
      )}

      {lowSeverityFailures.length > 0 && (
        <>
          <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 2 }}>
            <CheckCircle color="success" sx={{ mr: 1, verticalAlign: 'middle' }} />
            Minor Issues
          </Typography>
          {lowSeverityFailures.map((failure, index) => (
            <Card key={index} sx={{ mb: 2, p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">{failure.company}</Typography>
                <Chip label={`${failure.failures} failures`} color="success" />
              </Box>
            </Card>
          ))}
        </>
      )}
    </Box>
  );
};

export default Failures;

