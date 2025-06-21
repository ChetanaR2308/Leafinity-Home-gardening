import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from "./home-gardening/components/Navbar";
import Footer from "./home-gardening/components/Footer";
import Home from "./home-gardening/pages/Home";
import Calendar from "./home-gardening/pages/Calender";
import Database from "./home-gardening/pages/Database";
import Exchange from "./home-gardening/pages/Exchange";
import Consultation from "./home-gardening/pages/Consultation";
import Marketplace from "./home-gardening/pages/Marketplace";
import Privacy from "./home-gardening/pages/Privacy";
import Terms from "./home-gardening/pages/Terms";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Calender" element={<Calendar />} />
          <Route path="/Database" element={<Database />} />
          <Route path="/Exchange" element={<Exchange />} />
          <Route path="/Consultation" element={<Consultation />} />
          <Route path="/Marketplace" element={<Marketplace />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
        
      </main>
      <Footer />
    </div>
  );
}

export default App;
