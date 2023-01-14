import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MainPage } from './pages/MainPage';
import { GraphPage } from './pages/GraphPage';
import LoginPage from './pages/SignInAccount';
import { AuthProvider } from './context/AuthContext';
import Register from './pages/SignUpAccount';
import PrivateRoutes from './utils/PrivateRoutes';

function App() {

  return (
    <Router>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<Register />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/home" element={<MainPage />} />
          <Route path="/graph" element={<GraphPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  </Router>
  )
}

export default App;
