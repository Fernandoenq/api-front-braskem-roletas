import React, { useState } from 'react';
import { Box, Button, Typography, Snackbar, Alert } from '@mui/material';
import { styled } from '@mui/system';
import confetti from 'canvas-confetti';
import logo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';

const StyledButton = styled(Button)(({ theme, disabled }) => ({
  borderRadius: '8px',
  textTransform: 'none',
  fontSize: '2rem',
  padding: '20px 40px',
  color: disabled ? '#ccc' : '#000000',
  backgroundColor: disabled ? '#e0e0e0' : '#ffffff',
  width: '100%',
  maxWidth: '520px',
  '&:hover': {
    backgroundColor: disabled ? '#e0e0e0' : '#f0f0f0',
  },
}));

const TransparentButton = styled(Button)(({ theme, selected, disabled }) => ({
  borderRadius: '8px',
  textTransform: 'none',
  fontSize: '2rem',
  padding: '20px 40px',
  color: selected ? '#000000' : '#ffffff',
  border: '2px solid white',
  backgroundColor: selected ? '#ffffff' : 'transparent',
  width: '100%',
  maxWidth: '520px',
  opacity: disabled ? 0.5 : 1,
  pointerEvents: disabled ? 'none' : 'auto',
  '&:hover': {
    backgroundColor: disabled ? 'transparent' : '#ffffff',
    color: disabled ? '#ffffff' : '#000000',
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
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
  };

  const navigate = useNavigate();

  const handleConfirm = () => {
    if (!selectedAnswer || quizFinished) return;

    setAnswers([...answers, selectedAnswer]);
    setButtonsDisabled(true);

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer("");
      setButtonsDisabled(false);
    } else {
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

        const confettiSettings = [
          { x: 0, y: 0.1 },
          { x: 0, y: 0.5 },
          { x: 0, y: 0.9 },
          { x: 1, y: 0.1 },
          { x: 1, y: 0.5 },
          { x: 1, y: 0.9 },
        ];

        confettiSettings.forEach((origin) => {
          confetti({
            particleCount: 100,
            startVelocity: 40,
            spread: 120,
            origin,
            colors: ['#ff0', '#f00', '#0f0', '#00f', '#ff0', '#f0f'],
            scalar: 1.3,
          });
        });

        setQuizFinished(true);
      } else if (correctAnswers === 0) {
        message = "Tudo bem! Agora você aprendeu um pouco mais sobre práticas sustentáveis. Tente novamente e continue aprimorando seus conhecimentos!";
        severity = "warning";
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setOpenSnackbar(true);

        const smokeSettings = [
          { x: 0, y: 0.1 },
          { x: 1, y: 0.1 },
          { x: 0, y: 0.9 },
          { x: 1, y: 0.9 },
        ];

        smokeSettings.forEach((origin) => {
          confetti({
            particleCount: 100,
            startVelocity: 15,
            spread: 60,
            origin,
            colors: ['#aaaaaa', '#cccccc'],
            scalar: 1.5,
            ticks: 300,
            shapes: ['circle'],
          });
        });

        setQuizFinished(true);
      } else {
        message = "Legal! Você mostrou que sabe e ainda aprendeu mais um pouco sobre práticas sustentáveis, como o consumo consciente e a reciclagem. Siga praticando esses bons hábitos no seu dia-a-dia";
        severity = "info";
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setOpenSnackbar(true);

        setQuizFinished(true);
      }

      // Adiciona o redirecionamento após 5 segundos
      setTimeout(() => {
        navigate('/girarroleta');
      }, 5000);
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
      <Box sx={{ marginTop: '1vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img
          src={logo}
          alt="Logo"
          style={{
            width: '800px', // Ajuste o tamanho conforme necessário
          }}
        />
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{ flexGrow: 1, maxWidth: '80%', marginTop: '0vh' }} // Ajuste de margem superior para subir a pergunta
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
          marginBottom: '15vh',
        }}
      >
        {["V", "F"].map((answer, index) => (
          <TransparentButton
            key={index}
            selected={selectedAnswer === answer}
            onClick={() => handleAnswerClick(answer)}
            disabled={buttonsDisabled}
          >
            {answer === "V" ? "Verdadeiro" : "Falso"}
          </TransparentButton>
        ))}
        <StyledButton
          variant="contained"
          onClick={handleConfirm}
          disabled={!selectedAnswer || quizFinished}
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
          width: '100%',
          maxWidth: '900px',
          '& .MuiAlert-root': {
            background: 'linear-gradient(135deg, #ff9800 30%, #4caf50 90%)',
            color: '#ffffff',
            fontSize: '1.8rem',
            textAlign: 'center',
            padding: '30px',
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
