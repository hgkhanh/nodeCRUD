module.exports = (app) => {
    const project = require('../controllers/project.controller.js');

    // Create a new Project
    app.post('/project', project.create);

    // Retrieve a single Project with project_id
    app.get('/project/:project_id', project.findOne);

    // Update a Project with project_id
    app.put('/project/:project_id', project.update);

    // Delete a Project with project_id
    app.delete('/project/:project_id', project.delete);
}
