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
  RadioGroup,
  Radio,
  FormControlLabel,
  FormLabel,
  InputAdornment,
  Snackbar,
  Alert,
  CircularProgress,
  Divider
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import './ProductRegister.css';

const ProductRegister = () => {
  const [formData, setFormData] = useState({
    productType: 'pizza',
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    category: '',
    ingredients: '',
    size: 'medium', // Only for pizzas
    drinkType: '', // Only for drinks
    volume: '', // Only for drinks
    alcoholic: 'no' // Only for drinks
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  
  const navigate = useNavigate();

  const pizzaCategories = [
    'Tradicional',
    'Especial',
    'Premium',
    'Vegana',
    'Doce'
  ];

  const drinkCategories = [
    'Refrigerante',
    'Suco',
    'Água',
    'Cerveja',
    'Vinho',
    'Outro'
  ];

  const drinkTypes = [
    'Refrigerante',
    'Suco Natural',
    'Água',
    'Cerveja',
    'Vinho',
    'Destilado',
    'Outro'
  ];

  const isPizza = formData.productType === 'pizza';
  const isDrink = formData.productType === 'drink';

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Reset relevant fields when product type changes
    if (name === 'productType') {
      setFormData({
        ...formData,
        [name]: value,
        category: '',
        size: value === 'pizza' ? 'medium' : '',
        drinkType: '',
        volume: '',
        alcoholic: 'no'
      });
    } else if (name === 'price') {
      // Allow only numeric values with up to two decimal places
      const regex = /^\d*\.?\d{0,2}$/;
      if (value === '' || regex.test(value)) {
        setFormData({
          ...formData,
          [name]: value
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
    
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
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Nome do produto é obrigatório';
    }
    
    // Description validation
    if (!formData.description.trim()) {
      newErrors.description = 'Descrição é obrigatória';
    }
    
    // Price validation
    if (!formData.price) {
      newErrors.price = 'Preço é obrigatório';
    } else if (parseFloat(formData.price) <= 0) {
      newErrors.price = 'Preço deve ser maior que zero';
    }
    
    // Category validation
    if (!formData.category) {
      newErrors.category = 'Categoria é obrigatória';
    }
    
    // Pizza-specific validations
    if (isPizza) {
      if (!formData.ingredients.trim()) {
        newErrors.ingredients = 'Ingredientes são obrigatórios';
      }
    }
    
    // Drink-specific validations
    if (isDrink) {
      if (!formData.drinkType) {
        newErrors.drinkType = 'Tipo de bebida é obrigatório';
      }
      
      if (!formData.volume.trim()) {
        newErrors.volume = 'Volume é obrigatório';
      } else if (!/^\d+\s*(ml|L)$/i.test(formData.volume)) {
        newErrors.volume = 'Formato inválido. Use "ml" ou "L" (ex: 500ml, 1L)';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success message
      setSnackbar({
        open: true,
        message: 'Produto cadastrado com sucesso!',
        severity: 'success'
      });
      
      // Reset form or redirect
      setTimeout(() => {
        setFormData({
          productType: 'pizza',
          name: '',
          description: '',
          price: '',
          imageUrl: '',
          category: '',
          ingredients: '',
          size: 'medium',
          drinkType: '',
          volume: '',
          alcoholic: 'no'
        });
      }, 500);
      
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Erro ao cadastrar produto. Tente novamente.',
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
    <Container maxWidth="md" className="product-register-container">
      <Paper elevation={3} className="product-register-paper">
        <Box sx={{ p: { xs: 2, sm: 4 } }}>
          <Box display="flex" alignItems="center" mb={4}>
            <LocalPizzaIcon fontSize="large" color="primary" sx={{ mr: 2 }} />
            <Typography variant="h4" component="h1" className="product-register-title">
              Cadastro de Produto
            </Typography>
          </Box>
          
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Tipo de Produto</FormLabel>
                  <RadioGroup
                    row
                    name="productType"
                    value={formData.productType}
                    onChange={handleChange}
                  >
                    <FormControlLabel value="pizza" control={<Radio />} label="Pizza" />
                    <FormControlLabel value="drink" control={<Radio />} label="Bebida" />
                  </RadioGroup>
                </FormControl>
              </Grid>
              
              <Grid item xs={12}>
                <Divider />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Nome do Produto"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  variant="outlined"
                  required
                  error={!!errors.name}
                  helperText={errors.name}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Preço"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  variant="outlined"
                  required
                  error={!!errors.price}
                  helperText={errors.price}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                  }}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Descrição"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  variant="outlined"
                  required
                  multiline
                  rows={3}
                  error={!!errors.description}
                  helperText={errors.description}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="URL da Imagem"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  variant="outlined"
                  placeholder="https://exemplo.com/imagem.jpg"
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required error={!!errors.category}>
                  <InputLabel>Categoria</InputLabel>
                  <Select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    label="Categoria"
                  >
                    {isPizza ? (
                      pizzaCategories.map((category) => (
                        <MenuItem key={category} value={category}>
                          {category}
                        </MenuItem>
                      ))
                    ) : (
                      drinkCategories.map((category) => (
                        <MenuItem key={category} value={category}>
                          {category}
                        </MenuItem>
                      ))
                    )}
                  </Select>
                  {errors.category && <Typography color="error" variant="caption">{errors.category}</Typography>}
                </FormControl>
              </Grid>
              
              {isPizza && (
                <>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>Tamanho</InputLabel>
                      <Select
                        name="size"
                        value={formData.size}
                        onChange={handleChange}
                        label="Tamanho"
                      >
                        <MenuItem value="small">Pequena</MenuItem>
                        <MenuItem value="medium">Média</MenuItem>
                        <MenuItem value="large">Grande</MenuItem>
                        <MenuItem value="family">Família</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Ingredientes"
                      name="ingredients"
                      value={formData.ingredients}
                      onChange={handleChange}
                      variant="outlined"
                      required
                      multiline
                      rows={2}
                      error={!!errors.ingredients}
                      helperText={errors.ingredients || "Separe os ingredientes por vírgula"}
                      placeholder="Queijo, molho de tomate, calabresa, cebola..."
                    />
                  </Grid>
                </>
              )}
              
              {isDrink && (
                <>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required error={!!errors.drinkType}>
                      <InputLabel>Tipo de Bebida</InputLabel>
                      <Select
                        name="drinkType"
                        value={formData.drinkType}
                        onChange={handleChange}
                        label="Tipo de Bebida"
                      >
                        {drinkTypes.map((type) => (
                          <MenuItem key={type} value={type}>
                            {type}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.drinkType && <Typography color="error" variant="caption">{errors.drinkType}</Typography>}
                    </FormControl>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Volume"
                      name="volume"
                      value={formData.volume}
                      onChange={handleChange}
                      variant="outlined"
                      required
                      error={!!errors.volume}
                      helperText={errors.volume || "Ex: 500ml, 1L, 2L"}
                      placeholder="350ml"
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">Contém Álcool?</FormLabel>
                      <RadioGroup
                        row
                        name="alcoholic"
                        value={formData.alcoholic}
                        onChange={handleChange}
                      >
                        <FormControlLabel value="yes" control={<Radio />} label="Sim" />
                        <FormControlLabel value="no" control={<Radio />} label="Não" />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                </>
              )}
              
              <Grid item xs={12} className="product-register-actions">
                <Box mt={2} display="flex" justifyContent="space-between" flexWrap="wrap" gap={2}>
                  <Button 
                    component={Link} 
                    to="/"
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
                    {loading ? 'Cadastrando...' : 'Cadastrar Produto'}
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

export default ProductRegister;