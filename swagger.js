const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Inventory and Maintenance API',
        description: 'Inventory and Maintenance Api'
    },
    host: 'cse341-project2-7ss5.onrender.com',
    schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

//this will generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);