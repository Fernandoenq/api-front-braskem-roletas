import React, { useState } from 'react';
import { Box, Button, Typography, Snackbar, Alert } from '@mui/material';
import { styled } from '@mui/system';
import confetti from 'canvas-confetti';
import logo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: '8px',
  textTransform: 'none',
  fontSize: '2rem', // Aumentado em 30%
  padding: '20px 40px', // Aumentado em 30%
  color: '#000000',
  backgroundColor: '#ffffff',
  width: '100%',
  maxWidth: '520px', // Aumentado em 30%
  '&:hover': {
    backgroundColor: '#f0f0f0',
  },
}));

const TransparentButton = styled(Button)(({ theme, selected, disabled }) => ({
  borderRadius: '8px',
  textTransform: 'none',
  fontSize: '2rem', // Aumentado em 30%
  padding: '20px 40px', // Aumentado em 30%
  color: selected ? '#000000' : 'white',
  border: '2px solid white',
  backgroundColor: selected ? '#ffffff' : 'transparent',
  width: '100%',
  maxWidth: '520px', // Aumentado em 30%
  opacity: disabled ? 0.5 : 1, // Diminuir a opacidade se desabilitado
  pointerEvents: disabled ? 'none' : 'auto', // Desabilitar interações se desabilitado
  '&:hover': {
    backgroundColor: disabled ? 'transparent' : '#ffffff',
    color: disabled ? 'white' : '#000000',
  },
}));

