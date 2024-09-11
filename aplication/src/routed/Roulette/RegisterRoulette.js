import React, { useState } from 'react';
import { TextField, Button, Box, Snackbar, Alert, Typography, Checkbox, FormControlLabel } from '@mui/material';
import Keyboard from 'react-simple-keyboard';
import { useNavigate } from 'react-router-dom';
import 'react-simple-keyboard/build/css/index.css';
import logo from '../../assets/logobraskem.png';  // Caminho para o logo
import carinhlimite from '../../assets/carinhlimite.png';  // Caminho para o logo
import '../../style.css'; // Importar seu CSS personalizado
import ErrorModal from '../Modals/ErrorModal'; // Certifique-se de que o caminho está correto
import LimitModal from '../Modals/LimitModal'; // Certifique-se de que o caminho está correto
import NotificationModal from '../Modals/NotificationModal'; // Certifique-se de que o caminho está correto

import info from '../../assets/info.png'

function RegisterForm() {
  const [formData, setFormData] = useState({
    username: '',
    cpf: '',
    phone: '',
    birthdate: '',
    email: '',
  });
  const [inputName, setInputName] = useState(''); // Para determinar qual input está ativo
  const [keyboardInput, setKeyboardInput] = useState({
    username: '',
    cpf: '',
    phone: '',
    birthdate: '',
    email: '',
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // 'success' | 'error'
  const [cpfError, setCpfError] = useState(false); // Estado para controlar o erro do CPF
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [openhandleNavigate, setOpenhandleNavigate] = useState(false);
  const [openhandleNotification, setOpenhandleNotification] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // Para armazenar a mensagem de erro
const [errorImageUrl, setErrorImageUrl] = useState(''); // Para armazenar a URL da imagem de erro

  
  const navigate = useNavigate(); // Hook para navegação

  const formatDate = (dateString) => {
    const day = dateString.substring(0, 2);
    const month = dateString.substring(2, 4);
    const year = dateString.substring(4, 8);
    return `${year}-${month}-${day}`;
  };

  // Função para formatar o CPF enquanto o usuário digita
  const formatCPF = (cpf) => {
    cpf = cpf.replace(/\D/g, ""); // Remove tudo que não for número
    
    // Aplica a máscara (123.456.789-00)
    if (cpf.length <= 11) {
      cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
      cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
      cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    }
    
    return cpf;
  };

  const removeMask = (value) => {
    return value.replace(/\D/g, ''); // Remove tudo que não for número
  };
  

  // Função para validar o CPF
  const validateCPF = (cpf) => {
    cpf = cpf.replace(/\D/g, ""); // Remove todos os caracteres não numéricos
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let sum = 0;
    let remainder;
    
    for (let i = 1; i <= 9; i++) sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(9, 10))) return false;

    sum = 0;
    for (let i = 1; i <= 10; i++) sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(10, 11))) return false;

    return true;
  };

  // Valida o CPF quando o campo perder o foco (onBlur)
const handleCpfBlur = () => {
  const cpf = formData.cpf.replace(/\D/g, ''); // Remove qualquer caractere que não seja número
  if (cpf.length !== 11 || !validateCPF(formData.cpf)) {
    setCpfError(true);
    setFormData({ ...formData, cpf: '' }); // Limpa o CPF se inválido
  } else {
    setCpfError(false); // Remove o erro caso seja válido
  }
};

