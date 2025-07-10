import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from '../pages/Home'; // Pantalla principal
import PPTGame from '../components/PPT/PPTGame';
// import TTT from './TTT';  // para más adelante

const RoutesApp = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/piedra-papel-tijera" element={<PPTGame />} />
            {/* <Route path="/ta-te-ti" element={<TTT />} /> */}
        </Routes>
    );
}

export default RoutesApp;