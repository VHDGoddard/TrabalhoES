import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../../components/AuthForm/AuthForm';
import authService from '../../services/authService';
import './LoginPage.css';

const LoginPage = ({ initialMode = 'register' }) => {
  const [mode, setMode] = useState(initialMode);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      if (mode === 'login') {
        await authService.login({
          email: formData.email,
          password: formData.password
        });
      } else {
        await authService.register({
          name: formData.name,
          email: formData.email,
          password: formData.password
        });
      }
      // Redirect to home page or dashboard after successful authentication
      navigate('/');
    } catch (error) {
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div 
      className="auth-page"
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
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