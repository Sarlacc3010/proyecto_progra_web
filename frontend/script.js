import API_URL from "./config.js";
const searchBtn = document.getElementById("searchBtn");
const pokemonNameInput = document.getElementById("pokemonName");
const card = document.getElementById("pokemon-card");

searchBtn.addEventListener("click", async () => {
  const pokemonName = pokemonNameInput.value.trim().toLowerCase();

  if (!pokemonName) {
    card.innerHTML = `<p class="error">Por favor, escribe un nombre o número.</p>`;
    card.classList.remove("hidden");
    return;
  }

  try {
    // 🔹 Consumimos tu endpoint del backend
    const res = await fetch(`${API_URL}/api/pokemon/${pokemonName}`);
    if (!res.ok) throw new Error("Pokémon no encontrado");
    const pokemon = await res.json();

    // 🔹 Mostramos el resultado
    showPokemon(pokemon);
  } catch (error) {
    card.innerHTML = `<p class="error">❌ Pokémon no encontrado</p>`;
    card.classList.remove("hidden");
  }
});

function showPokemon(pokemon) {
  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  const id = pokemon.id.toString().padStart(3, "0");
  const type = pokemon.type.join(", ");
  const image = pokemon.image;
  const description = pokemon.description;

  card.innerHTML = `
    <div class="pokemon-image">
      <img src="${image}" alt="${name}">
    </div>
    <div class="pokemon-info">
      <h2>${name} (#${id})</h2>
      <p><strong>Tipo:</strong> ${type}</p>
      <p><strong>Descripción:</strong> ${description}</p>
    </div>
  `;

  card.classList.remove("hidden");
}
