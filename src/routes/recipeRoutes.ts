import { Router } from "express";
import Recipe from "../models/Recipe";

const router = Router();

/**
 * @swagger
 * /api/recipes:
 *   get:
 *     description: Obtener todas las recetas
 *     responses:
 *       200:
 *         description: Lista de recetas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   ingredients:
 *                     type: array
 *                     items:
 *                       type: string
 *                   steps:
 *                     type: array
 *                     items:
 *                       type: string
 *                   image:
 *                     type: string
 *                   createdBy:
 *                     type: string
 *       500:
 *         description: Error al obtener recetas
 */
router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener recetas" });
  }
});

/**
 * @swagger
 * /api/recipes:
 *   post:
 *     description: Crear una nueva receta
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Torta de manzana"
 *               description:
 *                 type: string
 *                 example: "Una deliciosa torta de manzana, perfecta para el postre."
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["manzanas", "harina", "azúcar", "huevos"]
 *               steps:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Pelar las manzanas", "Mezclar los ingredientes", "Hornear a 180°C por 30 minutos"]
 *               image:
 *                 type: string
 *                 description: "URL de la imagen (opcional)"
 *                 example: "http://example.com/recipe-image.jpg"
 *               createdBy:
 *                 type: string
 *                 format: uuid
 *                 description: "ID del creador de la receta (referencia al usuario)"
 *                 example: "5f4e6d7fbdc6b62b4c84a623"
 *     responses:
 *       201:
 *         description: Receta creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 ingredients:
 *                   type: array
 *                   items:
 *                     type: string
 *                 steps:
 *                   type: array
 *                   items:
 *                     type: string
 *                 image:
 *                   type: string
 *                 createdBy:
 *                   type: string
 *       500:
 *         description: Error al crear la receta
 */

router.post("/", async (req, res) => {
  try {
    const recipe = new Recipe(req.body);
    const savedRecipe = await recipe.save();
    res.status(201).json(savedRecipe);
  } catch (error) {
    res.status(500).json({ error: "Error al crear receta" });
  }
});

export default router;
