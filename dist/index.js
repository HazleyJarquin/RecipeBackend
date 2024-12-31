"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const database_1 = __importDefault(require("./database"));
const recipeRoutes_1 = __importDefault(require("./routes/recipeRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
// Configurar variables de entorno
dotenv_1.default.config();
// Crear app de Express
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)());
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
                url: `http://localhost:${PORT}`,
            },
        ],
    },
    apis: [`${__dirname}/routes/*.ts`],
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(swaggerOptions);
console.log(swaggerSpec);
// Rutas de Swagger
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
// Conectar a la base de datos
(0, database_1.default)();
// Rutas
app.use("/api/recipes", recipeRoutes_1.default);
app.use("/api/users", userRoutes_1.default); // Ruta de usuarios
// Ruta base
app.get("/", (req, res) => {
    res.send("API funcionando con TypeScript");
});
// Arrancar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
