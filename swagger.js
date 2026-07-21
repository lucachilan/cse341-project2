const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Inventory and Maintenance API',
        description: 'Inventory and Maintenance Api'
    },
    host: 'localhost:8080',
    schemes: ['http','https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

//this will generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);