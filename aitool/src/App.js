
import './App.css';
import {  Routes, Route } from 'react-router-dom';
import SignupForm from './Component/Signup';
import Login from './Component/Login';
import Ai from './Component/Ai';

function App() {
  return (
    <div className="App">
    
      <Routes>
        <Route path="/" element={<SignupForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ai" element={<Ai />} />
      </Routes>
    </div>
  );
}

export default App;
