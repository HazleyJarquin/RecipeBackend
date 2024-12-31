"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = __importDefault(require("../models/User"));
const router = (0, express_1.Router)();
/**
 * @swagger
 * /api/users/register:
 *   post:
 *     description: Registrar un nuevo usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *       400:
 *         description: El usuario ya existe
 *       500:
 *         description: Error al registrar el usuario
 */
router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        // Comprobar si el usuario ya existe
        const existingUser = await User_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "El usuario ya existe" });
        }
        // Crear y guardar el nuevo usuario
        const user = new User_1.default({ username, email, password });
        const savedUser = await user.save();
        res.status(201).json(savedUser);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al registrar el usuario" });
    }
});
/**
 * @swagger
 * /api/users/login:
 *   post:
 *     description: Iniciar sesión con el email y la contraseña
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     username:
 *                       type: string
 *                     email:
 *                       type: string
 *       401:
 *         description: Contraseña incorrecta
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error al iniciar sesión
 */
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        // Comprobar si el usuario existe
        const user = await User_1.default.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        // Validar la contraseña (esto se debe mejorar con un hash de contraseñas)
        if (user.password !== password) {
            return res.status(401).json({ error: "Contraseña incorrecta" });
        }
        res.status(200).json({ message: "Login exitoso", user });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al iniciar sesión" });
    }
});
exports.default = router;
