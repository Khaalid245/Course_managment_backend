// swaggerConfig.js
const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Course Management Platform API",
      version: "1.0.0",
      description: "Backend API documentation for the Course Management Platform",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Local server",
      },
    ],
  },
  apis: ["./routes/*.js"], // 👈 This tells Swagger where to look for your route comments
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
