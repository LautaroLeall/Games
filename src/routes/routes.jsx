import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from '../pages/Home';
import PPTGame from '../components/PPT/PPTGame';
import TTTGame from '../components/TTT/TTTGame';

const RoutesApp = ({ setMostrarFooter }) => {
    return (
        <Routes>
            <Route path="/" element={<Home setMostrarFooter={setMostrarFooter} />} />
            <Route path="/piedra-papel-tijera" element={<PPTGame setMostrarFooter={setMostrarFooter} />} />
            <Route path="/ta-te-ti" element={<TTTGame setMostrarFooter={setMostrarFooter} />} />
        </Routes>
    );
};

export default RoutesApp;
