import React from 'react';
import { Box, Typography } from '@mui/material';

const FailureLogs = () => (
  <Box p={3}>
    <Typography variant="h4" gutterBottom>Failure Logs & Prediction Accuracy</Typography>
    <Typography>Logs historical failures and shows the accuracy of predictive models.</Typography>
  </Box>
);

export default FailureLogs;
