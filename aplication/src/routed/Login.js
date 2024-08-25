import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import Keyboard from 'react-simple-keyboard';
import { useNavigate } from 'react-router-dom';
import 'react-simple-keyboard/build/css/index.css';
import '../style.css'; // Importar seu CSS personalizado

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [inputName, setInputName] = useState(''); // Para determinar qual input está ativo
  const [keyboardInput, setKeyboardInput] = useState({
    username: '',
    password: ''
  });

  const navigate = useNavigate(); // Hook para navegação

  const handleLogin = () => {
    console.log('Usuário:', username);
    console.log('Senha:', password);
    navigate('/roullete');
  };

  const handleKeyboardChange = (input) => {
    setKeyboardInput({
      ...keyboardInput,
      [inputName]: input
    });

    if (inputName === 'username') {
      setUsername(input);
    } else if (inputName === 'password') {
      setPassword(input);
    }
  };

  const handleInputFocus = (name) => {
    setInputName(name);
  };

  const handleInputChange = (e) => {
    const { value } = e.target;

    if (inputName === 'username') {
      setUsername(value);
      setKeyboardInput({ ...keyboardInput, username: value });
    } else if (inputName === 'password') {
      setPassword(value);
      setKeyboardInput({ ...keyboardInput, password: value });
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        minHeight: '90vh', // Ocupa toda a altura da viewport
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: {
            xs: '100%', // Para telas pequenas (smartphones)
            sm: '100%', // Para telas médias (tablets)
            md: '800px', // Para Full HD (monitores padrão)
            lg: '1800px', // Para 4K
          },
          minHeight: {
            xs: 'auto',
            md: '800px', // Altura mínima para Full HD
            lg: '1500px', // Altura mínima para 4K
          },
          maxHeight: {
            xs: 'auto',
            md: '800px', // Altura máxima para Full HD
            lg: '1920px', // Altura máxima para 4K
          },
          padding: '24px',
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          align="center"
          color={"white"}
          sx={{
            fontSize: {
              xs: '1.5rem', // Tamanho do texto em telas pequenas
              md: '5rem', // Tamanho do texto em Full HD
              lg: '9rem', // Tamanho do texto em 4K
            },
          }}
        >
          Login
        </Typography>
        <TextField
          label="Nome de Usuário"
          variant="outlined"
          margin="normal"
          value={username}
          onFocus={() => handleInputFocus('username')}
          onChange={handleInputChange} // Captura entrada do teclado físico
          fullWidth
          sx={{
            '& .MuiInputBase-input': {
              fontSize: {
                xs: '1rem', // Tamanho do texto do input em telas pequenas
                md: '3rem', // Tamanho do texto do input em Full HD
                lg: '5rem', // Tamanho do texto do input em 4K
              },
            },
            '& .MuiInputLabel-root': {
              fontSize: {
                xs: '1rem', // Tamanho do texto da label em telas pequenas
                md: '3rem', // Tamanho do texto da label em Full HD
                lg: '5rem', // Tamanho do texto da label em 4K
              },
            },
          }}
        />
        <TextField
          label="Senha"
          type="password"
          variant="outlined"
          margin="normal"
          value={password}
          onFocus={() => handleInputFocus('password')}
          onChange={handleInputChange} // Captura entrada do teclado físico
          fullWidth
          sx={{
            '& .MuiInputBase-input': {
              fontSize: {
                xs: '1rem', // Tamanho do texto do input em telas pequenas
                md: '3rem', // Tamanho do texto do input em Full HD
                lg: '5rem', // Tamanho do texto do input em 4K
              },
            },
            '& .MuiInputLabel-root': {
              fontSize: {
                xs: '1rem', // Tamanho do texto da label em telas pequenas
                md: '3rem', // Tamanho do texto da label em Full HD
                lg: '5rem', // Tamanho do texto da label em 4K
              },
            },
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          fullWidth
          sx={{
            height: {
              xs: '30px', // Altura do botão em telas pequenas
              md: '64px', // Altura do botão em Full HD
              lg: '100px', // Altura do botão em 4K
            },
            marginTop: '16px',
            marginBottom: {
              xs: '30px', // Margin do botão em telas pequenas
              md: '64px', // Margin do botão em Full HD
              lg: '100px', // Margin do botão em 4K
            },
            fontSize: {
              xs: '20px', // Tamanho do texto do botão em telas pequenas
              md: '30px', // Tamanho do texto do botão em Full HD
              lg: '60px', // Tamanho do texto do botão em 4K
            },
            padding: {
              xs: '8px 16px', // Padding do botão em telas pequenas
              md: '12px 20px', // Padding do botão em Full HD
              lg: '16px 24px', // Padding do botão em 4K
            },
          }}
        >
          Entrar
        </Button>

        {/* Teclado Virtual */}
        <Keyboard
          onChange={handleKeyboardChange}
          inputName={inputName}
          layoutName="default"
          theme={"my-custom-keyboard hg-theme-default hg-layout-default"}
        />
      </Box>
    </Box>
  );
}

export default LoginForm;