const handleRegisterOrLogin = async () => {
  // Verifica se o CPF é válido antes de prosseguir

  const cpfWithoutMask = removeMask(formData.cpf);
  const phoneWithoutMask = removeMask(formData.phone);
  const birthdateWithoutMask = removeMask(formData.birthdate);

  if (!validateCPF(cpfWithoutMask)) {
    setCpfError(true);
    setFormData({ ...formData, cpf: '' }); // Limpa o CPF
    return;
  }

  try {
    // Verificar se apenas o CPF foi preenchido para fazer login
    if (cpfWithoutMask && !formData.username && !phoneWithoutMask && !birthdateWithoutMask && !formData.email) {
      const payload = {
        RegisterDate: null,
        PersonName: null,
        Cpf: cpfWithoutMask,
        Phone: null,
        BirthDate: null,
        Mail: null,
        IsRegistered: true,
      };
      const response = await fetch('http://127.0.0.1:3333//Award/RegisterPerson', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.status === 200) {
        const data = await response.json();
        localStorage.setItem('Cpf', data[0].Cpf);
        localStorage.setItem('PersonId', data[0].PersonId);
        localStorage.setItem('PersonName', data[0].PersonName);
        localStorage.setItem('RegisterDate', data[0].RegisterDate);

        //setSnackbarMessage('Login bem-sucedido!');
        //setSnackbarSeverity('success');
        //setOpenSnackbar(true);
        
        setTimeout(() => {
          navigate('/Quiz');
        }, 2000);
      } 
      else if (response.status === 201) {
        const data = await response.json();
        console.log(data)
        //const errorMessage = errorData.Errors ? errorData.Errors[0] : 'Erro no registro. Tente novamente.';

        // Aqui chamamos o modal passando os parâmetros de erro e imagem
        setErrorMessage(data[0].PersonName);
        setErrorImageUrl(carinhlimite);
        setOpenhandleNavigate(true);

        localStorage.setItem('Cpf', data[0].Cpf);
        localStorage.setItem('PersonId', data[0].PersonId);
        localStorage.setItem('PersonName', data[0].PersonName);
        localStorage.setItem('RegisterDate', data[0].RegisterDate);

        //setSnackbarMessage('Login bem-sucedido!');
        //setSnackbarSeverity('success');
        //setOpenSnackbar(true);
      }
      else if (response.status === 422) {
        const errorData = await response.json();
        //const errorMessage = errorData.Errors ? errorData.Errors[0] : 'Erro no registro. Tente novamente.';

        // Aqui chamamos o modal passando os parâmetros de erro e imagem
        setErrorMessage(errorData.Errors[0]);
        setErrorImageUrl(info);
        setOpenErrorModal(true);
      } else {
        console.log('Erro de login, tente novamente.');
        //setSnackbarSeverity('error');
        //setOpenSnackbar(true);
      }
    } else if (formData.username && cpfWithoutMask && phoneWithoutMask && birthdateWithoutMask && formData.email) {
      // Comportamento de registro
      const formattedBirthDate = formatDate(birthdateWithoutMask);

      const registerDate = new Date(new Date().getTime() + -3 * 60 * 60 * 1000)
      .toISOString()
      .replace('T', ' ')
      .substring(0, 19);
    
    console.log(registerDate);

      const payload = {
        RegisterDate: registerDate,
        PersonName: formData.username,
        Cpf: cpfWithoutMask,
        Phone: phoneWithoutMask,
        BirthDate: formattedBirthDate,
        Mail: formData.email,
        IsRegistered: false,
      };

      const response = await fetch('http://127.0.0.1:3333//Award/RegisterPerson', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.status === 200) {
        const data = await response.json();
        localStorage.setItem('Cpf', data[0].Cpf);
        localStorage.setItem('PersonId', data[0].PersonId);
        localStorage.setItem('PersonName', data[0].PersonName);
        localStorage.setItem('RegisterDate', data[0].RegisterDate);

        //setSnackbarMessage('Registro bem-sucedido!');
        //setSnackbarSeverity('success');
        //setOpenSnackbar(true);

        setTimeout(() => {
          navigate('/Quiz');
        }, 2000);
      } 
      else if (response.status === 201) {
        const data = await response.json();
        console.log(data)
        //const errorMessage = errorData.Errors ? errorData.Errors[0] : 'Erro no registro. Tente novamente.';

        // Aqui chamamos o modal passando os parâmetros de erro e imagem
        setErrorMessage(data[0].PersonName);
        setErrorImageUrl(carinhlimite);
        setOpenhandleNavigate(true);

        localStorage.setItem('Cpf', data[0].Cpf);
        localStorage.setItem('PersonId', data[0].PersonId);
        localStorage.setItem('PersonName', data[0].PersonName);
        localStorage.setItem('RegisterDate', data[0].RegisterDate);

        //setSnackbarMessage('Login bem-sucedido!');
        //setSnackbarSeverity('success');
        //setOpenSnackbar(true);
      }
      
      else if (response.status === 422) {
        const errorData = await response.json();
        //const errorMessage = errorData.Errors ? errorData.Errors[0] : 'Erro no registro. Tente novamente.';

        // Aqui chamamos o modal passando os parâmetros de erro e imagem
        setErrorMessage(errorData.Errors[0]);
        setErrorImageUrl(info);
        setOpenErrorModal(true);
      } else {
        setSnackbarMessage('Erro no registro, tente novamente.');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      }
    } else {
      setErrorMessage('Preencha todos os campos para registrar ou apenas o CPF para fazer login.');
      setErrorImageUrl(info);
      setOpenhandleNotification(true);
      
      
      //setSnackbarSeverity('error');
      //setOpenSnackbar(true);
    }
  } catch (error) {
    setErrorMessage('Erro na requisição, tente novamente.');
    setErrorImageUrl(info);
    setOpenErrorModal(true);
  }
};

  const handleBack = () => {
    navigate(-1); // Navega para a página anterior
  };

  const handleKeyboardChange = (input) => {
    setKeyboardInput({
      ...keyboardInput,
      [inputName]: input,
    });

    setFormData({
      ...formData,
      [inputName]: input,
    });
  };

  const handleInputFocus = (name) => {
    setInputName(name);
  };

  // Função para formatar o telefone enquanto o usuário digita
