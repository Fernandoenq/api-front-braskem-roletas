import React, { useState } from 'react';
import { TextField, Button, Box, Snackbar, Alert } from '@mui/material';
import Keyboard from 'react-simple-keyboard';
import { useNavigate } from 'react-router-dom';
import 'react-simple-keyboard/build/css/index.css';
import logo from '../../assets/logo.png';  // Caminho para o logo
import '../../style.css'; // Importar seu CSS personalizado

function LoginForm() {
  const [formData, setFormData] = useState({
    cpf: '',
    registerDate: null,
    personName: null,
    phone: null,
    birthDate: null,
    mail: null,
    isRegistered: true
  });
  const [inputName, setInputName] = useState(''); // Para determinar qual input está ativo
  const [keyboardInput, setKeyboardInput] = useState({
    cpf: ''
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // 'success' | 'error'

  const navigate = useNavigate(); // Hook para navegação

  const handleLogin = async () => {
    try {
      const payload = {
        RegisterDate: formData.registerDate,
        PersonName: formData.personName,
        Cpf: formData.cpf,
        Phone: formData.phone,
        BirthDate: formData.birthDate,
        Mail: formData.mail,
        IsRegistered: formData.isRegistered
      };
      console.log(payload);

      const response = await fetch('http://127.0.0.1:3333//Award/RegisterPerson', { // Substitua pela URL do seu endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.status === 200) {
        const data = await response.json();

        console.log('data:', data);
      
        // Salva os valores no localStorage
        localStorage.setItem('Cpf', data[0].Cpf);
        localStorage.setItem('PersonId', data[0].PersonId);
        localStorage.setItem('PersonName', data[0].PersonName);
        localStorage.setItem('RegisterDate', data[0].RegisterDate);
      
        // Exibe os valores armazenados no localStorage no console
        console.log('Cpf (localStorage):', localStorage.getItem('Cpf'));
        console.log('PersonId (localStorage):', localStorage.getItem('PersonId'));
        console.log('PersonName (localStorage):', localStorage.getItem('PersonName'));
        console.log('RegisterDate (localStorage):', localStorage.getItem('RegisterDate'));
      
        setSnackbarMessage('Login bem-sucedido!');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
        setTimeout(() => {
          navigate('/Quiz'); // Navega para a página de Quiz após 2 segundos
        }, 2000);
      } else if (response.status === 422) {
        const data = await response.json();
        setSnackbarMessage(data.Errors.join(', ')); // Junta todas as mensagens de erro em uma só
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      } else {
        setSnackbarMessage('Erro desconhecido, tente novamente.');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      }
    } catch (error) {
      setSnackbarMessage('Erro na requisição, tente novamente.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      console.error('Erro na requisição:', error);
    }
  };

  const handleBack = () => {
    navigate(-1); // Navega para a página anterior
  };

  const handleKeyboardChange = (input) => {
    setKeyboardInput({
      ...keyboardInput,
      [inputName]: input
    });

    setFormData({
      ...formData,
      [inputName]: input
    });
  };

  const handleInputFocus = (name) => {
    setInputName(name);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

    setKeyboardInput({
      ...keyboardInput,
      [name]: value
    });
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="flex-start" // Alinha o conteúdo mais para o topo
      sx={{
        minHeight: '100vh', // Garante que o Box ocupe toda a altura da viewport
        paddingTop: '10vh', // Ajusta a posição para subir o conteúdo
        gap: '40px', // Espaçamento vertical entre os elementos
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
          borderRadius: '8px',
          padding: '24px',
          textAlign: 'center', // Centraliza o conteúdo dentro do Box
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '40px', // Espaçamento entre elementos dentro do Box
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
        <TextField
          label="CPF"
          variant="outlined"
          margin="normal"
          name="cpf"
          value={formData.cpf}
          onFocus={() => handleInputFocus('cpf')}
          onChange={handleInputChange} // Captura entrada do teclado físico
          fullWidth
          sx={{
            marginBottom: '40px',
            '& .MuiInputBase-input': {
              fontSize: {
                xs: '1rem',
                md: '3rem',
                lg: '6rem',
              },
            },
            '& .MuiInputLabel-root': {
              fontSize: {
                xs: '1rem',
                md: '3rem',
                lg: '6rem',
              },
            },
          }}
        />

        <Box
          display="flex"
          justifyContent="space-between"
          sx={{ width: '100%', gap: '20px', paddingBottom: '40px' }} // Ajusta os botões para ocupar a largura total do Box e espaça entre eles
        >
          <Button
            variant="contained"
            onClick={handleBack}
            sx={{
              width: '48%', // Ocupa metade da largura disponível
              height: {
                xs: '30px',
                md: '64px',
                lg: '150px',
              },
              fontSize: {
                xs: '20px',
                md: '30px',
                lg: '50px',
              },
              padding: {
                xs: '8px 16px',
                md: '12px 20px',
                lg: '16px 24px',
              },
              backgroundColor: '#ff6200', // Cor de fundo personalizada
              color: '#FFFFFF', // Cor do texto
              '&:hover': {
                backgroundColor: '#4d148c', // Cor de fundo ao passar o mouse
              },
            }}
          >
            Voltar
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleLogin}
            sx={{
              width: '48%', // Ocupa metade da largura disponível
              height: {
                xs: '30px',
                md: '64px',
                lg: '150px',
              },
              fontSize: {
                xs: '20px',
                md: '30px',
                lg: '50px',
              },
              padding: {
                xs: '8px 16px',
                md: '12px 20px',
                lg: '16px 24px',
              },
            }}
          >
            Entrar
          </Button>
        </Box>

        {/* Teclado Virtual */}
        <Keyboard
          onChange={handleKeyboardChange}
          inputName={inputName}
          layoutName="default"
          theme={"my-custom-keyboard hg-theme-default hg-layout-default"}
        />
      </Box>

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

export default LoginForm;
