import React, { useState } from 'react';
import { Box, Button, Typography, Snackbar } from '@mui/material';
import logo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';

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
    {
      question: "A economia circular é uma responsabilidade de todos - iniciativa pública, privada e consumidor – e depende também da participação de cada um para que aconteça na prática.",
      correct: "V"
    },
    {
      question: "Se todo o lixo fosse reciclado, o consumo poderia ser ilimitado.",
      correct: "F"
    },
    {
      question: "Todo lixo que não é orgânico pode ser reciclado.",
      correct: "F"
    },
    {
      question: "Reciclagem é responsabilidade apenas da iniciativa pública.",
      correct: "F"
    },
    {
      question: "O lixo orgânico não precisa ser reutilizado, pode ser descartado de qualquer forma, pois não causa muita poluição.",
      correct: "F"
    },
    {
      question: "Resto de comida, casca de fruta e guardanapos engordurados são lixos orgânicos.",
      correct: "V"
    },
    {
      question: "Todo plástico pode ser reciclado.",
      correct: "V"
    },
    {
      question: "É importante separar o lixo orgânico do reciclável.",
      correct: "V"
    },
    {
      question: "Se eu separo o meu lixo corretamente e faço a coleta seletiva, estou contribuindo para a economia circular e já não preciso ter cuidado com o quanto consumo.",
      correct: "F"
    },
    {
      question: "O único jeito de contribuir com a economia circular é comprando produtos reciclados.",
      correct: "F"
    },
    {
      question: "Quanto mais copos eu acumulo no festival, mais consciente é o meu consumo.",
      correct: "F"
    },
    {
      question: "Quanto menos copos eu acumulo no festival, mais consciente é o meu consumo.",
      correct: "V"
    },
    {
      question: "Quando faço o descarte correto do meu lixo, estou contribuindo para a economia circular.",
      correct: "V"
    },
    {
      question: "Quando reutilizo um produto que não precisa ser descartado, estou praticando o consumo consciente.",
      correct: "V"
    },
    {
      question: "No Rock in Rio, quando devolvo meu copo no bar para que seja lavado e reutilizado, estou praticando o consumo consciente.",
      correct: "V"
    },
    {
      question: "A reutilização e a reciclagem de produtos são positivas para o meio ambiente.",
      correct: "V"
    },
    {
      question: "Praticar o consumo consciente é saber a composição dos produtos.",
      correct: "F"
    },
    {
      question: "Economia circular é sinônimo de reciclagem.",
      correct: "F"
    },
    {
      question: "Descartar resíduos plásticos misturados com resíduos orgânicos não é tão ruim assim, já que os resíduos são separados posteriormente.",
      correct: "F"
    },
    {
      question: "O plástico pode ser reciclado múltiplas vezes, podendo se tornar vários outros produtos a cada nova reciclagem.",
      correct: "V"
    },
    {
      question: "O plástico não é tão importante para a nossa vida e poderia facilmente ser substituído por outros materiais.",
      correct: "F"
    },
    {
      question: "O descarte incorreto de resíduos gera impactos ambientais negativos.",
      correct: "V"
    },
    {
      question: "Para colocar a economia circular em prática é preciso repensar, reduzir, reutilizar e reciclar.",
      correct: "V"
    },
    {
      question: "O plástico ajuda a reduzir o desperdício de alimentos.",
      correct: "V"
    },
    {
      question: "Separar os resíduos orgânicos dos recicláveis é uma atitude responsável e positiva para a preservação do meio ambiente.",
      correct: "V"
    },
    {
      question: "Restos de comida são resíduos orgânicos e não devem ser descartados com o lixo reciclável.",
      correct: "V"
    }
  ];

  // Seleciona aleatoriamente duas perguntas
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

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
  };

  const navigate = useNavigate();

  const handleConfirm = () => {
    setAnswers([...answers, selectedAnswer]);
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer("");
    } else {
      // Quiz finalizado
      const correctAnswers = quizQuestions.filter(
        (question, index) => question.correct === answers[index]
      ).length;

      let message;
      let severity;

      if (correctAnswers === 2) {
        message = "Parabéns! Você mostrou que sabe mesmo como o consumo consciente e a reciclagem são importantes. Continue colocando em prática, aqui no festival e no seu dia-a-dia";
        severity = "success";
      } else if (correctAnswers === 1) {
        message = "Legal! Você mostrou que sabe e ainda aprendeu mais um pouco sobre práticas sustentáveis, como o consumo consciente e a reciclagem. Siga praticando esses bons hábitos no seu dia-a-dia";
        severity = "info";
      } else {
        message = "Não se preocupe! Agora que você aprendeu um pouco sobre o consumo consciente e reciclagem, aproveite para colocar essas ações em prática aqui no festival e no seu dia-a-dia";
        severity = "warning";
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
      justifyContent="flex-start"
      sx={{
        minHeight: '100vh',
        textAlign: 'center',
        gap: '20px',
        paddingTop: {
          xs: '5vh',
          md: '8vh',
          lg: '10vh',
        },
      }}
    >
      <img
        src={logo}
        alt="Logo"
        style={{
          width: '50%',
          marginBottom: '40px',
        }}
      />
      <Typography
        variant="h4"
        sx={{
          marginBottom: '20px',
          fontSize: {
            xs: '1.5rem',
            md: '5rem',
            lg: '9rem',
          },
        }}
      >
        {quizQuestions[currentQuestion].question}
      </Typography>

      <Box display="flex" flexDirection="column" alignItems="center" gap="10px">
        {["V", "F"].map((answer, index) => (
          <Button
            key={index}
            variant={selectedAnswer === answer ? "contained" : "outlined"}
            color="primary"
            onClick={() => handleAnswerClick(answer)}
            sx={{
              width: '100%',
              minWidth: {
                xs: '250px',
                md: '400px',
                lg: '600px',
              },
              fontSize: {
                xs: '1rem',
                md: '3rem',
                lg: '7rem',
              },
              padding: {
                xs: '10px',
                md: '15px',
                lg: '20px',
              },
            }}
          >
            {answer === "V" ? "Verdadeiro" : "Falso"}
          </Button>
        ))}
        <Button
          variant="contained"
          color="secondary"
          onClick={handleConfirm}
          sx={{
            width: '100%',
            minWidth: {
              xs: '250px',
              md: '400px',
              lg: '600px',
            },
            fontSize: {
              xs: '1rem',
              md: '3rem',
              lg: '7rem',
            },
            padding: {
              xs: '10px',
              md: '15px',
              lg: '20px',
            },
          }}
        >
          Confirmar
        </Button>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{
          width: '80%',
          maxWidth: '600px',
          position: 'absolute',
          top: '10%',
        }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{
            width: '100%',
            fontSize: '1.5rem',
            textAlign: 'center',
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Quiz;
