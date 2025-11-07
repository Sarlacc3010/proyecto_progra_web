import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

// Endpoint que consulta la PokeAPI
app.get("/api/pokemon/:name", async (req, res) => {
  const { name } = req.params;

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (!response.ok) {
      return res.status(404).json({ error: "Pokémon no encontrado" });
    }

    const data = await response.json();

    // obtener la descripción
    const speciesRes = await fetch(data.species.url);
    const speciesData = await speciesRes.json();

    const descriptionEntry = speciesData.flavor_text_entries.find(
      (entry) => entry.language.name === "es"
    );

    const description = descriptionEntry
      ? descriptionEntry.flavor_text.replace(/\f/g, " ")
      : "Descripción no disponible.";

    res.json({
      id: data.id,
      name: data.name,
      type: data.types.map((t) => t.type.name),
      image: data.sprites.other["official-artwork"].front_default,
      description,
    });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el Pokémon" });
  }
});

app.listen(PORT, () => console.log(`✅ Servidor corriendo en http://localhost:${PORT}`));
