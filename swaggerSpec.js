import express from 'express';
import swaggerJSDoc from 'swagger-jsdoc';

// const swaggerRouter = express.Router();

// Swagger definition
const swaggerDefinition = {
  info: {
    openapi: '3.0.21', // Version of swagger
    title: 'Btssocial Backend API', // Title of the documentation
    version: '1.0.0', // Version of the app
    description: 'A social media application for social media enthusiasts', // short description of the app
    termsOfService: 'https://btssocial.netlify.app/terms_of_service',
    contact: {
      name: 'btssocial Contact',
      url: 'https://btssocial.netlify.app/contact_us',
      email: 'btssocial'
    }
  },
  servers: [
    {
      url: 'https://btssocial.herokuapp.com',
      description: 'Staging server'
    },
    {
      url: 'http://localhost:3000',
      description: 'Local server'
    }
  ]
};

// options for the swagger docs
const options = {
  // import swaggerDefinitions
  swaggerDefinition,
  explorer: true,
  // path to the API docs
  apis: ['src/v1/jsdocs/**/*.yaml']
};

// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
