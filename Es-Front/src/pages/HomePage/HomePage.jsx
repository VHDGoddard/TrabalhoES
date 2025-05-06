import { Box, Button, Container, Grid, Typography, Card, CardContent, CardMedia, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import heroImage from '../../assets/images/hero.jpg'; // Substitua por sua imagem
import pizza1 from '../../assets/images/pizza1.jpg'; // Imagens de exemplo
import pizza2 from '../../assets/images/pizza2.jpg';
import pizza3 from '../../assets/images/pizza3.jpg';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const HomePage = () => {
    const theme = useTheme();

    const featuredPizzas = [
        {
            id: 1,
            name: 'Margherita Clássica',
            description: 'Molho de tomate, mussarela fresca, manjericão e azeite',
            image: pizza1,
        },
        {
            id: 2,
            name: 'Pepperoni Picante',
            description: 'Molho de tomate, mussarela, pepperoni e pimenta calabresa',
            image: pizza2,
        },
        {
            id: 3,
            name: 'Quatro Queijos',
            description: 'Mussarela, gorgonzola, parmesão e provolone',
            image: pizza3,
        },
    ];

    return (
        <Box sx={{ overflowX: 'hidden' }}>
            {/* Hero Section */}
            <Box
                sx={{
                    position: 'relative',
                    height: '80vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    mb: 8,
                }}
            >
                <Box
                    component={motion.div}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${heroImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        zIndex: -1,
                    }}
                />
                <Container maxWidth="md">
                    <Box
                        component={motion.div}
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        textAlign="center"
                    >
                        <Typography
                            variant="h1"
                            component="h1"
                            gutterBottom
                            sx={{
                                fontWeight: 700,
                                fontSize: { xs: '2.5rem', md: '4rem' },
                                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                            }}
                        >
                            Pizzaria Delícia
                        </Typography>
                        <Typography
                            variant="h5"
                            component="p"
                            gutterBottom
                            sx={{
                                mb: 4,
                                textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                            }}
                        >
                            As pizzas mais saborosas feitas com ingredientes frescos e amor
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                            <Button
                                component={Link}
                                to="/realizar-pedido"
                                variant="contained"
                                color="primary"
                                size="large"
                                sx={{
                                    px: 4,
                                    py: 1.5,
                                    fontSize: '1.1rem',
                                }}
                            >
                                Faça seu pedido
                            </Button>
                            <Button
                                component={Link}
                                to="/cadastrar-cliente"
                                variant="contained"
                                color="secondary"
                                size="large"
                                sx={{
                                    px: 4,
                                    py: 1.5,
                                    fontSize: '1.1rem',
                                    borderWidth: 2,
                                    '&:hover': { borderWidth: 2 },
                                }}
                            >
                                Cadastre-se
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </Box>

            {/* Featured Pizzas */}
            <Container maxWidth="lg" sx={{ py: 4, pb: '80px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography
                    variant="h3"
                    component="h2"
                    align="center"
                    gutterBottom
                    sx={{ fontWeight: 700, mb: 6 }}
                >
                    Nossas Pizzas Especiais
                </Typography>
                <Grid container spacing={4}>
                    {featuredPizzas.map((pizza, index) => (
                        <Grid item size={{ xs: 12, sm: 6, md: 4 }} key={pizza.id}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.2 }}
                                whileHover={{ y: -10 }}
                            >
                                <Card
                                    sx={{
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        borderRadius: 2,
                                        boxShadow: 3,
                                        transition: 'transform 0.3s',
                                        '&:hover': {
                                            boxShadow: 6,
                                        },
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        image={pizza.image}
                                        alt={pizza.name}
                                        sx={{
                                            height: 200,
                                            width: '100%',
                                            objectFit: 'cover',
                                        }}
                                    />
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography gutterBottom variant="h5" component="h3">
                                            {pizza.name}
                                        </Typography>
                                        <Typography variant="body1" color="text.secondary">
                                            {pizza.description}
                                        </Typography>
                                    </CardContent>
                                    <Box sx={{ p: 2, textAlign: 'left' }}>
                                        <Button
                                            component={Link}
                                            to="/realizar-pedido"
                                            variant="contained"
                                            color="primary"
                                            size="medium"
                                            sx={{
                                                px:2,
                                                py: 1,
                                                borderRadius: '8px',
                                            }}
                                            
                                        >
                                        <AddShoppingCartIcon />
                                        </Button>
                                    </Box>
                                </Card>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* Call to Action */}
            <Box
                sx={{
                    py: 10,
                    backgroundColor: theme.palette.primary.main,
                    color: 'white',
                }}
            >
                <Container maxWidth="lg"  textAlign="center">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
                            Pronto para saborear?
                        </Typography>
                        <Typography variant="h6" component="p" gutterBottom sx={{ mb: 4 }}>
                            Cadastre-se agora e ganhe 10% de desconto no seu primeiro pedido!
                        </Typography>
                        <Button
                            component={Link}
                            to="/cadastrar-cliente"
                            variant="contained"
                            color="secondary"
                            size="large"
                            sx={{
                                px: 6,
                                py: 1.5,
                                fontSize: '1.1rem',
                                fontWeight: 600,
                            }}
                        >
                            Cadastre-se Grátis
                        </Button>
                    </motion.div>
                </Container>
            </Box>

            {/* Features */}
            <Container maxWidth="lg" sx={{ py: 10, color: 'white'}}>
                <Grid container spacing={6}>
                    <Grid item size={{xs: 12, md: 4}} >
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <Box textAlign="center" sx={{ backgroundColor: theme.palette.complementary.main, p: 4, borderRadius: 100, height: 300 }}>
                                <Box
                                    sx={{
                                        width: 80,
                                        height: 80,
                                        backgroundColor: theme.palette.complementary2.main,
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        mx: 'auto',
                                        mb: 3,
                                    }}
                                >
                                    <span style={{ fontSize: '2rem' }}>🚀</span>
                                </Box>
                                <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                                    Entrega Rápida
                                </Typography>
                                <Typography variant="body1" sx>
                                    Nossas pizzas chegam quentinhas em até 40 minutos ou o próximo pedido é por nossa conta!
                                </Typography>
                            </Box>
                        </motion.div>
                    </Grid>
                    <Grid item size={{xs: 12, md: 4}}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <Box textAlign="center" sx={{ backgroundColor: theme.palette.complementary.main, p: 4, borderRadius: 100, height: 300 }}>
                                <Box
                                    sx={{
                                        width: 80,
                                        height: 80,
                                        backgroundColor: theme.palette.primary.light,
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        mx: 'auto',
                                        mb: 3,
                                    }}
                                >
                                    <span style={{ fontSize: '2rem' }}>🍕</span>
                                </Box>
                                <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                                    Ingredientes Frescos
                                </Typography>
                                <Typography variant="body1">
                                    Usamos apenas ingredientes frescos e de alta qualidade para garantir o melhor sabor.
                                </Typography>
                            </Box>
                        </motion.div>
                    </Grid>
                    <Grid item size={{xs: 12, md: 4}}>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <Box textAlign="center" sx={{ backgroundColor: theme.palette.complementary.main, p: 4, borderRadius: 100, height: 300 }}>
                                <Box
                                    sx={{
                                        width: 80,
                                        height: 80,
                                        backgroundColor: theme.palette.primary.light,
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        mx: 'auto',
                                        mb: 3,
                                    }}
                                >
                                    <span style={{ fontSize: '2rem' }}>💳</span>
                                </Box>
                                <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                                    Pagamento Fácil
                                </Typography>
                                <Typography variant="body1">
                                    Aceitamos todos os cartões, Pix e dinheiro. Pagamento rápido e seguro.
                                </Typography>
                            </Box>
                        </motion.div>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default HomePage;