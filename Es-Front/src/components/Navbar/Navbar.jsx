import { AppBar, Toolbar, Typography, Button, Box, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const location = useLocation();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHomePage = location.pathname === '/';

  return (
    <AppBar position={ isHomePage ? 'fixed' : 'static' }
    sx={{ 
      boxShadow: isScrolled ? '' : isHomePage ? 'none' : '' ,
      backgroundColor: isScrolled ? 'primary.main' : isHomePage ? 'transparent' : 'primary.main', 
      
      transition: 'background-color 0.3s' 
      }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontFamily: '"Bravecho", cursive', fontSize: '2rem'
          
        }}>
          Deliciossa
        </Typography>
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/cadastrar-cliente">
            Cadastrar Cliente
          </Button>
          <Button color="inherit" component={Link} to="/cadastrar-produto">
            Cadastrar Produto
          </Button>
          <Button color={ isScrolled? "secondary" : isHomePage ? "primary" : "secondary"} sx={{ color: isScrolled? "primary.main" : isHomePage ? "inherit" : "primary.main", fontWeight: 600 }} variant="contained" component={Link} to="/realizar-pedido">
            Fazer Pedido
          </Button>
        </Box>
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMenuOpen}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            sx={{ display: { xs: 'block', md: 'none' } }}
          >
            <MenuItem onClick={handleMenuClose} component={Link} to="/">
              Home
            </MenuItem>
            <MenuItem onClick={handleMenuClose} component={Link} to="/cadastrar-cliente">
              Cadastrar Cliente
            </MenuItem>
            <MenuItem onClick={handleMenuClose} component={Link} to="/cadastrar-produto">
              Cadastrar Produto
            </MenuItem>
            <MenuItem onClick={handleMenuClose} component={Link} to="/realizar-pedido">
              Fazer Pedido
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;