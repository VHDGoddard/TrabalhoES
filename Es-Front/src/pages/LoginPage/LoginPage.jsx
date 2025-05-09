import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthForm from '../../components/AuthForm/AuthForm';
import authService from '../../services/authService';
import './LoginPage.css';

const LoginPage = ({ initialMode = 'login' }) => {
  const [mode, setMode] = useState(initialMode);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Verifica se existe uma rota anterior para retornar após o login
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      if (mode === 'login') {
        // Login usando o serviço de autenticação
        await authService.login({
          email: formData.email,
          password: formData.password
        });
        
        // Redirecionar para a página anterior ou para a home
        navigate(from, { replace: true });
      } else {
        // Registro usando o serviço de autenticação
        await authService.register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          cpf: formData.cpf,
          phone: formData.phone
        });
        
        // Redirecionar para a página de cadastro de endereço após registro bem-sucedido
        navigate('/cadastrar-endereco');
      }
    } catch (error) {
      console.error(`Erro na ${mode === 'login' ? 'autenticação' : 'criação de conta'}:`, error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div 
      className="auth-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="auth-overlay">
        <div className="auth-content">
          <AuthForm 
            mode={mode} 
            onModeChange={setMode} 
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting} 
          />
        </div>
      </div>
    </motion.div>
  );
};

export default LoginPage;