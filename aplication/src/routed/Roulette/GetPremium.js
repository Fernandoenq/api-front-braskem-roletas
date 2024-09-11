import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logopossorteio.png';  // Caminho para o logo
import carinha from '../../assets/carinhanaofoidessavez.png';  // Imagem para "não foi dessa vez"
import camera from '../../assets/camera.png';
import capadecelular from '../../assets/capadecelular.png';
import capaprotetoradecelular from '../../assets/capaprotetoradecelular.png';
import fastpass from '../../assets/fastpass.png';
import fastpass00 from '../../assets/fastpass00.png';
import ingressoRockInRio from '../../assets/ingressoRockInRio.png';
import powerBank from '../../assets/powerBank.png';
import tampacopo from '../../assets/tampacopo.png';  // Adicionar o tampacopo aqui

function GetPremium() {
  const [isClickable, setIsClickable] = useState(false);
  const [giftId, setGiftId] = useState(null); // Estado para armazenar o giftId
  const navigate = useNavigate();

  useEffect(() => {
    // Obtém o giftId do localStorage
    const storedGiftId = localStorage.getItem('giftId');
    setGiftId(storedGiftId);

    // Espera 5 segundos antes de habilitar o clique
    const timer = setTimeout(() => {
      setIsClickable(true);
    }, 5000);

    return () => clearTimeout(timer); // Limpa o timer se o componente desmontar
  }, []);

  const handlePageClick = () => {
    if (isClickable) {
      navigate('/roullete');
    }
  };

  // Função para retornar a imagem e o texto baseado no giftId
  const getImageAndText = () => {
    switch (parseInt(giftId)) {
      case 1:
        return { image: tampacopo, text: 'Retire seu brinde no balcão' };
      case 2:
        return { image: powerBank, text: 'Retire seu brinde no balcão' };
      case 3:
        return { image: capadecelular, text: 'Retire seu brinde no balcão' };
      case 4:
        return { image: capaprotetoradecelular, text: 'Retire seu brinde no balcão' };
      case 5:
        return { image: camera, text: 'Retire seu brinde no balcão' };
      case 6:
        return { image: ingressoRockInRio, text: 'Retire seu brinde no balcão' };
      case 7:
        return { image: fastpass, text: 'Retire seu brinde no balcão' };
      case 8:
        return { image: fastpass00, text: 'Retire seu brinde no balcão' };
      case 9:
      default:
        return { image: carinha, text: 'Poxa, não foi dessa vez. Tente mais tarde.' };
    }
  };

  const { image, text } = getImageAndText(); // Desestrutura a imagem e o texto com base no giftId

  return (
    <Box
      onClick={handlePageClick}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '100vh',
        paddingTop: '1vh',
        cursor: isClickable ? 'pointer' : 'default',
      }}
    >
      <img
        src={logo}
        alt="Logo"
        style={{
          width: '100%',
        }}
      />

      <img
        src={image} // Exibe a imagem correspondente
        alt="Prêmio"
        style={{
          width: '80%',
          marginTop: '5vh',
        }}
      />

      <Typography
        variant="h6"
        sx={{
          marginTop: '5vh',
          textAlign: 'center',
          width: '80%',
          fontSize: '5rem',
        }}
      >
        {text} {/* Exibe o texto correspondente */}
      </Typography>
    </Box>
  );
}

export default GetPremium;
