import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Divider,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  IconButton,
  Badge,
  Alert,
  CircularProgress
} from '@mui/material';
import {
  Add,
  Remove,
  ShoppingCart,
  LocationOn,
  ArrowBack,
  Delete
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import pizzas from '../../assets/pizzas.json';

const OrderPage = () => {
  const navigate = useNavigate();
  const [selectedAddress, setSelectedAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Dynamically import images for pizzas
  const products = pizzas.map(pizza => ({
    ...pizza,
    image: `src/assets${pizza.image}`
  }));

  // Mock de endereços
  const addresses = [
    { id: 1, nickname: 'Casa', street: 'Rua das Flores, 123', neighborhood: 'Centro' },
    { id: 2, nickname: 'Trabalho', street: 'Av. Paulista, 1000', neighborhood: 'Bela Vista' }
  ];

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productId);
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map(item =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
      return prevCart.filter(item => item.id !== productId);
    });
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleSubmit = () => {
    if (!selectedAddress) {
      setError('Selecione um endereço de entrega');
      return;
    }
    if (cart.length === 0) {
      setError('Adicione pelo menos um item ao carrinho');
      return;
    }

    setLoading(true);
    // Simulação de chamada à API
    setTimeout(() => {
      setLoading(false);
      navigate('/realizar-pagamento');
    }, 1500);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton component={Link} to="/" sx={{ mr: 1 }}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
          Fazer Pedido
        </Typography>
      </Box>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
            Cardápio
          </Typography>
      <Grid container spacing={4}>
        {/* Seção de Produtos */}
        <Grid item size={{ xs: 12, md: 8 }}>
          

          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid item size={{ xs: 12, sm: 4 }} key={product.id}>
                <motion.div whileHover={{ y: -5 }}>
                  <Card sx={{ 
                    width: '100%',
                    height: '100%',
                    display: 'flex', 
                    borderRadius: 3,
                    flexDirection: 'column' 
                    }}>
                    <CardMedia
                      component="img"
                      height="160"
                      image={product.image}
                      alt={product.name}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h6" component="h3">
                        {product.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {product.description}
                      </Typography>
                      <Typography variant="h6" color="primary">
                        R$ {product.price.toFixed(2)}
                      </Typography>
                    </CardContent>
                    <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<Add />}
                        onClick={() => addToCart(product)}
                        fullWidth
                      >
                        Adicionar
                      </Button>
                    </Box>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Seção do Carrinho e Endereço */}
        <Grid item size={{ xs: 12, md: 4 }}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2, position: 'sticky', top: 20 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
              Seu Pedido
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            {/* Carrinho */}
            <Box sx={{ mb: 4 }}>
              {cart.length === 0 ? (
                <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
                  Seu carrinho está vazio
                </Typography>
              ) : (
                <>
                  {cart.map(item => (
                    <Box key={item.id} sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {item.name}
                        </Typography>
                        <Typography variant="body1">
                          R$ {(item.price * item.quantity).toFixed(2)}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                        <IconButton
                          size="small"
                          onClick={() => removeFromCart(item.id)}
                          disabled={item.quantity <= 1}
                        >
                          <Remove fontSize="small" />
                        </IconButton>
                        <Typography variant="body1" sx={{ mx: 1 }}>
                          {item.quantity}
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={() => addToCart(item)}
                        >
                          <Add fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => setCart(prevCart => prevCart.filter(cartItem => cartItem.id !== item.id))}
                          sx={{ ml: 2 }}
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>
                  ))}
                  <Divider sx={{ my: 2 }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6">Total:</Typography>
                    <Typography variant="h6" color="primary">
                      R$ {calculateTotal().toFixed(2)}
                    </Typography>
                  </Box>
                </>
              )}
            </Box>

            {/* Seleção de Endereço */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Endereço de Entrega
              </Typography>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Selecione um endereço</InputLabel>
                <Select
                  value={selectedAddress}
                  onChange={(e) => setSelectedAddress(e.target.value)}
                  label="Selecione um endereço"
                >
                  {addresses.map(address => (
                    <MenuItem key={address.id} value={address.id}>
                      <Box>
                        <Typography>{address.nickname}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {address.street} - {address.neighborhood}
                        </Typography>
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                component={Link}
                to="/cadastrar-endereco"
                variant="outlined"
                color="primary"
                size="small"
                startIcon={<LocationOn />}
                fullWidth
              >
                Adicionar novo endereço
              </Button>
            </Box>

            {/* Botão de Finalizar */}
            <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              onClick={handleSubmit}
              disabled={loading || cart.length === 0}
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <ShoppingCart />}
            >
              {loading ? 'Processando...' : 'Finalizar Pedido'}
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default OrderPage;