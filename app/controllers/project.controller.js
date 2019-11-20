const Project = require('../models/project.model.js');

// Create and Save a new Project
exports.create = (req, res) => {
    // Create a Project
    const project = new Project({
        name: req.body.name || 'Untitled Project', 
        description: req.body.description  || 'example@test.com',
        type: req.body.type,
        // members: req.body.members,
    });

    // Save Project in the database
    project.save()
    .then(data => {
        res.status(201).send({
            message: 'Project successfully created',
            id: data._id
        });
    });
};

// Find a single project with a project_id
exports.findOne = (req, res) => {
    Project.findById(req.params.project_id)
    .then(project => {
        if(!project) {
            return res.status(404).send({
                message: 'Project not found with id ' + req.params.project_id
            });            
        }
        res.status(200).send(project);
    });
};

// Update a project identified by the project_id in the request
exports.update = (req, res) => {
    // Find project and update it with the request body
    Project.findByIdAndUpdate(req.params.project_id, {
        name: req.body.name || 'Untitled Project', 
        email: req.body.email  || 'example@test.com',
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
        // groups: req.body.groups,
    }, {new: true})
    .then(project => {
        if(project) {
            res.status(200).send({
                message: 'Project successfully updated',
                ...project,
            });
        }
    });
};

// Delete a project with the specified project_id in the request
exports.delete = (req, res) => {
    Project.findByIdAndRemove(req.params.project_id)
    .then(project => {
        if(project) {
            res.status(200).send({
                message: 'Project successfully deleted',
                id: project._id
            });
        }
    });
};
