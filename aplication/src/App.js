import './App.css';
import { createTheme, ThemeProvider } from '@mui/material';
import { blue, amber } from '@mui/material/colors';
import Box from '@mui/material/Box';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './routed/Login';
import LogoPage from './routed/Roulette';
import RegisterForm from './routed/Roulette/RegisterRoulette';
import LoginForm from './routed/Roulette/LoginRoulette';
import Quiz from './routed/Roulette/Quiz';
import Roulette from './routed/Roulette/SpinRoulette';
import GetPremium from './routed/Roulette/GetPremium';

const customTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: "#ff6200"
    },
    secondary: {
      main: amber['A400']
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{
        Height: '100vh',
        color: customTheme.palette.text.primary
      }}>
        <BrowserRouter>
          <Box component="main" sx={{ margin: '24px' }}>
            <Routes>
              <Route path="/" element={<LogoPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/roullete" element={<LogoPage />} />
              <Route path="/roulleteRegister" element={<RegisterForm />} />
              <Route path="/roulletelogin" element={<LoginForm />} />
              <Route path="/Quiz" element={<Quiz />} />
              <Route path="/girarroleta" element={<Roulette />} />
              <Route path="/GetPremium" element={<GetPremium />} />
            </Routes>
          </Box>
        </BrowserRouter>
      </Box>
    </ThemeProvider>
  );
}

export default App;
