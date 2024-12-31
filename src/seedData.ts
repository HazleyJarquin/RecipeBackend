import mongoose from "mongoose";
import dotenv from "dotenv";
import Recipe from "./models/Recipe";
import User from "./models/User"; // Asegúrate de importar tu modelo de usuario

dotenv.config();

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "");
    console.log("Conectado a MongoDB");
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    await connectDB();

    // Crear un usuario
    const user = new User({
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

    await Recipe.deleteMany(); // Limpia la colección de recetas (opcional)
    await Recipe.insertMany(recipes);

    console.log("Recetas insertadas correctamente");
    process.exit();
  } catch (error) {
    console.error("Error al insertar datos:", error);
    process.exit(1);
  }
};

seedData();
