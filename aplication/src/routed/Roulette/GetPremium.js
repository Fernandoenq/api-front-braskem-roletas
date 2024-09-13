import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'; // Importa o componente Button do MUI
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
import BraskemLogo from '../../assets/BraskemLogo.png';  // Adicionar o tampacopo aqui

function GetPremium() {
  const [isClickable, setIsClickable] = useState(false);
  const [giftId, setGiftId] = useState(null); // Estado para armazenar o giftId
  const [storedGiftName, setstoredgiftName] = useState(null); // Estado para armazenar o giftId
  const [additionalTextVariable, setAdditionalTextVariable] = useState(''); // Estado para o texto adicional
  const navigate = useNavigate();

  const predefinedString = 'Você ganhou um prêmio!';

  useEffect(() => {
    // Obtém o giftId do localStorage
    const storedGiftId = localStorage.getItem('giftId');
    setGiftId(storedGiftId);
    setstoredgiftName(localStorage.getItem('giftName'))
    // Espera 5 segundos antes de habilitar o clique
    const timer = setTimeout(() => {
      setIsClickable(true);
    }, 10);

    return () => clearTimeout(timer); // Limpa o timer se o componente desmontar
  }, []);

  // useEffect para atualizar o texto adicional apenas quando o giftId mudar

  const handleButtonClick = () => {
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
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '100vh',
      }}
    >
      <img
        src={logo}
        alt="Logo"
        style={{
          width: '90%',
        }}
      />

      <Typography
        variant="h6"
        sx={{
          textAlign: 'center',
          width: '70%',
          fontSize: '3rem',
        }}
      >
        {text} {/* Exibe o texto correspondente */}
      </Typography>

      <img
        src={image} // Exibe a imagem correspondente
        alt="Prêmio"
        style={{
          width: '60%',
        }}
      />

      {/* Texto extra acima do botão, apenas se não for o caso 9 */}
      {parseInt(giftId) !== 9 && (
        <Typography
          variant="body1"
          sx={{
            textAlign: 'center',
            fontSize: '2rem',
            fontWeight: 'bold',
            color: 'white',
          }}
        >
          {storedGiftName}
        </Typography>
      )}

      {/* Botão customizado */}
      <Button
        onClick={handleButtonClick}
        variant="outlined"
        sx={{
          marginTop: '3vh',
          padding: '16px 128px', // Aumenta o tamanho do botão
          borderRadius: '50px', // Define bordas arredondadas com raio
          border: '2px solid white', // Define a borda preta
          backgroundColor: 'white', // Fundo branco dentro do botão
          color: 'black', // Texto preto
          fontWeight: 'bold', // Texto em negrito
          fontSize: '1.5rem', // Aumenta o tamanho do texto
          textTransform: 'none', // Remove a transformação de caixa alta do texto
          '&:hover': {
            backgroundColor: '#f5f5f5', // Fundo levemente cinza ao passar o mouse
          },
        }}
        disabled={!isClickable} // Desabilita o botão até que isClickable seja true
      >
        OK
      </Button>

      <img
        src={BraskemLogo} // Exibe a imagem correspondente
        alt="Logo Braskem"
        style={{
          width: '55%',
          position: 'absolute',
          right: '10px',  // Posição fixa à direita
          bottom: '10px',  // Posição fixa na parte inferior
        }}
      />

    </Box>

    
  );
}

export default GetPremium;
