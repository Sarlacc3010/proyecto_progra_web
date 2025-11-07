import API_URL from "./config.js";

const searchBtn = document.getElementById("searchBtn");
const pokemonNameInput = document.getElementById("pokemonName");
const cardInner = document.querySelector(".card-inner");
const cardFront = document.querySelector(".card-front");
const cardBack = document.querySelector(".card-back");

searchBtn.addEventListener("click", async () => {
  const pokemonName = pokemonNameInput.value.trim().toLowerCase();

  if (!pokemonName) {
    showError("Por favor, escribe un nombre o número.");
    return;
  }

  try {
    const res = await fetch(`${API_URL}/api/pokemon/${pokemonName}`);
    if (!res.ok) throw new Error("Pokémon no encontrado");
    const data = await res.json();

    showPokemon(data);
  } catch (error) {
    showError("❌ Pokémon no encontrado");
  }
});

function showPokemon(pokemon) {
  cardFront.innerHTML = `
    <img src="${pokemon.image}" alt="${pokemon.name}" />
    <h2>${pokemon.name.toUpperCase()}</h2>
    <p><strong>Tipo:</strong> ${pokemon.type.join(", ")}</p>
  `;

  cardBack.innerHTML = `
    <h3>Descripción</h3>
    <p>${pokemon.description}</p>
  `;
}

function showError(message) {
  cardFront.innerHTML = `<p class="error">${message}</p>`;
  cardBack.innerHTML = `<p>Intenta con otro nombre o número.</p>`;
}
