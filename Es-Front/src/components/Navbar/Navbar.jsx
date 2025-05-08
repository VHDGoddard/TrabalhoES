import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AppBar position="fixed" 
    sx={{ 
      boxShadow: isScrolled ? '' : 'none' ,
      backgroundColor: isScrolled ? 'primary.main' : 'transparent', 
      
      transition: 'background-color 0.3s' 
      }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontFamily: '"Bravecho", cursive', fontSize: '2rem'
          
        }}>
          Deliciossa
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
          <Button color={ isScrolled? "secondary" : "primary"} sx={{ color: isScrolled? "primaary.main" : "inherit"}} variant="contained" component={Link} to="/realizar-pedido">
            Fazer Pedido
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;