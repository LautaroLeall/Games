import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    return (
        <div className="text-center">
            <h1 className="fist-title">SELECCIONA UN JUEGO</h1>
            <div className="btn-games">
                <Link to="/ppt" className="btn btn-play">Piedra | Papel | Tijera</Link>
                {/* <Link to="/ttt" className="btn btn-play m-3">Ta Te Ti</Link> */}
            </div>
        </div>
    );
}

export default Home;
