import React from 'react';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/fundoInicial.png';  // Imagem de fundo

function LogoPage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/roulleteRegister'); // Redireciona para uma outra página ao clicar em qualquer lugar
  };

  return (
    <Box
      onClick={handleClick} // Adiciona o redirecionamento ao clicar em qualquer lugar da página
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',  // Alinha o conteúdo na parte superior
        height: '90vh',
        backgroundImage: `url(${backgroundImage})`, // Define a imagem de fundo
        backgroundSize: 'cover', // Garante que a imagem cubra toda a tela
        backgroundPosition: 'center', // Centraliza a imagem
        backgroundRepeat: 'no-repeat', // Impede que a imagem se repita
        paddingTop: '10vh', // Adiciona um padding superior para ajustar a posição da imagem
        cursor: 'pointer', // Mostra que a página inteira é clicável
      }}
    >

    </Box>
  );
}

export default LogoPage;