function Quiz() {
  const questions = [
    {
      question: "Reciclagem é o processo de transformação de um produto em novas matérias-primas que, por sua vez, viram novos produtos.",
      correct: "V"
    },
    {
      question: "Para que um produto passe pela reciclagem e volte para o consumidor na forma de um novo produto, ele precisa ser descartado corretamente (limpo e separado dos resíduos orgânicos para evitar contaminação).",
      correct: "V"
    },
    {
      question: "Para que a economia circular possa acontecer, uma das principais atitudes é a separação do lixo reciclável e do orgânico para que cada um tenha a destinação adequada.",
      correct: "V"
    },
    // adicione as outras perguntas conforme necessário
  ];

  const randomQuestions = () => {
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 2);
  };

  const [quizQuestions, setQuizQuestions] = useState(randomQuestions());
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [answers, setAnswers] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("info");
  const [buttonsDisabled, setButtonsDisabled] = useState(false); // Novo estado para controlar os botões desabilitados

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
  };

  const navigate = useNavigate();

  const handleConfirm = () => {
    if (!selectedAnswer) return; // Não permite confirmar se não houver uma resposta selecionada

    setAnswers([...answers, selectedAnswer]);
    setButtonsDisabled(true); // Desabilita os botões após a seleção

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer("");
      setButtonsDisabled(false); // Reabilita os botões para a próxima pergunta
    } else {
      // Quiz finalizado
      const correctAnswers = quizQuestions.filter(
        (question, index) => question.correct === [...answers, selectedAnswer][index]
      ).length;

      let message;
      let severity;

      if (correctAnswers === 2) {
        message = "Parabéns! Você mostrou que sabe mesmo como o consumo consciente e a reciclagem são importantes. Continue colocando em prática, aqui no festival e no seu dia-a-dia";
        severity = "success";
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setOpenSnackbar(true);

        // Configuração para múltiplos confetes em diferentes posições
        const confettiSettings = [
          { x: 0, y: 0.1 }, // Superior esquerda
          { x: 0, y: 0.5 }, // Meio esquerda
          { x: 0, y: 0.9 }, // Inferior esquerda
          { x: 1, y: 0.1 }, // Superior direita
          { x: 1, y: 0.5 }, // Meio direita
          { x: 1, y: 0.9 }, // Inferior direita
        ];

        confettiSettings.forEach((origin) => {
          confetti({
            particleCount: 100,
            startVelocity: 40, // Aumentado em 30%
            spread: 120,
            origin,
            colors: ['#ff0', '#f00', '#0f0', '#00f', '#ff0', '#f0f'],
            scalar: 1.3, // Aumentando o tamanho dos confetes em 30%
          });
        });

        setTimeout(() => {
          navigate('/girarroleta'); // Navegação para a próxima tela após os confetes
        }, 3000);

        return;  // Evita a navegação imediata
      } else if (correctAnswers === 0) {
        // Efeito para o caso de errar duas perguntas (nuvem de poeira suave nas bordas)
        message = "Tudo bem! Agora você aprendeu um pouco mais sobre práticas sustentáveis. Tente novamente e continue aprimorando seus conhecimentos!";
        severity = "warning";
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setOpenSnackbar(true);

        const smokeSettings = [
          { x: 0, y: 0.1 }, // Superior esquerda
          { x: 1, y: 0.1 }, // Superior direita
          { x: 0, y: 0.9 }, // Inferior esquerda
          { x: 1, y: 0.9 }, // Inferior direita
        ];

        smokeSettings.forEach((origin) => {
          confetti({
            particleCount: 100,
            startVelocity: 15,
            spread: 60,
            origin,
            colors: ['#aaaaaa', '#cccccc'], // Tons de cinza para um efeito mais opaco
            scalar: 1.5, // Poeira 30% maior
            ticks: 300, // Duração maior para uma nuvem mais suave
            shapes: ['circle'], // Partículas suaves e arredondadas
          });
        });

        setTimeout(() => {
          navigate('/girarroleta'); // Navegação para a próxima tela
        }, 3000);

        return; // Evita a navegação imediata
      } else {
        message = "Legal! Você mostrou que sabe e ainda aprendeu mais um pouco sobre práticas sustentáveis, como o consumo consciente e a reciclagem. Siga praticando esses bons hábitos no seu dia-a-dia";
        severity = "info";
      }

      setSnackbarMessage(message);
      setSnackbarSeverity(severity);
      setOpenSnackbar(true);

      // Navega para a próxima página após 3 segundos
      setTimeout(() => {
        navigate('/girarroleta');
      }, 3000);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        minHeight: '100vh',
        padding: '20px',
        background: 'transparent',
      }}
    >
      <Box sx={{ marginTop: '5vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img
          src={logo}
          alt="Logo"
          style={{
            width: '200px',
          }}
        />
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{ flexGrow: 1, maxWidth: '80%' }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'normal',
            color: '#ffffff',
            fontSize: '2.8rem',
            textAlign: 'center',
          }}
        >
          {quizQuestions[currentQuestion].question}
        </Typography>
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap="20px"
        sx={{
          width: '100%',
          maxWidth: '600px',
          marginBottom: '15vh', // Subir os botões
        }}
      >
        {["V", "F"].map((answer, index) => (
          <TransparentButton
            key={index}
            selected={selectedAnswer === answer}
            onClick={() => handleAnswerClick(answer)}
            disabled={buttonsDisabled} // Desabilita os botões após a confirmação
          >
            {answer === "V" ? "Verdadeiro" : "Falso"}
          </TransparentButton>
        ))}
        <StyledButton
          variant="contained"
          onClick={handleConfirm}
          disabled={!selectedAnswer} // Desabilita o botão até que uma resposta seja selecionada
        >
          Confirmar
        </StyledButton>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{
          width: '100%', // Aumentando o tamanho do pop-up em 30%
          maxWidth: '900px', // Máximo de largura maior
          '& .MuiAlert-root': {
            background: 'linear-gradient(135deg, #ff9800 30%, #4caf50 90%)', // Seguindo o design da tela
            color: '#ffffff',
            fontSize: '1.8rem', // Aumentando ainda mais o tamanho do texto
            textAlign: 'center',
            padding: '30px', // Adicionando mais padding para aumentar a altura
          },
        }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Quiz;
