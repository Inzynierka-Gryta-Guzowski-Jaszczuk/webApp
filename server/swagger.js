const swaggerAutogen = require('swagger-autogen')({openapi: '3.0.0'})

const doc = {
    info: {
      version: '',      // by default: '1.0.0'
      title: '',        // by default: 'REST API'
      description: '',  // by default: ''
    },
    host: 'localhost:5000',      // by default: 'localhost:3000'
    basePath: '',  // by default: '/'
    schemes: [],   // by default: ['http']
    consumes: [],  // by default: ['application/json']
    produces: [],  // by default: ['application/json']
    tags: [        // by default: empty Array
      {
        name: 'Auth',         // Tag name
        description: '',  // Tag description
      },
      {
        name: 'Comments',         // Tag name
        description: '',  // Tag description
      },
      {
        name: 'Recipes',         // Tag name
        description: '',  // Tag description
      },
      {
        name: 'Images',         // Tag name
        description: '',  // Tag description
      },
      {
        name: 'Users',         // Tag name
        description: '',  // Tag description
      },
      // { ... }

    ],
    securityDefinitions: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
    }

    },  // by default: empty object
    definitions: {
      "Recipe": {
        "id": "awdawdawdawdawd",
          "name": "User1",
      },
      "User": {
          "userId": "awdawdawdawdawd",
          "userName": "User1",
          "firstName": "Kamil",
          "lastName": "Kowalczyk",
          "email": "email@email.com",
          "image": "http://localhost:5000/static/defaultUser.png",
          "my_recipes": [
            {
              "$ref": "#/components/schemas/Recipe"
            }
          ],
          "saved_recipes": [
            {
              "$ref": "#/components/schemas/Recipe"
            }
          ]
        
      }


    },          // by default: empty object (Swagger 2.0)
    components: {}            // by default: empty object (OpenAPI 3.x)
  };
  

const outputFile = './swagger_output.json'
const endpointsFiles = ['./index.js']

swaggerAutogen(outputFile, endpointsFiles, doc)