const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Ecommmerce API ',
    version: '1.0.0',
    description: 'Documentation',
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};


const swaggerDefinition2 = {
  openapi: '3.0.0',
  info: {
    title: 'Ecommmerce API ',
    version: '1.0.0',
    description: 'Documentation',
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const userOptions = {
  swaggerDefinition,
  apis: ['./swagger/user/*.js'],
};

const swaggerSpec = swaggerJsdoc(userOptions);

//admin
const adminOptions = {
  swaggerDefinition,
  apis: ['./swagger/admin/*.js'],
};

const swaggerSpec2 = swaggerJsdoc(adminOptions);
module.exports = {
  swaggerUi,
  swaggerSpec,
  swaggerSpec2
};
