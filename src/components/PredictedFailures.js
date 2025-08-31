import React from 'react';
import { Box, Typography } from '@mui/material';

const PredictedFailures = () => (
  <Box p={3}>
    <Typography variant="h4" gutterBottom>Predicted Failures</Typography>
    <Typography>Displays equipment predicted to fail soon using machine learning models.</Typography>
  </Box>
);

export default PredictedFailures;