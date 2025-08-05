# 🎮 Mini Juegos Web

Esta aplicación web, construida con **React + Vite**, ofrece tres juegos clásicos con una interfaz moderna, animaciones suaves y lógica modular:

- 🪨✋✂️ **Piedra, Papel o Tijera**
- ❌⭕ **Ta Te Ti**
- 🧠 **Game Memory (Simon)**

---

## 🚀 Tecnologías utilizadas

- **React**
- **Vite**
- **React Router DOM**
- **Bootstrap**
- **SweetAlert2**
- **React Icons**
- **HTML5 + CSS3**

---

## 📂 Estructura del proyecto

```
src/
├── components/
│ ├── Footer/
│ │ ├── Footer.css
│ │ └── Footer.jsx
│ ├── GSM/                      # Game Memory (Simon)
│ │ ├── sound/
│ │ ├── MemoryGame.css
│ │ ├── MemoryGame.jsx
│ │ └── memoryLogic.js
│ ├── PPT/                      # Piedra, Papel o Tijera
│ │ ├── PPT.css
│ │ ├── PPTGame.jsx
│ │ └── utils.js
│ └── TTT/                      # Ta Te Ti
│   ├── logic.js
│   ├── TTT.css
│   └── TTTGame.jsx
├── pages/
│ ├── Home.css
│ └── Home.jsx
├── routes/
│ └── routes.jsx
├── App.jsx
├── index.css
└── main.jsx
```

---

## 🧠 Juegos implementados

### 🪨✋✂️ Piedra, Papel o Tijera

- Partida contra la computadora.
- Sistema de puntaje acumulativo.
- Animaciones de selección y resultado.
- SweetAlert2 para diálogos de “¡Ganaste!”, “¡Perdiste!” o “Empate”.
- Botones para reiniciar ronda o reiniciar todo el juego.

**Archivos clave**:

- `PPTGame.jsx` — componente con UI y estados.
- `utils.js` — funciones puras (`randomChoice`, `compare`, etc.).
- `PPT.css` — estilos y keyframes.

---

### ❌⭕ Ta Te Ti

- Modo PvP (dos jugadores) y PvE (vs IA simple).
- IA que bloquea jugadas, ocupa centro/esquinas, selecciona aleatorio.
- Puntuación por jugador y conteo de empates.
- Alterna quién empieza cada ronda.
- Feedback visual inmediato en cada clic.

**Archivos clave**:

- `TTTGame.jsx` — lógica de tablero y turnos.
- `logic.js` — comprobación de victoria/empate.
- `TTT.css` — estilos de cuadrícula y hover.

---

### 🧠 Game Memory (Simon)

- Secuencia dinámica de colores y sonidos (🔊).
- Modo estricto opcional (reinicio completo al errar).
- Animaciones “flash” en cada botón y “shake” al fallar.
- Footer dinámico: visible solo en “menú” y oculto durante la partida.
- Lógica modularizada en `memoryLogic.js`:
  - `getRandomColor()`
  - `playSound(id)`
  - `flashButton(id, setHighlight)`
  - `playSequence(sequence, flashFn, setLockInput, getActive)`
- Componente principal: `MemoryGame.jsx`.

**Archivos clave**:

- `memoryLogic.js` — toda la lógica de juego desacoplada.
- `MemoryGame.jsx` — estados, controles, integración de audio y animaciones.
- `MemoryGame.css` — estilos de cuadrantes, botones y keyframes `shake-animation`.

---

## 🌐 Página de Inicio

- Landing page con enlaces a cada juego.
- Navegación gestionada por React Router.
- Estilizado con Bootstrap y tooltips informativos.

---

## 🚀 Demo en Netlify

[![Abrir Mini Juegos](https://img.shields.io/badge/Abrir%20Mini%20Juegos-%239b59b6?style=for-the-badge&logo=netlify&logoColor=white)](https://games-lau.netlify.app/)

---

## 🛠 Instalación y ejecución

```bash
# 1. Cloná el repositorio
git clone https://github.com/LautaroLeall/Games.git

# 2. Entrá al directorio del proyecto
cd Games

# 3. Instalá las dependencias
npm install

# 4. Iniciá el servidor de desarrollo
npm run dev
```
