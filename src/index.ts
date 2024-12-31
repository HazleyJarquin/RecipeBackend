import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./database";
import recipeRoutes from "./routes/recipeRoutes";
import userRoutes from "./routes/userRoutes";

import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";

// Configurar variables de entorno
dotenv.config();

// Crear app de Express
const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0", // Versión OpenAPI
    info: {
      title: "API de Recetas",
      version: "1.0.0",
      description: "Una API para gestionar recetas y usuarios",
    },
    servers: [
      {
        url:
          process.env.NODE_ENV === "production"
            ? "https://recipe-backend-seven.vercel.app"
            : `http://localhost:${PORT}`,
      },
    ],
  },
  apis: [`${__dirname}/routes/*.ts`],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Ruta para servir los archivos estáticos de Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Ruta para servir archivos estáticos de Swagger UI directamente desde el paquete
app.use(
  "/swagger-ui",
  express.static(path.join(require.resolve("swagger-ui-dist"), ".."))
);

// Conectar a la base de datos
connectDB();

// Rutas
app.use("/api/recipes", recipeRoutes);
app.use("/api/users", userRoutes); // Ruta de usuarios

// Ruta base
app.get("/", (req, res) => {
  res.send("API funcionando con TypeScript");
});

// Arrancar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
