# 🎮 Mini Juegos Web

Este proyecto es una aplicación web construida con **React + Vite**, que ofrece dos juegos clásicos con una interfaz moderna, animaciones suaves y lógica robusta:  
- 🪨✋✂️ **Piedra, Papel o Tijera** 
- ❌⭕ **Ta Te Ti**.

---

## 🚀 Tecnologías utilizadas

- React
- Vite
- React Router DOM
- Bootstrap
- HTML5 + CSS3

---

## 📂 Estructura del proyecto

```
src/
├── components/
│ ├── PPT/
│ │ ├── PPTGame.jsx
│ │ ├── PPT.css
│ │ └── utils.js
│ └── TTT/
│ ├── TTTGame.jsx
│ ├── TTT.css
│ └── logic.js
├── pages/
│ └── Home.jsx
├── routes/
│ └── routes.jsx
├── App.jsx
└── main.jsx
```

---

## 🧠 Juegos implementados

### *Piedra, Papel o Tijera*

- Juega contra la computadora.
- Sistema de puntaje.
- Animaciones suaves de aparición y resultado.
- Uso de SweetAlert2 para mostrar el resultado.
- Botones de reinicio de ronda o juego completo.
- Imágenes animadas al seleccionar.
- Puntos visibles solo durante la partida.

📁 Archivos clave:

- `PPTGame.jsx`: Interfaz y lógica de juego.
- `utils.js`: Lógica pura del juego.
- `PPT.css`: Estilos y animaciones.

---

### *Ta Te Ti*

- Modo contra un amigo o la computadora.
- Algoritmo básico para la IA (bloqueo, centro, esquinas, aleatorio).
- Puntaje por jugador (X y O).
- Detección de empate y ganador.
- Alternancia de jugador inicial entre rondas.
- Interfaz intuitiva y reactiva.

📁 Archivos clave:

- `TTTGame.jsx`: Lógica principal del juego.
- `logic.js`: Funciones puras para el juego.
- `TTT.css`: Estilos visuales.

---

### 🏠 *Página de Inicio*

- Muestra los dos juegos disponibles.
- Estilizado con Bootstrap y tooltips.
- Navegación con React Router.

---

## 🛠 Instalación y ejecución

```bash
Cloná el repositorio:
    git clone https://github.com/LautaroLeall/Games

Entrá al directorio del proyecto:
    cd GAMES

Instalá las dependencias:
    npm install

Iniciá el servidor de desarrollo:
    npm run dev
```
