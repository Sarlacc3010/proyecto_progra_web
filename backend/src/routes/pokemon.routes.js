import express from "express";
import { getPokemons } from "../controllers/pokemon.controller.js";

const router = express.Router();

router.get("/", getPokemons);

export default router;
