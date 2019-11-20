module.exports = (app) => {
    const group = require('../controllers/group.controller.js');

    // Create a new Group
    app.post('/group', group.create);

    // Retrieve a single Group with group_id
    app.get('/group/:group_id', group.findOne);

    // Update a Group with group_id
    app.put('/group/:group_id', group.update);

    // Delete a Group with group_id
    app.delete('/group/:group_id', group.delete);

    // Put User into a Group
    app.put('/group/:group_id/:user_id', group.assignUser);
}
