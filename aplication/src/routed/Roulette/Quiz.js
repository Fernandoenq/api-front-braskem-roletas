import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import logo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';

function Quiz() {
  const questions = [
    {
      question: "Qual é a capital da França?",
      answers: ["Paris", "Londres", "Roma"],
      correct: "Paris"
    },
    {
      question: "Qual é o maior oceano do mundo?",
      answers: ["Atlântico", "Pacífico", "Índico"],
      correct: "Pacífico"
    }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
  };

  const navigate = useNavigate(); // Hook para navegação

  const handleConfirm = () => {
    if (selectedAnswer === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
    setSelectedAnswer("");
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Quiz finalizado
      alert(`Quiz finalizado! Sua pontuação é ${score + 1}/${questions.length}`);
      navigate('/girarroleta');
    }
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
        gap: '20px',
        paddingTop: {
          xs: '5vh', // Adiciona padding superior para telas pequenas
          md: '8vh', // Adiciona padding superior para telas médias
          lg: '10vh', // Adiciona padding superior para telas grandes
        },
      }}
    >
      <img
        src={logo}
        alt="Logo"
        style={{
          width: '50%', // Tamanho padrão da imagem
          marginBottom: '40px', // Espaçamento abaixo da imagem
        }}
      />
      <Typography
        variant="h4"
        sx={{
          marginBottom: '20px',
          fontSize: {
            xs: '1.5rem', // Para telas pequenas
            md: '5rem', // Para telas médias
            lg: '9rem', // Para telas grandes
          },
        }}
      >
        {questions[currentQuestion].question}
      </Typography>

      <Box display="flex" flexDirection="column" alignItems="center" gap="10px">
        {questions[currentQuestion].answers.map((answer, index) => (
          <Button
            key={index}
            variant={selectedAnswer === answer ? "contained" : "outlined"}
            color="primary"
            onClick={() => handleAnswerClick(answer)}
            sx={{
              width: '100%',
              minWidth: {
                xs: '250px', // Largura mínima para telas pequenas
                md: '400px', // Largura mínima para telas médias
                lg: '600px', // Largura mínima para telas grandes
              },
              fontSize: {
                xs: '1rem', // Para telas pequenas
                md: '3rem', // Para telas médias
                lg: '7rem', // Para telas grandes
              },
              padding: {
                xs: '10px', // Para telas pequenas
                md: '15px', // Para telas médias
                lg: '20px', // Para telas grandes
              },
            }}
          >
            {answer}
          </Button>
        ))}
      </Box>

      <Button
        variant="contained"
        onClick={handleConfirm}
        disabled={!selectedAnswer}
        sx={{
          marginTop: '20px',
          fontSize: {
            xs: '1rem', // Para telas pequenas
            md: '3rem', // Para telas médias
            lg: '6rem', // Para telas grandes
          },
          padding: {
            xs: '10px 20px', // Para telas pequenas
            md: '15px 30px', // Para telas médias
            lg: '20px 40px', // Para telas grandes
          },
          minWidth: {
            xs: '200px', // Largura mínima do botão de confirmação em telas pequenas
            md: '300px', // Largura mínima do botão de confirmação em telas médias
            lg: '400px', // Largura mínima do botão de confirmação em telas grandes
          },
          backgroundColor: '#Ff6200', // Cor de fundo personalizada
          color: '#FFFFFF', // Cor do texto
        }}
      >
        Confirmar Resposta
      </Button>
    </Box>
  );
}

export default Quiz;
