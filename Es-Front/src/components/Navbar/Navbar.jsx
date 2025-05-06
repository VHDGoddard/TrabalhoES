import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Pizzaria Delícia
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/cadastrar-cliente">
            Cadastrar Cliente
          </Button>
          <Button color="inherit" component={Link} to="/cadastrar-produto">
            Cadastrar Produto
          </Button>
          <Button color="secondary" variant="contained" component={Link} to="/realizar-pedido">
            Fazer Pedido
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;