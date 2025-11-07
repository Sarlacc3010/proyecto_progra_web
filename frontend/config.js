// config.js
const API_URL =
  window.location.hostname.includes("localhost")
    ? "http://localhost:3000" // 👉 para cuando trabajes localmente
    : "https://web-programming-proyect.onrender.com"; // 👉 cambia esto por la URL del backend en Render

export default API_URL;
