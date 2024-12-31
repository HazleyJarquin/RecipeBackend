"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const Recipe_1 = __importDefault(require("./models/Recipe"));
const User_1 = __importDefault(require("./models/User")); // Asegúrate de importar tu modelo de usuario
dotenv_1.default.config();
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(process.env.MONGO_URI || "");
        console.log("Conectado a MongoDB");
    }
    catch (error) {
        console.error("Error al conectar a MongoDB:", error);
        process.exit(1);
    }
};
const seedData = async () => {
    try {
        await connectDB();
        // Crear un usuario
        const user = new User_1.default({
            username: "admin", // Cambia esto según lo desees
            email: "admin@example.com",
            password: "hashed_password", // Hashea esto con bcrypt si es un entorno real
        });
        const savedUser = await user.save();
        console.log("Usuario creado:", savedUser);
        const recipes = [
            {
                title: "Tacos de carne",
                description: "Deliciosos tacos con carne marinada.",
                ingredients: ["Carne", "Tortillas", "Cilantro", "Cebolla", "Limón"],
                steps: [
                    "Marinar la carne",
                    "Asar la carne",
                    "Calentar tortillas",
                    "Servir",
                ],
                image: "url_de_imagen",
                createdBy: savedUser._id,
            },
        ];
        await Recipe_1.default.deleteMany(); // Limpia la colección de recetas (opcional)
        await Recipe_1.default.insertMany(recipes);
        console.log("Recetas insertadas correctamente");
        process.exit();
    }
    catch (error) {
        console.error("Error al insertar datos:", error);
        process.exit(1);
    }
};
seedData();
