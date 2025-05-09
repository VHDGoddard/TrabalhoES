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
import productService from '../../services/productService';
import './ProductRegister.css';

const ProductRegister = () => {
  const [formData, setFormData] = useState({
    productType: 'pizza',
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    category: '',
    size: 'medium', // Only for pizzas
    volume: 'P' // Default to P for drinks
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

  const drinkVolumes = [
    { value: 'P', label: 'Pequeno (P)' },
    { value: 'M', label: 'Médio (M)' },
    { value: 'G', label: 'Grande (G)' }
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
        volume: 'P'
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
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Converte os dados do formulário para o formato esperado pela API
  const mapFormToApiData = () => {
    // Dados base do produto, comuns para pizza e bebida
    const productData = {
      nome: formData.name,
      preco: parseFloat(formData.price),
      observacao: formData.description + (formData.category ? ` | Categoria: ${formData.category}` : ''),
      url: formData.imageUrl || '',
      tipo: isPizza ? 'PIZZA' : 'BEBIDA'
    };

    return productData;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      // 1. Criar o produto base na API
      const productData = mapFormToApiData();
      const productResult = await productService.createProduct(productData);
      
      // 2. Obter o ID do produto criado
      let productId;
      if (productResult && productResult.id) {
        productId = productResult.id;
      } else {
        // Se não tiver ID na resposta, buscamos os produtos e pegamos o último
        const products = await productService.getAllProducts();
        productId = products[products.length - 1].id;
      }
      
      // 3. Criar o tipo específico (pizza ou bebida)
      if (isPizza) {
        // Mapeia o valor de tamanho do front para o valor esperado pelo backend
        const sizeMapping = {
          'small': 'P',
          'medium': 'M',
          'large': 'G',
          'family': 'F'
        };
        
        await productService.createPizza({
          id_produto: productId,
          tamanho: sizeMapping[formData.size]
        });
      } else {
        // Para bebidas
        await productService.createDrink({
          id_produto: productId,
          tamanho: formData.volume
        });
      }
      
      // Mostrar mensagem de sucesso
      setSnackbar({
        open: true,
        message: 'Produto cadastrado com sucesso!',
        severity: 'success'
      });
      
      // Resetar formulário
      setTimeout(() => {
        setFormData({
          productType: 'pizza',
          name: '',
          description: '',
          price: '',
          imageUrl: '',
          category: '',
          size: 'medium',
          volume: 'P'
        });
      }, 500);
      
    } catch (error) {
      console.error('Erro ao cadastrar produto:', error);
      setSnackbar({
        open: true,
        message: `Erro ao cadastrar produto: ${error.message || 'Tente novamente'}`,
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
                  helperText={errors.description || isPizza ? "Inclua os ingredientes na descrição" : ""}
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
              )}
              
              {isDrink && (
                <>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required error={!!errors.volume}>
                      <InputLabel>Volume</InputLabel>
                      <Select
                        name="volume"
                        value={formData.volume}
                        onChange={handleChange}
                        label="Volume"
                      >
                        {drinkVolumes.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.volume && <Typography color="error" variant="caption">{errors.volume}</Typography>}
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