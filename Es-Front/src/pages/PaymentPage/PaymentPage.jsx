import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  TextField,
  Divider,
  Alert,
  CircularProgress
} from '@mui/material';
import {
  CreditCard,
  Pix,
  Money,
  ArrowBack,
  CheckCircle
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const PaymentPage = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (paymentMethod === 'credit' && 
        (!cardData.number || !cardData.name || !cardData.expiry || !cardData.cvv)) {
      setError('Preencha todos os dados do cartão');
      return;
    }

    setLoading(true);
    setError(null);
    
    // Simulação de processamento de pagamento
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      
      // Redirecionar após 3 segundos
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }, 2000);
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    }
    return value;
  };

  const formatExpiry = (value) => {
    const v = value.replace(/[^0-9]/g, '');
    if (v.length >= 3) {
      return `${v.slice(0, 2)}/${v.slice(2, 4)}`;
    }
    return value;
  };

  if (success) {
    return (
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Paper elevation={3} sx={{ p: 6, textAlign: 'center', borderRadius: 2 }}>
            <CheckCircle color="success" sx={{ fontSize: 80, mb: 3 }} />
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
              Pagamento Aprovado!
            </Typography>
            <Typography variant="h6" sx={{ mb: 4 }}>
              Seu pedido foi confirmado e está sendo preparado.
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Você será redirecionado para a página inicial em instantes...
            </Typography>
            <CircularProgress color="primary" sx={{ mt: 4 }} />
          </Paper>
        </motion.div>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Button
          component={Link}
          to="/realizar-pedido"
          startIcon={<ArrowBack />}
          sx={{ mr: 2 }}
        >
          Voltar
        </Button>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
          Finalizar Pagamento
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Métodos de Pagamento */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
              Método de Pagamento
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <FormControl component="fieldset" fullWidth>
              <RadioGroup
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <Paper elevation={1} sx={{ p: 2, mb: 2, borderRadius: 1 }}>
                  <FormControlLabel
                    value="credit"
                    control={<Radio />}
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <CreditCard sx={{ mr: 1 }} />
                        <Typography>Cartão de Crédito</Typography>
                      </Box>
                    }
                  />
                  {paymentMethod === 'credit' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                    >
                      <Box sx={{ mt: 2, pl: 4 }}>
                        <TextField
                          fullWidth
                          label="Número do Cartão"
                          name="number"
                          value={formatCardNumber(cardData.number)}
                          onChange={(e) => {
                            const formatted = formatCardNumber(e.target.value);
                            setCardData({...cardData, number: formatted.replace(/\s/g, '')});
                          }}
                          inputProps={{ maxLength: 19 }}
                          sx={{ mb: 2 }}
                        />
                        <TextField
                          fullWidth
                          label="Nome no Cartão"
                          name="name"
                          value={cardData.name}
                          onChange={handleCardChange}
                          sx={{ mb: 2 }}
                        />
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <TextField
                              fullWidth
                              label="Validade (MM/AA)"
                              name="expiry"
                              value={formatExpiry(cardData.expiry)}
                              onChange={(e) => {
                                const formatted = formatExpiry(e.target.value);
                                setCardData({...cardData, expiry: formatted.replace(/\//g, '')});
                              }}
                              inputProps={{ maxLength: 5 }}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <TextField
                              fullWidth
                              label="CVV"
                              name="cvv"
                              value={cardData.cvv}
                              onChange={(e) => {
                                const v = e.target.value.replace(/\D/g, '');
                                setCardData({...cardData, cvv: v.slice(0, 4)});
                              }}
                              inputProps={{ maxLength: 4 }}
                            />
                          </Grid>
                        </Grid>
                      </Box>
                    </motion.div>
                  )}
                </Paper>

                <Paper elevation={1} sx={{ p: 2, mb: 2, borderRadius: 1 }}>
                  <FormControlLabel
                    value="pix"
                    control={<Radio />}
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Pix sx={{ mr: 1 }} />
                        <Typography>PIX</Typography>
                      </Box>
                    }
                  />
                  {paymentMethod === 'pix' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                    >
                      <Box sx={{ mt: 2, pl: 4 }}>
                        <Typography variant="body2" color="text.secondary">
                          Ao confirmar o pedido, você receberá um QR Code para pagamento via PIX.
                        </Typography>
                      </Box>
                    </motion.div>
                  )}
                </Paper>

                <Paper elevation={1} sx={{ p: 2, borderRadius: 1 }}>
                  <FormControlLabel
                    value="cash"
                    control={<Radio />}
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Money sx={{ mr: 1 }} />
                        <Typography>Dinheiro</Typography>
                      </Box>
                    }
                  />
                  {paymentMethod === 'cash' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                    >
                      <Box sx={{ mt: 2, pl: 4 }}>
                        <Typography variant="body2" color="text.secondary">
                          Pagamento na entrega. Tenha o troco preparado.
                        </Typography>
                      </Box>
                    </motion.div>
                  )}
                </Paper>
              </RadioGroup>
            </FormControl>
          </Paper>
        </Grid>

        {/* Resumo do Pedido */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
              Resumo do Pedido
            </Typography>

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 500 }}>
                Itens do Pedido
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography>Pizza Margherita</Typography>
                  <Typography>R$ 45.90</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography>Pizza Pepperoni</Typography>
                  <Typography>R$ 52.90</Typography>
                </Box>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Subtotal</Typography>
                <Typography>R$ 98.80</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Taxa de Entrega</Typography>
                <Typography>R$ 8.00</Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6">Total</Typography>
                <Typography variant="h6" color="primary">
                  R$ 106.80
                </Typography>
              </Box>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 500 }}>
                Endereço de Entrega
              </Typography>
              <Typography>Rua das Flores, 123</Typography>
              <Typography>Complemento: Ap 101</Typography>
              <Typography>Bairro Centro - São Paulo/SP</Typography>
              <Typography>CEP: 01001000</Typography>
            </Box>

            <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              onClick={handleSubmit}
              disabled={loading}
              sx={{ mt: 2 }}
            >
              {loading ? (
                <>
                  <CircularProgress size={24} color="inherit" sx={{ mr: 1 }} />
                  Processando Pagamento...
                </>
              ) : (
                'Confirmar Pagamento'
              )}
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PaymentPage;