import { AppBar, Toolbar, Typography, Button, Box, IconButton, Menu, MenuItem, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import authService from '../../services/authService';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check if user is authenticated on component mount and route changes
    setIsAuthenticated(authService.isAuthenticated());
  }, [location]);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
    handleMenuClose();
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
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontFamily: '"Bravecho", cursive', fontSize: '2rem' }}>
          Deliciossa
        </Typography>
        
        {/* Desktop menu */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2, alignItems: 'center' }}>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/cadastrar-cliente">
            Cadastrar Cliente
          </Button>
          <Button color="inherit" component={Link} to="/cadastrar-produto">
            Cadastrar Produto
          </Button>
          <Button 
            color={ isScrolled? "secondary" : isHomePage ? "primary" : "secondary"} 
            sx={{ color: isScrolled? "primary.main" : isHomePage ? "inherit" : "primary.main", fontWeight: 600 }} 
            variant="contained" 
            component={Link} 
            to="/realizar-pedido"
          >
            Fazer Pedido
          </Button>
          
          <Divider orientation="vertical" flexItem sx={{ mx: 1, bgcolor: 'rgba(255, 255, 255, 0.3)' }} />
          
          {isAuthenticated ? (
            <Button 
              color="inherit" 
              startIcon={<PersonOutlineIcon />}
              onClick={handleLogout}
            >
              Sair
            </Button>
          ) : (
            <>
              <Button 
                color="inherit" 
                component={Link} 
                to="/login"
              >
                Entrar
              </Button>
              <Button 
                variant="outlined" 
                color="inherit" 
                component={Link} 
                to="/register"
                sx={{ borderColor: 'rgba(255, 255, 255, 0.7)', '&:hover': { borderColor: 'white' } }}
              >
                Cadastrar
              </Button>
            </>
          )}
        </Box>
        
        {/* Mobile menu */}
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
            <Divider />
            {isAuthenticated ? (
              <MenuItem onClick={handleLogout}>
                Sair
              </MenuItem>
            ) : (
              <>
                <MenuItem onClick={handleMenuClose} component={Link} to="/login">
                  Entrar
                </MenuItem>
                <MenuItem onClick={handleMenuClose} component={Link} to="/register">
                  Cadastrar
                </MenuItem>
              </>
            )}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;