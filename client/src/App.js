import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import './App.css';
import LoginScreen from './screens/LoginScreen';
import AdminLoginScreen from './screens/AdminLoginScreen';
import TestScreen from './screens/TestScreen';
import CreateScreen from './screens/CreateScreen';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<LoginScreen />} exact />
        <Route path="/test" element={<TestScreen />} />
        <Route path="/create" element={<CreateScreen />} />
        <Route path="/admin" element={<AdminLoginScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
