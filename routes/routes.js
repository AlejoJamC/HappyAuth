/**
 * Module dependencies
 */
var logger = require('../config/logger');

/**
 * setupRouter
 *
 * @description Configure all routes on express router
 *
 * @param {express.Router}      router      The variable router used by the server
 */
function setupRouter (router){
    // logger for all request will first hits this 'middleware'
    router.use(function (req, res, next) {
        logger.info('%s %s', req.method, req.url);
    });

    // Declare all routes
    var userRoutes = require('./users');
    var authRoutes = require('./auth');
    var clientRoutes = require('./clients');
    var oauth2Routes = require('./oauth2');

    // -----------------------------------
    //Create endpoints handlers for /users
    // /users
        router.route('/users')
            .post(userRoutes.postUsers)
            .get(authRoutes.isAuthenticated, userRoutes.getUsers);
    // /users/:id
        router.route('/users/:id')
            .get(authRoutes.isAuthenticated, userRoutes.getUserById);
    // -----------------------------------

    // -----------------------------------
    //Create endpoints handlers for /clients
    // /users
        router.route('/clients')
            .post(authRoutes.isAuthenticated, clientRoutes.postClients)
            .get(authRoutes.isAuthenticated, clientRoutes.getClients);
    // /users/:id
    // -----------------------------------

    // -----------------------------------
    //Create endpoints handlers for authorization of clients
    // /oauth2/authorize
        router.route('/oauth2/authorize')
            .post(authRoutes.isAuthenticated, oauth2Routes.decision)
            .get(authRoutes.isAuthenticated, oauth2Routes.authorization);
    //Create endpoints handlers to create tokens
    // /oauth2/token
        router.route('/oauth2/token')
            .post(authRoutes.isClientAuthenticated, oauth2Routes.token);
    // -----------------------------------
}

// Export the function that initialize all routes
module.exports.setupRouter = setupRouter;