const formatPhone = (phone) => {
  phone = phone.replace(/\D/g, ""); // Remove tudo que não for número

  // Aplica a máscara (99) 99999-9999 ou (99) 9999-9999 se o número for mais curto
  if (phone.length <= 10) {
    phone = phone.replace(/(\d{2})(\d)/, "($1) $2");
    phone = phone.replace(/(\d{4})(\d)/, "$1-$2");
  } else if (phone.length <= 11) {
    phone = phone.replace(/(\d{2})(\d)/, "($1) $2");
    phone = phone.replace(/(\d{5})(\d)/, "$1-$2");
  }

  return phone;
};

// Valida o telefone quando o campo perder o foco (onBlur)
const handlePhoneBlur = () => {
  const phone = formData.phone.replace(/\D/g, ''); // Remove caracteres não numéricos
  if (phone.length !== 11) {
    setPhoneError(true); // Mostra erro se o telefone for inválido
    setFormData({ ...formData, phone: '' }); // Limpa o telefone se inválido
  } else {
    setPhoneError(false); // Remove o erro se o telefone for válido
  }
};

// Valida a data de nascimento quando o campo perder o foco (onBlur)
const handleBirthdateBlur = () => {
  const birthdate = formData.birthdate.replace(/\D/g, ''); // Remove caracteres não numéricos
  if (birthdate.length !== 8) {
    setBirthdateError(true); // Mostra erro se a data de nascimento for inválida
    setFormData({ ...formData, birthdate: '' }); // Limpa a data de nascimento se inválida
  } else {
    setBirthdateError(false); // Remove o erro se a data de nascimento for válida
  }
};


// Função para formatar a data de nascimento enquanto o usuário digita (DD/MM/AAAA)
const formatBirthdate = (birthdate) => {
  birthdate = birthdate.replace(/\D/g, ""); // Remove tudo que não for número

  // Aplica a máscara DD/MM/AAAA
  if (birthdate.length <= 8) {
    birthdate = birthdate.replace(/(\d{2})(\d)/, "$1/$2");
    birthdate = birthdate.replace(/(\d{2})(\d)/, "$1/$2");
  }

  return birthdate;
};

const [phoneError, setPhoneError] = useState(false); // Estado para erro de telefone
const [birthdateError, setBirthdateError] = useState(false); // Estado para erro de data de nascimento

