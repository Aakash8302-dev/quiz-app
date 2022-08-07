import { BrowserRouter as Router, HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import './App.css';
import LoginScreen from './screens/LoginScreen';
import AdminLoginScreen from './screens/AdminLoginScreen';
import TestScreen from './screens/TestScreen';
import CreateScreen from './screens/CreateScreen';
import AdminScreen from './screens/AdminScreen';
import StudentScreen from './screens/StudentScreen';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: ['Poppins', 'sans-serif'].join(','),
  },
});

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Header />
        <Routes>
          <Route path="/" element={<LoginScreen />} exact />
          <Route path="/student" element={<StudentScreen />} />
          <Route path="/create" element={<CreateScreen />} />
          <Route path="/alogin" element={<AdminLoginScreen />} />
          <Route path="/admin" element={<AdminScreen />} />
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;
