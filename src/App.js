import React from 'react';
import SignupPage from './components/SignupPage';
import { AuthProvider } from './contexts/AuthContext';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <SignupPage />
      </div>
    </AuthProvider>
  );
}

export default App; 