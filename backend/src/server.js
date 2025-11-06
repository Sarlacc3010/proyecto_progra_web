import express from "express";
import cors from "cors";
import pokemonRoutes from "./routes/pokemon.routes.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/pokemon", pokemonRoutes);

app.listen(PORT, () => console.log(`✅ Servidor corriendo en http://localhost:${PORT}`));
