module.exports = (app) => {
    const user = require('../controllers/user.controller.js');

    // Create a new User
    app.post('/user', user.create);

    // Retrieve all Users from a group or project
    app.get('/users', user.findAll);

    // Retrieve a single User with user_id
    app.get('/user/:user_id', user.findOne);

    // Update a User with user_id
    app.put('/user/:user_id', user.update);

    // Delete a User with user_id
    app.delete('/user/:user_id', user.delete);
}
