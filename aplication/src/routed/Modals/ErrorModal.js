import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Importar o useNavigate
import fundo from '../../assets/fundomeioescuro.png';

const ErrorModal = ({ open, message, imageUrl, onClose }) => {
  const navigate = useNavigate(); // Inicializar o hook useNavigate

  if (!open) return null; // Não renderiza o modal se ele não estiver aberto

  const handleNavigate = () => {
    navigate('/'); // Redireciona para a nova página
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',  // Largura total da janela
        height: '100vh', // Altura total da janela
        backgroundImage: `url(${fundo})`,
        backgroundSize: 'cover',  // Faz o fundo cobrir toda a tela
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000, // Garantir que esteja acima de outros elementos
      }}
    >
      <Box
        sx={{
          width: '700px',
          height: '300px',
          backgroundColor: 'white',
          borderRadius: '50px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          padding: '20px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
          <img
            src={imageUrl}
            alt="Alerta"
            style={{ width: '150px' }}
          />
        </Box>
        <Typography sx={{ fontSize: '25px', marginBottom: '20px', color: 'black', fontWeight: 'bold' }}>
          {message}
        </Typography>
        <Button
          variant="contained"
          onClick={handleNavigate} // Redireciona para a nova página ao clicar
          sx={{
            fontSize: '20px',
            fontWeight: 'bold',
            width: '200px',
            height: '50px',
            backgroundColor: '#fff',
            color: 'black',
            border: '1px solid #ccc',
            '&:hover': {
              backgroundColor: '#f2f2f2',
            },
          }}
        >
          Sair
        </Button>
      </Box>  
    </Box>
  );
};

export default ErrorModal;
