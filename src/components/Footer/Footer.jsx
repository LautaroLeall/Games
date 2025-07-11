import React from 'react';
import './Footer.css';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import { AiFillInstagram } from "react-icons/ai";

const Footer = () => {
    return (
        <div className="container-footer d-flex align-items-center justify-content-center">
            <div className="footer d-flex flex-column align-items-center">
                <div className="footer-content d-flex align-items-center justify-content-center">
                    <div className="social-icons d-flex gap-4 justify-content-center">
                        <a href="https://www.linkedin.com/in/lauldp/" className='redes-link' target="_blank" rel="noreferrer">
                            <FaLinkedin />
                        </a>

                        <a href="https://www.instagram.com/lautaro_leall" className='redes-link' target="_blank" rel="noreferrer">
                            <AiFillInstagram />
                        </a>

                        <a href="https://github.com/LautaroLeall" className='redes-link' target="_blank" rel="noreferrer">
                            <FaGithub />
                        </a>

                        <a href="https://mail.google.com/mail/u/0/?fs=1&tf=cm&source=mailto&to=lautaroleal4@gmail.com" className='redes-link' target="_blank" rel="noreferrer">
                            <FaEnvelope />
                        </a>
                    </div>
                </div>

                <div className="footer-bottom d-flex align-items-center justify-content-center">
                    <p>© 2025 Lautaro Leal | Todos los derechos reservados.</p>
                </div>
            </div>
        </div>
    );
};

export default Footer;
