// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Calender from './components/Calender';
import Database from './components/Database';
import Marketplace from './components/Marketplace';
import Consultation from './components/Consultation';
import Exchange from './components/Exchange';
import Login from './components/Login';
import Register from './components/Register';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calender" element={<Calender />} />
        <Route path="/database" element={<Database />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/consultation" element={<Consultation />} />
        <Route path="/exchange" element={<Exchange />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;