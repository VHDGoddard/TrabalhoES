import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

// Páginas
import HomePage from './pages/HomePage/HomePage.jsx';
import CustomerRegister from './pages/CustomerRegister/CustomerRegister.jsx';
import AddressRegister from './pages/AddressRegister/AddressRegister.jsx';
import ProductRegister from './pages/ProductRegister/ProductRegister.jsx';
import OrderPage from './pages/OrderPage/OrderPage.jsx';
import PaymentPage from './pages/PaymentPage/PaymentPage.jsx';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage.jsx';

// Componentes
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';

// Tema MUI personalizado
const theme = createTheme({
  palette: {
    primary: {
      main: '#e53935', // Vermelho de pizza
    },
    secondary: {
      main: '#F5F5F5', // Laranja
    },
    text: {
      main: '#2E5339', 
      muted: '#58695D',
    },
    complementary2: {
      main: '#495F41', 
    },
    background: {
      main: '#f5ebe0',
      contrast: '#FBF7F3',
      contrast2: '#d5bdaf',
    }, 
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <AnimatePresence mode='wait'>
          <Routes>
            <Route
              path="/"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <HomePage />
                </motion.div>
              }
            />
            <Route
              path="/cadastrar-cliente"
              element={
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <CustomerRegister />
                </motion.div>
              }
            />
            <Route
              path="/cadastrar-endereco"
              element={
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <AddressRegister />
                </motion.div>
              }
            />
            <Route
              path="/cadastrar-produto"
              element={
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <ProductRegister />
                </motion.div>
              }
            />
            <Route
              path="/realizar-pedido"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <OrderPage />
                </motion.div>
              }
            />
            <Route
              path="/realizar-pagamento"
              element={
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <PaymentPage />
                </motion.div>
              }
            />
            <Route
              path="*"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <NotFoundPage />
                </motion.div>
              }
            />
          </Routes>
        </AnimatePresence>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;