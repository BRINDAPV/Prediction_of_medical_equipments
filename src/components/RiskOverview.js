// src/pages/RiskOverview.js
import React from 'react';
import { Box, Typography } from '@mui/material';

const RiskOverview = () => {
  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Equipment Risk Overview
      </Typography>
      <Typography>
        This page shows the risk levels of medical equipment based on historical failures and predictive analysis.
      </Typography>
    </Box>
  );
};

export default RiskOverview;
