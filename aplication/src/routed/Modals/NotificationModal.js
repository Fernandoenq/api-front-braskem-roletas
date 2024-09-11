import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import fundo from '../../assets/fundomeioescuro.png';

const NotificationModal = ({ open, message, imageUrl, onClose }) => {
  if (!open) return null; // Não renderiza o modal se ele não estiver aberto

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',  // Largura total da janela
        height: '100vh', // Altura total da janela
        backgroundImage: 'url(${fundo})',
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
          onClick={onClose}
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

export default NotificationModal;