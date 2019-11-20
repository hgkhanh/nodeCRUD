const Project = require('../models/project.model.js');

// Create and Save a new Project
exports.create = (req, res) => {
    // Validate request
    if(!req.body.name || !req.body.description 
        || !req.body.type || !req.body.members) {
        return res.status(400).send({
            message: "Lacking required field"
        });
    }
    if (req.body.members.length === 1 && req.body.type !== 'Personal') {
        return res.status(400).send({
            message: "Project with one member must be type Personal"
        });
    }
    if (req.body.members.length > 1 && req.body.type !== 'Group') {
        return res.status(400).send({
            message: "Project with one member must be type Group"
        });
    }
    // Create a Project
    const project = new Project({
        name: req.body.name,
        description: req.body.description,
        type: req.body.type,
        members: req.body.members,
    });

    // Save Project in the database
    project.save()
        .then(data => {
            res.status(201).send({
                message: 'Project successfully created',
                id: data._id
            });
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Error."
            });
        });
};

// Find a single project with a project_id
exports.findOne = (req, res) => {
    Project.findById(req.params.project_id)
        .then(project => {
            if (!project) {
                return res.status(404).send({
                    message: 'Project not found with id ' + req.params.project_id
                });
            }
            res.status(200).send({
                id: project._id,
                name: project.name,
                description: project.description,
                type: project.type,
                members: project.members
            });
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Error."
            });
        });
};

// Update a project identified by the project_id in the request
exports.update = (req, res) => {
    // Find project and update it with the request body
    Project.findByIdAndUpdate(req.params.project_id, {        
        name: req.body.name,
        description: req.body.description,
        type: req.body.type,
        members: req.body.members,
    }, { new: true, omitUndefined: true})
        .then(project => {
            if (project) {
                res.status(200).send({
                    message: 'Project successfully updated',
                    id: project._id,
                    name: project.name,
                    description: project.description,
                    type: project.type,
                    members: project.members
                });
            }
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Error."
            });
        });
};

// Delete a project with the specified project_id in the request
exports.delete = (req, res) => {
    Project.findByIdAndRemove(req.params.project_id)
        .then(project => {
            if (!project) {
                return res.status(404).send({
                    message: "Project not found with id " + req.params.project_id
                });
            }
            res.status(200).send({
                message: 'Project successfully deleted',
                id: project._id
            });
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Error."
            });
        });
};
