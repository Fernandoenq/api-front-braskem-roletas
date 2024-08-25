import React, { useState } from 'react';
import { Box, Button, Snackbar, Alert } from '@mui/material';
import '../../roulette.css'; // Certifique-se de importar o CSS para estilos personalizados
import rouletteImage from '../../assets/roleta.png'; // Caminho para a imagem da roleta
import staticOverlayImage from '../../assets/roletafundo.png'; // Caminho para a imagem estática
import logo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom'; // Para navegação

function Roulette() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [buttonDisabled, setButtonDisabled] = useState(false); // Estado para controlar o botão
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // 'success' | 'error'
  
  const navigate = useNavigate(); // Hook para navegar entre páginas

  const handleSpinClick = async () => {
    if (isSpinning || buttonDisabled) return; // Impede que a roleta seja girada novamente enquanto ainda está girando

    setIsSpinning(true);
    const personId = localStorage.getItem('PersonId');
    const segmentAngle = 112.5;
    /*
    switch (personId) {
      case 1:
        segmentAngle = 67.5 //Tampa de copo (Amarelo)
        break;
      case 2:
        segmentAngle = 90 //Power Bank (Vermelho)
        break;
      case 3:
        segmentAngle = 157.5 //Porta-cartão (Roxo)
        break;
      case 4:
        segmentAngle = 90 //Power Bank (Vermelho)
        break;
      case 5:
        segmentAngle = 90 //Power Bank (Vermelho)
        break;
      case 6:
        segmentAngle = 90 //Power Bank (Vermelho)
        break;
      case 7:
        segmentAngle = 90 //Power Bank (Vermelho)
        break;
      case 8:
        segmentAngle = 90 //Power Bank (Vermelho)
        break;
      case 9:
        segmentAngle = 90 //Power Bank (Vermelho)
        break;
      case 10:
        segmentAngle = 90 //Power Bank (Vermelho)
        break;
      case 11:
        segmentAngle = 90 //Power Bank (Vermelho)
        break;
      case 12:
        segmentAngle = 90 //Power Bank (Vermelho)
        break;
      case 13:
        segmentAngle = 90 //Power Bank (Vermelho)
        break;
      case 14:
        segmentAngle = 90 //Power Bank (Vermelho)
        break;
      case 15:
        segmentAngle = 90 //Power Bank (Vermelho)
        break;
      case 16:
        segmentAngle = 90 //Power Bank (Vermelho)
        break;
      case 17:
        segmentAngle = 90 //Power Bank (Vermelho)
        break;
      default:
        segmentAngle = 90 //Power Bank (Vermelho)
        break;
    }
    */
    const spins = Math.floor(Math.random() * 5) + 5; // Define um número aleatório de voltas
    
    //const segmentAngle = 22.5 //Caixinha JBL (Azul)
    //const segmentAngle = 45 //Pop Socket (Branco)
    ///const segmentAngle = 67.5 //Tampa de copo (Amarelo)
    ///const segmentAngle = 90 //Power Bank (Vermelho)
    //const segmentAngle = 112.5 //Tampa de copo (Verde)
    //const segmentAngle = 135 //Bagginha (Azul)
    ///const segmentAngle = 157.5 //Porta-cartão (Roxo)
    //const segmentAngle = 180 //Pop Socket (Branco)
    //const segmentAngle = 202.5 //Tiroleza Heineken (Amarelo)
    //const segmentAngle = 225 //Ingresso (Vermelho)
    //const segmentAngle = 247.5 //Instax (Verde)
    //const segmentAngle = 270 //Porta-cartão (Azul)
    //const segmentAngle = 292.5 //Tampa de copo (Branco)
    //const segmentAngle = 315 //Mochilinha (Amarelo)
    //const segmentAngle = 337.5 //Porta-cartão (Vermelho)
    //const segmentAngle = 360 //Tampa de copo (verde)
    const targetAngle = 0 * segmentAngle + segmentAngle / 2; // Ajuste conforme necessário

    const newRotation = spins * 360 + segmentAngle; // Gira a roleta para o ângulo alvo
    setRotation(newRotation);

    // Prepara os dados para a requisição PUT
    
    const rouletteId = 205937; // Valor fixo definido no código
    //const awardDate = new Date().toISOString().replace('T', ' ').substring(0, 19); // Data e hora atuais no formato YYYY-MM-DD HH:MM:SS
    const awardDate = "2024-09-14 13:33:00"; // Data e hora atuais no formato YYYY-MM-DD HH:MM:SS
    console.log(personId)
    console.log(rouletteId)
    console.log(awardDate)

    const bodyData = {
        PersonId: personId,
        RouletteId: rouletteId,
        AwardDate: awardDate
    };

    try {
        const response = await fetch(`http://192.168.100.9:3333//Award/RescueAward`, {
            method: 'PUT', // Método PUT para enviar os dados
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyData) // Envia os dados como corpo da requisição
        });

        if (response.status === 200) {
            const responseData = await response.json();
            console.log('Resposta do servidor:', responseData);
        } else if (response.status === 422) {
            const data = await response.json();
            console.log('Erro 422:', data.Errors);
            setSnackbarMessage(data.Errors.join(', ')); // Junta todas as mensagens de erro em uma só
            setSnackbarSeverity('error');
            setOpenSnackbar(true);  // Abre o Snackbar com a mensagem de erro
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
      }, 5000); // Espera 5 segundos antes de navegar
    }, 3000); // Tempo de giro (3 segundos)
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
        paddingTop: '2vh', // Ajusta a posição para subir o conteúdo
      }}
    >
        <img
        src={logo}
        alt="Logo"
        style={{
          width: '50%', // Tamanho padrão da imagem
          marginBottom: '10vh', // Espaçamento abaixo da imagem
        }}
      />
      <div className="roulette-container">
        {/* Imagem estática sobreposta */}
        <div className="static-overlay">
          <img src={staticOverlayImage} alt="Overlay" />
        </div>

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
        color="primary"
        onClick={handleSpinClick}
        disabled={isSpinning || buttonDisabled} // Desabilita o botão enquanto gira ou se estiver permanentemente desabilitado
        sx={{
          marginTop: '9vh', // Usando vh para margem superior
          fontSize: '5vw', // Usando vw para ajustar o tamanho do texto
          padding: '1vw 10vw', // Usando vw para o padding
          borderRadius:'20px'
        }}
      >
        Girar
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
