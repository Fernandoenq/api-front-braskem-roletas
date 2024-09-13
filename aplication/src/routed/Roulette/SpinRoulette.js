import React, { useState, useEffect } from 'react';
import { Box, Button, Snackbar, Alert } from '@mui/material';
import '../../roulette.css'; // Certifique-se de importar o CSS para estilos personalizados
import rouletteImage from '../../assets/roleta.png'; // Caminho para a imagem da roleta
import staticOverlayImage from '../../assets/roletafundo.png'; // Caminho para a imagem estática
import logo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom'; // Para navegação
import pontaImage from '../../assets/Ponto.png'; // Ajuste o caminho conforme necessário


function Roulette() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [buttonDisabled, setButtonDisabled] = useState(false); // Estado para controlar o botão
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // 'success' | 'error'
  const [rouletteId, setRouletteId] = useState(null); // Estado para armazenar o valor de rouletteId
  const [browser, setBrowser] = useState(0);

  const navigate = useNavigate(); // Hook para navegar entre páginas


  useEffect(() => {
    const userAgent = navigator.userAgent;
    console.log('User Agent:', userAgent); // Verifica o valor do userAgent
  
    let detectedBrowser = 0;
    if (navigator.brave) {
      detectedBrowser = 405074; // Brave
      console.log('Navegador detectado como Brave');
    } else if (userAgent.includes('Edg')) {
      detectedBrowser = 309100; // Edge
      console.log('Navegador detectado como Edge');
    } else if (userAgent.includes('Chrome')) {
      detectedBrowser = 109122; // Chrome
      console.log('Navegador detectado como Chrome');
    } else if (userAgent.includes('Firefox')) {
      detectedBrowser = 205937; // Firefox
      console.log('Navegador detectado como Firefox');
    } else{console.log("")}
  
    // Atualiza o estado do navegador
    setBrowser(detectedBrowser);
  }, []);
  
  useEffect(() => {
    // Verifica o valor de browser sempre que ele mudar
    console.log('Valor de browser atualizado:', browser);
  }, [browser]);
  
  
  const handleSpinClick = async () => {
    if (isSpinning || buttonDisabled || !browser) return; // Impede que a roleta seja girada se não houver rouletteId
  
    setIsSpinning(true);
    const personId = localStorage.getItem('PersonId');
  
    // Prepara os dados para a requisição PUT
    
    const awardDate = new Date(new Date().getTime() + -3 * 60 * 60 * 1000)
      .toISOString()
      .replace('T', ' ')
      .substring(0, 19);
    
    console.log(awardDate);
    
    const bodyData = {
      PersonId: personId,
      RouletteId: browser, // Utilizando o rouletteId do localStorage
      AwardDate: awardDate
    };
  
    try {
      const response = await fetch(`http://127.0.0.1:3333//Award/RescueAward`, {
        method: 'PUT', // Método PUT para enviar os dados
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyData) // Envia os dados como corpo da requisição
      });
  
      if (response.status === 200) {
        const responseData = await response.json();
        console.log('Resposta do servidor:', responseData);
        console.log('Resposta do servidor:', responseData.Award[0].GiftName);
  
        // Recebe o GiftId e define o segmentAngle com base no GiftId
        const giftId = responseData.Award[0].GiftId;
        const giftName = responseData.Award[0].GiftName;
  
        // Armazena o giftId no localStorage
        localStorage.setItem('giftId', giftId); // Salva o giftId para ser acessado na próxima página
        localStorage.setItem('giftName', giftName); // Salva o giftId para ser acessado na próxima página
  
        let segmentAngle;
        console.log("giftId");
        console.log(giftId);
  
        switch (giftId) {
          case 1:
            segmentAngle = 300; // Valor para GiftId 1
            break;
          case 2:
            segmentAngle = 180; // Valor para GiftId 2
            break;
          case 3:
            segmentAngle = 340; // Valor para GiftId 3
            break;
          case 4:
            segmentAngle = 220.5; // Valor para GiftId 4
            break;
          case 5:
            segmentAngle = 22.5; // Valor para GiftId 5
            break;
          case 6:
            segmentAngle = 90; // Valor para GiftId 6
            break;
          case 7:
            segmentAngle = 67.5; // Valor para GiftId 7
            break;
          case 8:
            segmentAngle = 270; // Valor para GiftId 8
            break;
          case 9:
            segmentAngle = 145.5; // Valor para GiftId 9
            break;
          default:
            segmentAngle = 145.5; // Valor padrão, caso GiftId não seja de 1 a 9
        }
  
        console.log("segmentAngle");
        console.log(segmentAngle);
        const spins = 20; // Define um número aleatório de voltas
        const newRotation = spins * 360 + segmentAngle; // Gira a roleta para o ângulo alvo
        setRotation(newRotation);
  
      }
      
      else if (response.status === 422) {
        const data = await response.json();
        console.log('Erro 422:', data.Errors);
        setSnackbarMessage(data.Errors.join(', ')); // Junta todas as mensagens de erro em uma só
        setSnackbarSeverity('error');
        setOpenSnackbar(true);  // Abre o Snackbar com a mensagem de erro
  
        let segmentAngle;
        console.log("giftId");
        console.log("Nao foi dessa vez");
        segmentAngle = 145.5;
        const spins = 20; // Define um número aleatório de voltas
        const newRotation = spins * 360 + segmentAngle; // Gira a roleta para o ângulo alvo
        setRotation(newRotation);
  
      } else {
        console.error('Erro ao realizar a requisição', response.status);
      }
    } catch (error) {
      console.error('Erro ao realizar a requisição', error);
    }
  
    setTimeout(() => {
      setIsSpinning(false); // Permite girar novamente após a roleta parar
      setButtonDisabled(true); // Desabilita o botão
      setTimeout(() => {
        navigate('/GetPremium'); // Navega para outra página após 5 segundos
        console.log("outra pagina");
      }, 1000); // Espera 5 segundos antes de navegar
    }, 10000); // Tempo de giro (3 segundos)
  };
  

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="flex-start"
      sx={{
        minHeight: '100vh',
        textAlign: 'center',
      }}
    >
      
        <img
        src={logo}
        alt="Logo"
        style={{
          width: '70%', // Tamanho padrão da imagem
          marginBottom: '5vh', // Espaçamento abaixo da imagem
        }}
      />
      <div className="roulette-container">
        {/* Imagem estática sobreposta */}
        <div className="static-overlay">
          <img src={staticOverlayImage} alt="Overlay" />
        </div>
        {/* Pino */}
        <div
        className="pin"
        style={{
          backgroundImage: `url(${pontaImage})`,
          width: '32px', // Largura do PNG
          height: '82px', // Altura do PNG
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>

        {/* Roleta */}
        <div
          className={`roulette ${isSpinning ? 'spinning' : ''}`}
          style={{ transform: `rotate(${rotation}deg)`, backgroundImage: `url(${rouletteImage})` }}
        ></div>

        {/* Pino */}
        <div className="pin"></div>
      </div>

      <Button
        variant="contained"
        onClick={handleSpinClick}
        disabled={isSpinning || buttonDisabled || !browser} // Desabilita o botão enquanto gira ou se não houver rouletteId
        sx={{
          marginTop: '9vh', // Usando vh para margem superior
          fontSize: '3vw', // Usando vw para ajustar o tamanho do texto
          padding: '1vw 4vw', // Usando vw para o padding
          borderRadius:'70px',
          backgroundColor: 'white',
          color:'black',
          fontWeight: 'bold'
        }}
      >
        GIRAR A ROLETA
      </Button>

      {/* Snackbar para exibir mensagens de sucesso ou erro */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000} // Duração de 3 segundos
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Roulette;
