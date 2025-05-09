import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Paper, 
  Container,
  IconButton,
  InputAdornment,
  Link,
  Alert,
  CircularProgress
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import './AuthForm.css';

const AuthForm = ({ mode = 'register', onModeChange, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cpf: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const isLoginMode = mode === 'login';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const formatCPF = (value) => {
    // Remove non-numeric characters
    const numericValue = value.replace(/\D/g, '');
    
    // Format as CPF: 000.000.000-00
    if (numericValue.length <= 3) {
      return numericValue;
    } else if (numericValue.length <= 6) {
      return `${numericValue.slice(0, 3)}.${numericValue.slice(3)}`;
    } else if (numericValue.length <= 9) {
      return `${numericValue.slice(0, 3)}.${numericValue.slice(3, 6)}.${numericValue.slice(6)}`;
    } else {
      return `${numericValue.slice(0, 3)}.${numericValue.slice(3, 6)}.${numericValue.slice(6, 9)}-${numericValue.slice(9, 11)}`;
    }
  };

  const formatPhone = (value) => {
    // Remove non-numeric characters
    const numericValue = value.replace(/\D/g, '');
    
    // Format as phone: (00) 00000-0000
    if (numericValue.length <= 2) {
      return numericValue.length ? `(${numericValue}` : '';
    } else if (numericValue.length <= 7) {
      return `(${numericValue.slice(0, 2)}) ${numericValue.slice(2)}`;
    } else {
      return `(${numericValue.slice(0, 2)}) ${numericValue.slice(2, 7)}-${numericValue.slice(7, 11)}`;
    }
  };

  const handleCPFChange = (e) => {
    const formattedValue = formatCPF(e.target.value);
    setFormData(prev => ({
      ...prev,
      cpf: formattedValue
    }));
  };

  const handlePhoneChange = (e) => {
    const formattedValue = formatPhone(e.target.value);
    setFormData(prev => ({
      ...prev,
      phone: formattedValue
    }));
  };

  const validateForm = () => {
    if (isLoginMode) {
      if (!formData.email || !formData.password) {
        return 'Please fill in all fields';
      }
    } else {
      if (!formData.name || !formData.email || !formData.cpf || !formData.phone || !formData.password || !formData.confirmPassword) {
        return 'Please fill in all fields';
      }
      if (formData.password !== formData.confirmPassword) {
        return 'Passwords do not match';
      }
      if (formData.password.length < 6) {
        return 'Password must be at least 6 characters';
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        return 'Please enter a valid email address';
      }
      
      // CPF validation
      const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
      if (!cpfRegex.test(formData.cpf)) {
        return 'Please enter a valid CPF (format: 000.000.000-00)';
      }
      
      // Phone validation
      const phoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
      if (!phoneRegex.test(formData.phone)) {
        return 'Please enter a valid phone number (format: (00) 00000-0000)';
      }
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError('');
    setLoading(true);
    
    try {
      await onSubmit(formData);
    } catch (error) {
      setError(error.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs" className="auth-form-container">
      <Paper elevation={6} className="auth-form-paper">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            p: 4
          }}
        >
          <Typography component="h1" variant="h5" className="auth-form-title">
            {isLoginMode ? 'Sign In' : 'Create Account'}
          </Typography>
          
          {error && (
            <Alert severity="error" sx={{ width: '100%', mt: 2 }}>
              {error}
            </Alert>
          )}
          
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
            {!isLoginMode && (
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Full Name"
                name="name"
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
              />
            )}
            
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
            />
            
            {!isLoginMode && (
              <>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="cpf"
                  label="CPF"
                  name="cpf"
                  value={formData.cpf}
                  onChange={handleCPFChange}
                  inputProps={{ maxLength: 14 }}
                  placeholder="000.000.000-00"
                />
                
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="phone"
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  inputProps={{ maxLength: 15 }}
                  placeholder="(00) 00000-0000"
                />
              </>
            )}
            
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              id="password"
              autoComplete={isLoginMode ? "current-password" : "new-password"}
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            
            {!isLoginMode && (
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                id="confirmPassword"
                autoComplete="new-password"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
              className="auth-submit-button"
            >
              {loading ? (
                <CircularProgress size={24} />
              ) : (
                isLoginMode ? 'Sign In' : 'Sign Up'
              )}
            </Button>
            
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography variant="body2">
                {isLoginMode 
                  ? "Don't have an account? " 
                  : "Already have an account? "}
                <Link 
                  component="button" 
                  variant="body2" 
                  onClick={() => onModeChange(isLoginMode ? 'register' : 'login')}
                  className="auth-mode-switch"
                >
                  {isLoginMode ? 'Sign Up' : 'Sign In'}
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default AuthForm;