const handleInputChange = (e) => {
  const { name, value } = e.target;

  if (name === 'cpf') {
    const formattedCpf = formatCPF(value);
    setFormData({ ...formData, [name]: formattedCpf });
    setKeyboardInput({ ...keyboardInput, [name]: formattedCpf });

    setCpfError(false); // Remove o erro de CPF caso o usuário volte a digitar
  } else if (name === 'phone') {
    const formattedPhone = formatPhone(value);
    setFormData({ ...formData, [name]: formattedPhone });
    setKeyboardInput({ ...keyboardInput, [name]: formattedPhone });
  } else if (name === 'birthdate') {
    const formattedBirthdate = formatBirthdate(value);
    setFormData({ ...formData, [name]: formattedBirthdate });
    setKeyboardInput({ ...keyboardInput, [name]: formattedBirthdate });
  } else {
    setFormData({ ...formData, [name]: value });
    setKeyboardInput({ ...keyboardInput, [name]: value });
  }
};


  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const [acceptTerms, setAcceptTerms] = useState(false); // Estado para controlar o checkbox

  return (

    
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="flex-start"
      sx={{
        minHeight: '100vh',
        paddingTop: '1vh',
      }}
    >

<ErrorModal
  open={openErrorModal}
  message={errorMessage}
  imageUrl={errorImageUrl}
  onClose={() => setOpenErrorModal(false)} // Fechar modal ao clicar em "Fechar"
/>

<LimitModal
  open={openhandleNavigate}
  message={errorMessage}
  imageUrl={errorImageUrl}
  onClose={() => setOpenhandleNavigate(false)} // Fechar modal ao clicar em "Fechar"
/>

<NotificationModal
  open={openhandleNotification}
  message={errorMessage}
  imageUrl={errorImageUrl}
  onClose={() => setOpenhandleNotification(false)} // Fechar modal ao clicar em "Fechar"
/>


      <Box
        sx={{
          width: '100%',
          maxWidth: {
            xs: '100%',
            sm: '100%',
            md: '800px',
            lg: '1800px',
          },
          borderRadius: '8px',
          padding: '24px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          src={logo}
          alt="Logo"
          style={{
            width: '110%',
            marginBottom: '5px',
          }}
        />
        <TextField
          error={cpfError}
          helperText={cpfError ? 'CPF Inválido' : ''}
          label="CPF"
          variant="outlined"
          margin="normal"
          name="cpf"
          value={formData.cpf}
          onFocus={() => handleInputFocus('cpf')}
          onChange={handleInputChange}
          onBlur={handleCpfBlur}  // Valida quando o campo perder o foco
          fullWidth
          sx={{
            width: '105%',
            marginBottom: '4px',
            '& .MuiOutlinedInput-root': {
              '& input': {
                color: 'black', // Cor do texto
                fontSize: '2.2rem', // Tamanho maior do texto
                backgroundColor: 'white', // Fundo branco dentro do campo de input
                borderRadius: '20px', // Aplicar o raio de borda ao campo de input
              },
              '& fieldset': {
                borderColor: 'black', // Cor da borda
                borderRadius: '20px', // Raio da borda
              },
              '&:hover fieldset': {
                borderColor: 'black', // Cor da borda ao passar o mouse
              },
              '&.Mui-focused fieldset': {
                borderColor: 'black', // Cor da borda ao focar no campo
              },
            },
            '& .MuiInputLabel-root': {
              color: 'black', // Cor da label
              fontSize: '2rem', // Tamanho da label
            },
          }}
        />
        <TextField
          label="Nome"
          variant="outlined"
          margin="normal"
          name="username"
          value={formData.username}
          onFocus={() => handleInputFocus('username')}
          onChange={handleInputChange}
          fullWidth
          sx={{
            width: '105%',
            marginBottom: '5px',
            '& .MuiOutlinedInput-root': {
              '& input': {
                color: 'black', // Cor do texto
                fontSize: '2.2rem', // Tamanho maior do texto
                backgroundColor: 'white', // Fundo branco dentro do campo de input
                borderRadius: '20px', // Aplicar o raio de borda ao campo de input
              },
              '& fieldset': {
                borderColor: 'black', // Cor da borda
                borderRadius: '20px', // Raio da borda
              },
              '&:hover fieldset': {
                borderColor: 'black', // Cor da borda ao passar o mouse
              },
              '&.Mui-focused fieldset': {
                borderColor: 'black', // Cor da borda ao focar no campo
              },
            },
            '& .MuiInputLabel-root': {
              color: 'black', // Cor da label
              fontSize: '2rem', // Tamanho da label
            },
          }}
        />
        <TextField
          error={phoneError}  // Define erro se o telefone for inválido
          helperText={phoneError ? 'Telefone inválido' : ''}  // Mensagem de erro
          label="Telefone"
          variant="outlined"
          margin="normal"
          name="phone"
          value={formData.phone}
          onFocus={() => handleInputFocus('phone')}
          onChange={handleInputChange}
          onBlur={handlePhoneBlur}  // Valida quando o campo perder o foco
          fullWidth
          sx={{
            width: '105%',
            marginBottom: '5px',
            '& .MuiOutlinedInput-root': {
              '& input': {
                color: 'black', // Cor do texto
                fontSize: '2.2rem', // Tamanho maior do texto
                backgroundColor: 'white', // Fundo branco dentro do campo de input
                borderRadius: '20px', // Aplicar o raio de borda ao campo de input
              },
              '& fieldset': {
                borderColor: 'black', // Cor da borda
                borderRadius: '20px', // Raio da borda
              },
              '&:hover fieldset': {
                borderColor: 'black', // Cor da borda ao passar o mouse
              },
              '&.Mui-focused fieldset': {
                borderColor: 'black', // Cor da borda ao focar no campo
              },
            },
            '& .MuiInputLabel-root': {
              color: 'black', // Cor da label
              fontSize: '2rem', // Tamanho da label
            },
          }}
        />

        <TextField
          error={birthdateError}  // Define erro se a data de nascimento for inválida
          helperText={birthdateError ? 'Data de nascimento inválida' : ''}  // Mensagem de erro
          label="Data de Nascimento"
          variant="outlined"
          margin="normal"
          name="birthdate"
          value={formData.birthdate}
          onFocus={() => handleInputFocus('birthdate')}
          onChange={handleInputChange}
          onBlur={handleBirthdateBlur}  // Valida quando o campo perder o foco
          fullWidth
          sx={{
            width: '105%',
            marginBottom: '5px',
            '& .MuiOutlinedInput-root': {
              '& input': {
                color: 'black', // Cor do texto
                fontSize: '2.2rem', // Tamanho maior do texto
                backgroundColor: 'white', // Fundo branco dentro do campo de input
                borderRadius: '20px', // Aplicar o raio de borda ao campo de input
              },
              '& fieldset': {
                borderColor: 'black', // Cor da borda
                borderRadius: '20px', // Raio da borda
              },
              '&:hover fieldset': {
                borderColor: 'black', // Cor da borda ao passar o mouse
              },
              '&.Mui-focused fieldset': {
                borderColor: 'black', // Cor da borda ao focar no campo
              },
            },
            '& .MuiInputLabel-root': {
              color: 'black', // Cor da label
              fontSize: '2rem', // Tamanho da label
            },
          }}
        />


        <TextField
          label="Email"
          variant="outlined"
          margin="normal"
          name="email"
          value={formData.email}
          onFocus={() => handleInputFocus('email')}
          onChange={handleInputChange}
          fullWidth
          sx={{
            width: '105%',
            marginBottom: '5px',
            '& .MuiOutlinedInput-root': {
              '& input': {
                color: 'black', // Cor do texto
                fontSize: '2.2rem', // Tamanho maior do texto
                backgroundColor: 'white', // Fundo branco dentro do campo de input
                borderRadius: '20px', // Aplicar o raio de borda ao campo de input
              },
              '& fieldset': {
                borderColor: 'black', // Cor da borda
                borderRadius: '20px', // Raio da borda
              },
              '&:hover fieldset': {
                borderColor: 'black', // Cor da borda ao passar o mouse
              },
              '&.Mui-focused fieldset': {
                borderColor: 'black', // Cor da borda ao focar no campo
              },
            },
            '& .MuiInputLabel-root': {
              color: 'black', // Cor da label
              fontSize: '2rem', // Tamanho da label
            },
          }}
        />
        

        <Box
      sx={{
        backgroundColor: 'white', // Fundo branco
        padding: '16px', // Espaçamento interno
        borderRadius: '10px', // Bordas arredondadas
        marginTop: '20px', // Espaçamento superior
        marginBottom: '20px', // Espaçamento superior
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Sombras para dar destaque
        maxWidth: '800px', // Tamanho máximo
        width: '100%', // Para ajustar ao container
      }}
    >
      <Typography variant="body2" sx={{ color: 'black', fontSize: '12px', textAlign: 'justify' }}>
        A Braskem respeita e cumpre as exigências previstas na Lei nº 13.709/2018 (LGPD) que dispõe
        sobre a proteção de dados pessoais zelando pelos seus dados pessoais. Os dados fornecidos
        serão utilizados para a finalidade de cadastro, participação e pesquisa de satisfação da ação
        promocional da Braskem no Rock in Rio 2024, sendo restritas às pessoas devidamente
        autorizadas, assegurando a Braskem, na condição de controladora, a sua privacidade e segurança
        no armazenamento. Você poderá obter mais informações sobre o tratamento dos seus dados
        pessoais na nossa política de privacidade disponível em{' '}
        <a href="https://www.braskem.com.br/politica-de-privacidade" target="_blank" rel="noopener noreferrer">
          https://www.braskem.com.br/politica-de-privacidade
        </a>.
      </Typography>

      <Typography variant="body2" sx={{ color: 'black', fontSize: '12px', textAlign: 'justify', marginTop: '8px' }}>
        Caso queira, você também poderá ficar por dentro das ações e campanhas promocionais da Braskem através dos
        contatos informados, selecionando o item disponível abaixo:
      </Typography>

      <FormControlLabel
        control={
          <Checkbox 
            color="primary" 
            checked={acceptTerms} // O valor do checkbox está ligado ao estado
            onChange={(e) => setAcceptTerms(e.target.checked)} // Atualiza o estado quando o usuário marca/desmarca
          />
        }
        label="Aceito receber comunicações da Braskem sobre reciclagem e sustentabilidade."
        sx={{ marginTop: '8px', color: 'black', fontSize: '12px' }}
      />


      <Typography variant="body2" sx={{ color: 'black', fontSize: '12px', textAlign: 'justify', marginTop: '8px' }}>
        *Você poderá pedir a exclusão sobre as comunicações e ações promocionais a qualquer momento através do endereço de e-mail{' '}
        <a href="mailto:data_protection@braskem.com">data_protection@braskem.com</a>.
      </Typography>
    </Box>

        <Keyboard onChange={handleKeyboardChange} inputName={inputName} layoutName="default" theme="hg-theme-default myTheme" />

      </Box>

      <Box display="flex" justifyContent="center" sx={{ width: '100%', paddingBottom: '40px' }}>
  <Button
    variant="contained"
    onClick={handleBack}
    sx={{
      width: '25%', // Largura menor
      height: '80px', // Altura maior
      backgroundColor: 'white', // Fundo branco
      borderRadius: '50px', // Raio da borda
      color: 'black', // Texto preto
      boxShadow: 'none', // Sem sombra
      marginRight: '10px', // Espaçamento entre os botões
      fontSize:'20px',
      '&:hover': {
        backgroundColor: '#f2f2f2', // Fundo branco mais escuro ao passar o mouse
        color: 'black', // Texto continua preto ao passar o mouse
      },
    }}
  >
    Voltar
  </Button>
  <Button
    variant="contained"
    onClick={handleRegisterOrLogin}
    disabled={!acceptTerms} // O botão só será habilitado se o checkbox estiver marcado
    sx={{
      width: '25%', // Largura menor
      height: '80px', // Altura maior
      backgroundColor: 'white', // Fundo branco
      borderRadius: '50px', // Raio da borda
      color: 'black', // Texto preto
      boxShadow: 'none', // Sem sombra
      marginLeft: '10px', // Espaçamento entre os botões
      fontSize:'20px',
      '&:hover': {
        backgroundColor: '#f2f2f2', // Fundo branco mais escuro ao passar o mouse
        color: 'black', // Texto continua preto ao passar o mouse
      },
    }}
  >
    Avançar
  </Button>

</Box>

      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>

    
  );
}

export default RegisterForm;
