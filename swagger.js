const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Inventory and Maintenance API',
        description: 'Inventory and Maintenance Api'
    },
    host: 'localhost:3000',
    schemes: ['https', 'http'],
    tags: [
        { name: 'Authentication', description: 'GitHub OAuth login and logout endpoints' },
        { name: 'Inventory', description: 'Manage inventory items. GET routes are public. POST, PUT, DELETE require login.' },
        { name: 'Maintenance', description: 'Manage maintenance records. GET routes are public. POST, PUT, DELETE require login.' }
    ],
    securityDefinitions: {
        githubOAuth: {
            type: 'oauth2',
            authorizationUrl: 'https://github.com/login/oauth/authorize',
            flow: 'implicit',
            scopes: {
                'read:user': 'Read GitHub user profile'
            }
        }
    }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// this will generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
