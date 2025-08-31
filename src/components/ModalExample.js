import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Card,
  CardContent,
  Typography,
  Grid,
  useTheme,
  IconButton,
  Chip,
} from '@mui/material';
import { Close as CloseIcon, Info as InfoIcon, Warning as WarningIcon, CheckCircle as CheckIcon } from '@mui/icons-material';

const ModalExample = () => {
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState('default');
  const theme = useTheme();

  const handleOpen = (type) => {
    setModalType(type);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getModalStyles = () => {
    const baseStyles = {
      '& .MuiDialog-paper': {
        borderRadius: '20px',
        border: `2px solid ${theme.palette.divider}`,
        background: theme.palette.background.modal || theme.palette.background.paper,
        backdropFilter: 'blur(20px)',
        boxShadow: theme.palette.mode === 'dark' 
          ? '0 0 40px rgba(0, 0, 0, 0.8)' 
          : '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      },
      '& .MuiBackdrop-root': {
        backgroundColor: theme.palette.mode === 'dark' 
          ? 'rgba(0, 0, 0, 0.8)' 
          : 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(8px)',
      },
    };

    switch (modalType) {
      case 'success':
        return {
          ...baseStyles,
          '& .MuiDialog-paper': {
            ...baseStyles['& .MuiDialog-paper'],
            borderColor: theme.palette.chart?.success || '#10b981',
            boxShadow: `0 0 30px ${theme.palette.chart?.success || '#10b981'}40`,
          },
        };
      case 'warning':
        return {
          ...baseStyles,
          '& .MuiDialog-paper': {
            ...baseStyles['& .MuiDialog-paper'],
            borderColor: theme.palette.chart?.warning || '#f59e0b',
            boxShadow: `0 0 30px ${theme.palette.chart?.warning || '#f59e0b'}40`,
          },
        };
      case 'error':
        return {
          ...baseStyles,
          '& .MuiDialog-paper': {
            ...baseStyles['& .MuiDialog-paper'],
            borderColor: theme.palette.chart?.error || '#ef4444',
            boxShadow: `0 0 30px ${theme.palette.chart?.error || '#ef4444'}40`,
          },
        };
      default:
        return baseStyles;
    }
  };

  const getModalIcon = () => {
    switch (modalType) {
      case 'success':
        return <CheckIcon sx={{ color: theme.palette.chart?.success || '#10b981', fontSize: 40 }} />;
      case 'warning':
        return <WarningIcon sx={{ color: theme.palette.chart?.warning || '#f59e0b', fontSize: 40 }} />;
      case 'error':
        return <WarningIcon sx={{ color: theme.palette.chart?.error || '#ef4444', fontSize: 40 }} />;
      default:
        return <InfoIcon sx={{ color: theme.palette.chart?.primary || '#3b82f6', fontSize: 40 }} />;
    }
  };

  const getModalTitle = () => {
    switch (modalType) {
      case 'success':
        return 'Success!';
      case 'warning':
        return 'Warning!';
      case 'error':
        return 'Error!';
      default:
        return 'Information';
    }
  };

  const getModalContent = () => {
    switch (modalType) {
      case 'success':
        return 'Your action has been completed successfully. All changes have been saved and applied.';
      case 'warning':
        return 'Please review your input before proceeding. Some fields may need attention.';
      case 'error':
        return 'An error occurred while processing your request. Please try again or contact support.';
      default:
        return 'This is an informational modal demonstrating the improved styling and theme integration.';
    }
  };

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
        🎭 Enhanced Modal Examples
      </Typography>

      <Typography 
        variant="body1" 
        sx={{ 
          color: 'text.secondary',
          mb: 4,
          textAlign: 'center',
          maxWidth: 600,
          mx: 'auto'
        }}
      >
        Experience the improved modal styling with theme-aware colors, enhanced animations, and Tailwind-inspired design.
      </Typography>

      {/* Modal Trigger Buttons */}
      <Grid container spacing={3} justifyContent="center" className="slide-up">
        <Grid item>
          <Button
            variant="contained"
            onClick={() => handleOpen('default')}
            sx={{
              background: `linear-gradient(135deg, ${theme.palette.chart?.primary || '#3b82f6'}, ${theme.palette.chart?.info || '#06b6d4'})`,
              color: 'white',
              px: 4,
              py: 2,
              borderRadius: '12px',
              fontWeight: 600,
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            📋 Default Modal
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            onClick={() => handleOpen('success')}
            sx={{
              background: `linear-gradient(135deg, ${theme.palette.chart?.success || '#10b981'}, ${theme.palette.chart?.info || '#06b6d4'})`,
              color: 'white',
              px: 4,
              py: 2,
              borderRadius: '12px',
              fontWeight: 600,
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            ✅ Success Modal
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            onClick={() => handleOpen('warning')}
            sx={{
              background: `linear-gradient(135deg, ${theme.palette.chart?.warning || '#f59e0b'}, ${theme.palette.chart?.error || '#ef4444'})`,
              color: 'white',
              px: 4,
              py: 2,
              borderRadius: '12px',
              fontWeight: 600,
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            ⚠️ Warning Modal
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            onClick={() => handleOpen('error')}
            sx={{
              background: `linear-gradient(135deg, ${theme.palette.chart?.error || '#ef4444'}, ${theme.palette.chart?.warning || '#f59e0b'})`,
              color: 'white',
              px: 4,
              py: 2,
              borderRadius: '12px',
              fontWeight: 600,
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            ❌ Error Modal
          </Button>
        </Grid>
      </Grid>

      {/* Feature Cards */}
      <Grid container spacing={4} sx={{ mt: 6 }} className="slide-up">
        <Grid item xs={12} md={4}>
          <Card className="chart-container">
            <CardContent sx={{ textAlign: 'center' }}>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${theme.palette.chart?.primary || '#3b82f6'}, ${theme.palette.chart?.secondary || '#8b5cf6'})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 2,
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
                }}
              >
                <Typography variant="h4" sx={{ color: 'white', fontWeight: 700 }}>
                  🎨
                </Typography>
              </Box>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Theme Integration
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Seamlessly adapts to all themes with intelligent color schemes and dynamic styling.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card className="chart-container">
            <CardContent sx={{ textAlign: 'center' }}>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${theme.palette.chart?.success || '#10b981'}, ${theme.palette.chart?.info || '#06b6d4'})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 2,
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
                }}
              >
                <Typography variant="h4" sx={{ color: 'white', fontWeight: 700 }}>
                  ✨
                </Typography>
              </Box>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Enhanced Animations
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Smooth transitions, hover effects, and micro-interactions for better user experience.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card className="chart-container">
            <CardContent sx={{ textAlign: 'center' }}>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${theme.palette.chart?.warning || '#f59e0b'}, ${theme.palette.chart?.error || '#ef4444'})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 2,
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
                }}
              >
                <Typography variant="h4" sx={{ color: 'white', fontWeight: 700 }}>
                  🎯
                </Typography>
              </Box>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Tailwind Design
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Modern design principles inspired by Tailwind CSS with consistent spacing and typography.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Enhanced Modal */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        sx={getModalStyles()}
        TransitionProps={{
          enter: 'slide-up',
          exit: 'slide-down',
        }}
      >
        <DialogTitle sx={{ 
          pb: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: `linear-gradient(135deg, ${theme.palette.background.paper}, ${theme.palette.background.default})`,
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {getModalIcon()}
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              {getModalTitle()}
            </Typography>
          </Box>
          <IconButton
            onClick={handleClose}
            sx={{
              color: 'text.secondary',
              '&:hover': {
                color: 'text.primary',
                transform: 'rotate(90deg)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        
        <DialogContent sx={{ pt: 3 }}>
          <DialogContentText sx={{ 
            fontSize: '1.1rem',
            lineHeight: 1.6,
            color: 'text.primary',
            mb: 2
          }}>
            {getModalContent()}
          </DialogContentText>
          
          <Box sx={{ 
            p: 2, 
            borderRadius: '12px',
            background: `linear-gradient(135deg, ${theme.palette.action.hover}, ${theme.palette.action.selected})`,
            border: `1px solid ${theme.palette.divider}`,
          }}>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
              Modal Features:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {[
                'Theme-aware colors',
                'Enhanced animations',
                'Improved typography',
                'Better spacing',
                'Hover effects',
                'Responsive design'
              ].map((feature, index) => (
                <Chip
                  key={index}
                  label={feature}
                  size="small"
                  sx={{
                    background: theme.palette.chart?.primary || '#3b82f6',
                    color: 'white',
                    fontWeight: 600,
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                    transition: 'transform 0.2s ease',
                  }}
                />
              ))}
            </Box>
          </Box>
        </DialogContent>
        
        <DialogActions sx={{ 
          p: 3, 
          pt: 1,
          background: `linear-gradient(135deg, ${theme.palette.background.paper}, ${theme.palette.background.default})`,
        }}>
          <Button 
            onClick={handleClose}
            sx={{
              color: 'text.secondary',
              '&:hover': {
                color: 'text.primary',
                background: theme.palette.action.hover,
              },
              transition: 'all 0.2s ease',
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleClose}
            variant="contained"
            sx={{
              background: `linear-gradient(135deg, ${theme.palette.chart?.primary || '#3b82f6'}, ${theme.palette.chart?.secondary || '#8b5cf6'})`,
              color: 'white',
              px: 3,
              py: 1,
              borderRadius: '8px',
              fontWeight: 600,
              '&:hover': {
                transform: 'translateY(-1px)',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
              },
              transition: 'all 0.2s ease',
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ModalExample;
