import React, { useState } from 'react';
import { Box, Button, Typography, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function ConfigPage() {
  const [configData, setConfigData] = useState(null); // Armazena os dados carregados
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // 'success' | 'error'
  const [fileUploaded, setFileUploaded] = useState(false); // Para controlar se o arquivo foi carregado

  const navigate = useNavigate();

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const config = JSON.parse(e.target.result);
          if (config.rouletteId) {
            setConfigData(config); // Armazena o conteúdo do arquivo
            setSnackbarMessage('Arquivo carregado com sucesso! Pronto para salvar.');
            setSnackbarSeverity('success');
            setOpenSnackbar(true);
            setFileUploaded(true); // Habilita o botão de salvar
          } else {
            throw new Error('Arquivo JSON inválido.');
          }
        } catch (err) {
          console.error('Erro ao ler o arquivo JSON:', err);
          setSnackbarMessage('Erro ao ler o arquivo JSON. Verifique o formato.');
          setSnackbarSeverity('error');
          setOpenSnackbar(true);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleSaveConfig = () => {
    if (configData) {
      localStorage.setItem('rouletteId', configData.rouletteId); // Salva no localStorage
      setSnackbarMessage('Configuração salva com sucesso!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      setTimeout(() => navigate('/'), 2000); // Navega de volta para a página principal após 2 segundos
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
      justifyContent="center"
      sx={{
        minHeight: '100vh',
        textAlign: 'center',
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Carregar Configuração
      </Typography>
      <input
        type="file"
        accept=".json"
        onChange={handleFileUpload}
        style={{ marginBottom: '20px' }}
      />
      <Button
        variant="contained"
        color="primary"
        component="label"
        disabled={!fileUploaded} // Desabilita o botão até que o arquivo seja carregado
        onClick={handleSaveConfig}
      >
        Salvar Configuração e Sair
      </Button>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
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

export default ConfigPage;
