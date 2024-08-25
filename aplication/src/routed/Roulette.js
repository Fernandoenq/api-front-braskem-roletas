import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';  // Caminho para o logo

function LogoPage() {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/roulleteRegister'); // Redireciona para a página de registro
  };

  const handleLoginClick = () => {
    navigate('/roulletelogin'); // Redireciona para a página de login
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',  // Alinha o conteúdo na parte superior
        height: '100vh',
        paddingTop: '10vh', // Adiciona um padding superior para ajustar a posição da imagem
      }}
    >
      <img
        src={logo}
        alt="Logo"
        style={{
          width: '90%', // Tamanho padrão da imagem
          '@media (min-width: 600px)': {
            width: '50%', // Tamanho para telas médias e acima
          },
          '@media (min-width: 960px)': {
            width: '40%', // Tamanho para telas grandes
          },
          '@media (min-width: 1999px)': {
            width: '90%', // Tamanho para telas muito grandes
          },
        }}
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '80%', // Ajusta a largura para os botões
          marginTop: '20px', // Espaçamento acima dos botões
        }}
      >
        <Button
          variant="contained"
          onClick={handleRegisterClick}
          sx={{
            width: '48%', // Cada botão ocupa quase metade da largura disponível
            height: {
              xs: '40px',
              md: '60px',
              lg: '120px',
            },
            fontSize: {
              xs: '16px',
              md: '30px',
              lg: '64px',
            },
            backgroundColor: '#ff6200', // Cor de fundo personalizada
            color: '#FFFFFF', // Cor do texto
            '&:hover': {
            backgroundColor: '#4d148c', // Cor de fundo ao passar o mouse
            },
          }}
        >
          Registrar
        </Button>
        <Button
          variant="contained"
          onClick={handleLoginClick}
          sx={{
            width: '48%', // Cada botão ocupa quase metade da largura disponível
            height: {
              xs: '40px',
              md: '60px',
              lg: '120px',
            },
            fontSize: {
              xs: '16px',
              md: '30px',
              lg: '64px',
            },
            backgroundColor: '#ff6200', // Cor de fundo personalizada
            color: '#FFFFFF', // Cor do texto
            '&:hover': {
            backgroundColor: '#4d148c', // Cor de fundo ao passar o mouse
            },
          }}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
}

export default LogoPage;
