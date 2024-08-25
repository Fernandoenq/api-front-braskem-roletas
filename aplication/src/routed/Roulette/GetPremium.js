import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';  // Caminho para o logo

function GetPremium() {
  const [isClickable, setIsClickable] = useState(false); // Estado para controlar a habilitação do clique
  const navigate = useNavigate();

  useEffect(() => {
    // Espera 5 segundos antes de habilitar o clique
    const timer = setTimeout(() => {
      setIsClickable(true);
    }, 5000);

    return () => clearTimeout(timer); // Limpa o timer se o componente desmontar
  }, []);

  const handlePageClick = () => {
    if (isClickable) {
      navigate('/roullete'); // Redireciona para a próxima página
    }
  };

  return (
    <Box
      onClick={handlePageClick} // Habilita o clique em qualquer lugar da tela após 5 segundos
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',  // Alinha o conteúdo na parte superior
        height: '100vh',
        paddingTop: '15vh', // Adiciona um padding superior para ajustar a posição da imagem
        cursor: isClickable ? 'pointer' : 'default', // Muda o cursor quando a tela é clicável
      }}
    >
      <img
        src={logo}
        alt="Logo"
        style={{
          width: '70%', // Tamanho padrão da imagem
          '@media (min-width: 600px)': {
            width: '40%', // Tamanho para telas médias e acima
          },
          '@media (min-width: 960px)': {
            width: '30%', // Tamanho para telas grandes
          },
          '@media (min-width: 1999px)': {
            width: '90%', // Tamanho para telas muito grandes
          },
        }}
      />

      <Typography
        variant="h6"
        sx={{
          marginTop: '5vh', // Espaçamento superior para o texto
          textAlign: 'center',
          width: '80%',
          '@media (min-width: 600px)': {
            fontSize: '1.5rem', // Tamanho do texto para telas médias
          },
          '@media (min-width: 960px)': {
            fontSize: '7.5rem', // Tamanho do texto para telas grandes
          },
          '@media (min-width: 1999px)': {
            fontSize: '15rem', // Tamanho do texto para telas muito grandes
          },
        }}
      >
        Retire seu brinde nos postos de troca.
      </Typography>
      
    </Box>
  );
}

export default GetPremium;
