const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "API Biblioteca",
      version: "1.0.0",
      description: "Sistema de gestión bibliotecaria"
    },

    servers: [
      {
        url: "https://proyecto-biblioteca-universitaria.onrender.com"
      }
    ]
  },

  // IMPORTANTE
  apis: ["./index.js"]
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = swaggerSpec;