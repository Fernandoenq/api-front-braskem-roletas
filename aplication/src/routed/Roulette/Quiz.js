import React, { useState, useEffect } from 'react'; // Adicionar useEffect
import { Box, Checkbox, Typography, Button, FormControlLabel } from '@mui/material';
import { styled } from '@mui/system';
import confetti from 'canvas-confetti';
import logo from '../../assets/logobraskem.png';
import parabens from '../../assets/parabens.png';
import legal from '../../assets/legal.png';
import triste from '../../assets/triste.png';
import overlayImage from '../../assets/background.png'; // Nova imagem de fundo sobreposta
import { useNavigate } from 'react-router-dom';

const TransparentCheckbox = styled(Checkbox)(({ theme }) => ({
  '&.MuiCheckbox-root': {
    color: '#000000', // Cor preta para contraste
    transform: 'scale(1.5)', // Aumenta o tamanho do checkbox
  },
  '&.Mui-checked': {
    color: '#000000',
  },
  '&:hover': {
    backgroundColor: 'transparent',
  },
}));

function Quiz() {
  const allQuestions = [
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
      question: "Restos de comida são resíduos orgânicos e não devem devem ser descartados com o lixo reciclável.",
      correct: "V"
    },
  ];


  const getRandomQuestions = () => {
    const shuffled = allQuestions.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 2); // Retorna apenas 2 perguntas aleatórias
  };

  // Estado para armazenar perguntas aleatórias
  const [questions, setQuestions] = useState([]); // Inicializar questions com useState
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [answers, setAnswers] = useState([]);
  const [disabledOptions, setDisabledOptions] = useState(false); // Controla se as respostas estão desabilitadas
  const [quizFinished, setQuizFinished] = useState(false);
  const [finalImage, setFinalImage] = useState(null); // Para armazenar a imagem final
  const navigate = useNavigate();
  const [showButton, setShowButton] = useState(false); // Novo estado para controlar o botão

  useEffect(() => {
    if (quizFinished) {
      const timer = setTimeout(() => {
        setShowButton(true); // Mostrar o botão após 2 segundos
      }, 500);
  
      return () => clearTimeout(timer); // Limpa o timeout caso o componente seja desmontado
    }
  }, [quizFinished]); // Executa quando o quiz é finalizado
  

  useEffect(() => {
    setQuestions(getRandomQuestions()); // Define 2 perguntas aleatórias no início
  }, []); // Adicionar useEffect para definir perguntas aleatórias no início

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    setDisabledOptions(true); // Desabilita o clique após a seleção de uma resposta
    setAnswers([...answers, answer]);

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(""); // Limpa a seleção para a próxima pergunta
        setDisabledOptions(false); // Habilita as opções na próxima pergunta
      } else {
        const correctAnswers = questions.filter(
          (question, index) => question.correct === [...answers, answer][index]
        ).length;

        // Define a imagem final com base no número de respostas corretas
        if (correctAnswers === 2) {
          setFinalImage(parabens); // Se acertar as 2, exibe parabéns
        } else if (correctAnswers === 1) {
          setFinalImage(legal); // Se acertar apenas 1, exibe legal
        } else {
          setFinalImage(triste); // Se errar as 2, exibe triste
        }

        setQuizFinished(true);
      }
    }, 10);
  };

  const handleNavigate = () => {
    navigate('/girarroleta');
  };

  const getButtonPosition = () => {
    // Lógica para definir a posição do botão com base na imagem escolhida
    if (finalImage === parabens) {
      return {
        top: '53%', // Exemplo: ajusta a posição do botão com a imagem "parabens"
        left: '55%',
      };
    } else if (finalImage === triste) {
      return {
        top: '53%', // Exemplo: ajusta a posição do botão com a imagem "triste"
        left: '51.8%',
      };
    } else {
      return {
        top: '53%', // Exemplo: posição padrão com a imagem "legal"
        left: '51%',
      };
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
        background: 'transparent',
      }}
    >
      {!quizFinished && (
        <>
          <Box sx={{ marginTop: '3vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img
              src={logo}
              alt="Logo"
              style={{
                width: '90%',
                marginBottom: '5px',
              }}
            />
          </Box>

          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            sx={{
              maxWidth: '80%',
              minHeight: '200px',
              maxHeight: '300px',
              marginTop: '2vh',
              backgroundColor: '#ffffff',
              padding: '10px 20px',
              borderRadius: '10px',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
              textAlign: 'center',
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 'normal',
                color: '#000000',
                fontSize: '2rem',
              }}
            >
              {currentQuestion + 1}. {questions[currentQuestion]?.question}
            </Typography>

            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              gap="20px"
              sx={{
                marginTop: '30px',
              }}
            >
              {(selectedAnswer === "" || selectedAnswer === "V") && (
                <FormControlLabel
                  control={
                    <TransparentCheckbox
                      checked={selectedAnswer === "V"}
                      onChange={() => handleAnswerClick("V")}
                      disabled={selectedAnswer !== ""}
                    />
                  }
                  label="Verdadeiro"
                  sx={{
                    '& .MuiTypography-root': {
                      fontSize: '2rem',
                      color: '#000000',
                    }
                  }}
                />
              )}

              {(selectedAnswer === "" || selectedAnswer === "F") && (
                <FormControlLabel
                  control={
                    <TransparentCheckbox
                      checked={selectedAnswer === "F"}
                      onChange={() => handleAnswerClick("F")}
                      disabled={selectedAnswer !== ""}
                    />
                  }
                  label="Falso"
                  sx={{
                    '& .MuiTypography-root': {
                      fontSize: '2rem',
                      color: '#000000',
                    }
                  }}
                />
              )}
            </Box>
          </Box>
        </>
      )}

      {quizFinished && finalImage && (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          sx={{
            width: '100vw',
            height: '100vh',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Imagem de fundo sobreposta */}
          <img
            src={overlayImage} // Nova imagem de fundo sobreposta
            alt="Sobreposição"
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              top: 0,
              left: 0,
              zIndex: 1,
              objectFit: 'cover',
            }}
          />

          {/* Imagem de resultado (parabens, legal, triste) */}
          <img
            src={finalImage}
            alt="Resultado"
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              top: 0,
              left: 0,
              zIndex: 2,
              objectFit: 'cover',
            }}
          />

          {/* Botão centralizado, com posição baseada na imagem */}
          {showButton && (
          <Button
            onClick={handleNavigate}
            variant="contained"
            sx={{
              position: 'absolute',
              ...getButtonPosition(), 
              transform: 'translate(-50%, -50%)',
              backgroundColor: '#ffffff',
              color: '#000000',
              padding: '10px 20px',
              fontSize: '1.5rem',
              zIndex: 3,
              '&:hover': {
                backgroundColor: '#f0f0f0',
              },
            }}
          >
            Continuar
          </Button>
        )}

        </Box>
      )}
    </Box>
  );
}

export default Quiz;
