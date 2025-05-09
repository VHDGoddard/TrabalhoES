import React, { useState } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
  CircularProgress
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import addressService from '../../services/addressService';
import authService from '../../services/authService';
import './AddressRegister.css';

const AddressRegister = () => {
  const [formData, setFormData] = useState({
    cep: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    reference: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetchingCep, setFetchingCep] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  
  const navigate = useNavigate();

  const brazilianStates = [
    { value: 'AC', label: 'Acre' },
    { value: 'AL', label: 'Alagoas' },
    { value: 'AP', label: 'Amapá' },
    { value: 'AM', label: 'Amazonas' },
    { value: 'BA', label: 'Bahia' },
    { value: 'CE', label: 'Ceará' },
    { value: 'DF', label: 'Distrito Federal' },
    { value: 'ES', label: 'Espírito Santo' },
    { value: 'GO', label: 'Goiás' },
    { value: 'MA', label: 'Maranhão' },
    { value: 'MT', label: 'Mato Grosso' },
    { value: 'MS', label: 'Mato Grosso do Sul' },
    { value: 'MG', label: 'Minas Gerais' },
    { value: 'PA', label: 'Pará' },
    { value: 'PB', label: 'Paraíba' },
    { value: 'PR', label: 'Paraná' },
    { value: 'PE', label: 'Pernambuco' },
    { value: 'PI', label: 'Piauí' },
    { value: 'RJ', label: 'Rio de Janeiro' },
    { value: 'RN', label: 'Rio Grande do Norte' },
    { value: 'RS', label: 'Rio Grande do Sul' },
    { value: 'RO', label: 'Rondônia' },
    { value: 'RR', label: 'Roraima' },
    { value: 'SC', label: 'Santa Catarina' },
    { value: 'SP', label: 'São Paulo' },
    { value: 'SE', label: 'Sergipe' },
    { value: 'TO', label: 'Tocantins' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // CEP validation
    const cepRegex = /^\d{5}-?\d{3}$/;
    if (!formData.cep.trim()) {
      newErrors.cep = 'CEP é obrigatório';
    } else if (!cepRegex.test(formData.cep)) {
      newErrors.cep = 'CEP inválido (formato: 00000-000)';
    }
    
    // Street validation
    if (!formData.street.trim()) {
      newErrors.street = 'Rua é obrigatória';
    }
    
    // Number validation
    if (!formData.number.trim()) {
      newErrors.number = 'Número é obrigatório';
    }
    
    // Neighborhood validation
    if (!formData.neighborhood.trim()) {
      newErrors.neighborhood = 'Bairro é obrigatório';
    }
    
    // City validation
    if (!formData.city.trim()) {
      newErrors.city = 'Cidade é obrigatória';
    }
    
    // State validation
    if (!formData.state) {
      newErrors.state = 'Estado é obrigatório';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatCEP = (value) => {
    // Remove non-numeric characters
    const numericValue = value.replace(/\D/g, '');
    
    // Format as CEP: 00000-000
    if (numericValue.length <= 5) {
      return numericValue;
    } else {
      return `${numericValue.slice(0, 5)}-${numericValue.slice(5, 8)}`;
    }
  };

  const handleCEPChange = (e) => {
    const formattedValue = formatCEP(e.target.value);
    setFormData({
      ...formData,
      cep: formattedValue
    });
    
    // If CEP is complete, fetch address data
    if (formattedValue.length === 9) {
      fetchAddressByCEP(formattedValue);
    }
  };

  const fetchAddressByCEP = async (cep) => {
    setFetchingCep(true);
    
    try {
      const addressData = await addressService.getAddressByCEP(cep);
      
      setFormData(prev => ({
        ...prev,
        street: addressData.street || prev.street,
        neighborhood: addressData.neighborhood || prev.neighborhood,
        city: addressData.city || prev.city,
        state: addressData.state || prev.state
      }));
      
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
      setErrors(prev => ({
        ...prev,
        cep: 'CEP não encontrado ou inválido'
      }));
      
      setSnackbar({
        open: true,
        message: 'Erro ao buscar endereço. Verifique o CEP informado.',
        severity: 'error'
      });
    } finally {
      setFetchingCep(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      // Verificar se o usuário está autenticado
      if (!authService.isAuthenticated()) {
        setSnackbar({
          open: true,
          message: 'Você precisa estar logado para cadastrar um endereço.',
          severity: 'warning'
        });
        setTimeout(() => navigate('/login'), 2000);
        return;
      }
      
      // Obter ID do usuário atual
      const currentUser = authService.getCurrentUser();
      const userId = currentUser?.id || null;
      
      if (!userId) {
        throw new Error('ID de usuário não encontrado');
      }
      
      // Preparar dados para a API
      const addressData = {
        rua: formData.street,
        numero: parseInt(formData.number, 10),
        complemento: formData.complement || '',
        bairro: formData.neighborhood,
        cep: formData.cep,
        referencia: formData.reference || '',
        user: userId
      };
      
      // Enviar dados para a API
      const response = await addressService.createAddress(addressData);
      
      // Show success message
      setSnackbar({
        open: true,
        message: 'Endereço cadastrado com sucesso!',
        severity: 'success'
      });
      
      // Redirect to order page
      setTimeout(() => {
        navigate('/realizar-pedido');
      }, 1500);
      
    } catch (error) {
      console.error('Erro ao cadastrar endereço:', error);
      setSnackbar({
        open: true,
        message: `Erro ao cadastrar endereço: ${error.message || 'Tente novamente'}`,
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false
    });
  };

  return (
    <Container maxWidth="md" className="address-register-container">
      <Paper elevation={3} className="address-register-paper">
        <Box sx={{ p: { xs: 2, sm: 4 } }}>
          <Box display="flex" alignItems="center" mb={4}>
            <LocationOnIcon fontSize="large" color="primary" sx={{ mr: 2 }} />
            <Typography variant="h4" component="h1" className="address-register-title">
              Cadastro de Endereço
            </Typography>
          </Box>
          
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="CEP"
                  name="cep"
                  value={formData.cep}
                  onChange={handleCEPChange}
                  variant="outlined"
                  required
                  inputProps={{ maxLength: 9 }}
                  error={!!errors.cep}
                  helperText={errors.cep}
                  placeholder="00000-000"
                  InputProps={{
                    endAdornment: fetchingCep && <CircularProgress size={20} />
                  }}
                />
              </Grid>
              
              <Grid item xs={12} sm={8}>
                <TextField
                  fullWidth
                  label="Rua"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  variant="outlined"
                  required
                  error={!!errors.street}
                  helperText={errors.street}
                />
              </Grid>
              
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Número"
                  name="number"
                  value={formData.number}
                  onChange={handleChange}
                  variant="outlined"
                  required
                  error={!!errors.number}
                  helperText={errors.number}
                />
              </Grid>
              
              <Grid item xs={12} sm={8}>
                <TextField
                  fullWidth
                  label="Complemento"
                  name="complement"
                  value={formData.complement}
                  onChange={handleChange}
                  variant="outlined"
                  placeholder="Apto, Bloco, Casa, etc."
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Bairro"
                  name="neighborhood"
                  value={formData.neighborhood}
                  onChange={handleChange}
                  variant="outlined"
                  required
                  error={!!errors.neighborhood}
                  helperText={errors.neighborhood}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Cidade"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  variant="outlined"
                  required
                  error={!!errors.city}
                  helperText={errors.city}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required error={!!errors.state}>
                  <InputLabel>Estado</InputLabel>
                  <Select
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    label="Estado"
                  >
                    {brazilianStates.map((state) => (
                      <MenuItem key={state.value} value={state.value}>
                        {state.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.state && <Typography color="error" variant="caption">{errors.state}</Typography>}
                </FormControl>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Ponto de referência"
                  name="reference"
                  value={formData.reference}
                  onChange={handleChange}
                  variant="outlined"
                  placeholder="Próximo à..."
                />
              </Grid>
              
              <Grid item xs={12} className="address-register-actions">
                <Box mt={2} display="flex" justifyContent="space-between" flexWrap="wrap" gap={2}>
                  <Button 
                    component={Link} 
                    to="/cadastrar-cliente"
                    variant="outlined" 
                    color="primary"
                  >
                    Voltar
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={loading}
                    size="large"
                    endIcon={loading ? <CircularProgress size={20} /> : null}
                  >
                    {loading ? 'Cadastrando...' : 'Cadastrar e continuar para pedido'}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Paper>
      
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AddressRegister;