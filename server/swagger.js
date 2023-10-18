const swaggerAutogen = require('swagger-autogen')()

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
    securityDefinitions: {},  // by default: empty object
    definitions: {},          // by default: empty object (Swagger 2.0)
    components: {}            // by default: empty object (OpenAPI 3.x)
  };
  

const outputFile = './swagger_output.json'
const endpointsFiles = ['./index.js']

swaggerAutogen(outputFile, endpointsFiles)