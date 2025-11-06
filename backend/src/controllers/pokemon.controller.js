import { fetchPokemons } from "../services/pokemon.service.js";

export const getPokemons = async (req, res) => {
  try {
    const data = await fetchPokemons();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los Pokémon" });
  }
};
