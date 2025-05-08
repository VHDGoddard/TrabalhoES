import { Box, Container, Grid, Typography, Link as MuiLink, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  LinkedIn,
  Phone,
  Email,
  LocationOn,
  Schedule
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <Facebook />, name: 'Facebook', url: '#' },
    { icon: <Instagram />, name: 'Instagram', url: '#' },
    { icon: <Twitter />, name: 'Twitter', url: '#' },
    { icon: <LinkedIn />, name: 'LinkedIn', url: '#' }
  ];

  const footerLinks = [
    { title: 'Início', url: '/' },
    { title: 'Cardápio', url: '/realizar-pedido' },
    { title: 'Sobre Nós', url: '#' },
    { title: 'Cadastre-se', url: '/cadastrar-cliente' },
    { title: 'Termos de Uso', url: '#' },
    { title: 'Política de Privacidade', url: '#' }
  ];

  const contactInfo = [
    { icon: <Phone />, text: '(11) 1234-5678' },
    { icon: <Email />, text: 'contato@pizzariadelicia.com.br' },
    { icon: <LocationOn />, text: 'Rua das Pizzas, 123 - Centro, São Paulo/SP' },
    { icon: <Schedule />, text: 'Aberto todos os dias das 18h às 23h' }
  ];

  return (
    <Box 
      component="footer"
      sx={{
        backgroundColor: 'primary.main',
        color: 'white',
        py: 6,
        mt: 'auto'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Sobre a Pizzaria */}
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Typography 
                variant="h5" 
                component="h3" 
                gutterBottom 
                sx={{ 
                  fontWeight: 700,
                  mb: 2,
                  color: 'secondary.main'
                }}
              >
                Pizzaria Delícia
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                A melhor pizzaria da região, com ingredientes frescos e receitas tradicionais feitas com amor.
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                {socialLinks.map((social, index) => (
                  <IconButton
                    key={index}
                    component="a"
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    sx={{ 
                      color: 'white',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      '&:hover': {
                        backgroundColor: 'secondary.main'
                      }
                    }}
                  >
                    {social.icon}
                  </IconButton>
                ))}
              </Box>
            </motion.div>
          </Grid>

          {/* Links Rápidos */}
          <Grid item xs={12} md={2}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Typography 
                variant="h6" 
                component="h3" 
                gutterBottom 
                sx={{ 
                  fontWeight: 600,
                  mb: 2
                }}
              >
                Links Rápidos
              </Typography>
              <Box component="nav">
                {footerLinks.map((link, index) => (
                  <MuiLink
                    key={index}
                    component={Link}
                    to={link.url}
                    color="inherit"
                    underline="hover"
                    sx={{ 
                      display: 'block',
                      mb: 1,
                      '&:hover': {
                        color: 'secondary.main'
                      }
                    }}
                  >
                    {link.title}
                  </MuiLink>
                ))}
              </Box>
            </motion.div>
          </Grid>

          {/* Contato */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Typography 
                variant="h6" 
                component="h3" 
                gutterBottom 
                sx={{ 
                  fontWeight: 600,
                  mb: 2,
                }}
              >
                Contato
              </Typography>
              <Box>
                {contactInfo.map((item, index) => (
                  <Box 
                    key={index} 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      mb: 2
                    }}
                  >
                    <Box sx={{ mr: 2, color: 'secondary.main' }}>
                      {item.icon}
                    </Box>
                    <Typography variant="body1">
                      {item.text}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </motion.div>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box 
          sx={{ 
            mt: 4,
            pt: 4,
            borderTop: '1px solid rgba(255,255,255,0.1)',
            textAlign: 'center'
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Typography variant="body2">
              © {currentYear} Pizzaria Delícia. Todos os direitos reservados.
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Desenvolvido com ❤️ por [Seu Nome]
            </Typography>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;