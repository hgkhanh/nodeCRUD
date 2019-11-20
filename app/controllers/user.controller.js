const User = require('../models/user.model.js');

// Create and Save a new User
exports.create = (req, res) => {
    // Validate request
    if(!req.body.name) {
        return res.status(400).send({
            message: "User name can not be empty"
        });
    }
    if(!req.body.email) {
        return res.status(400).send({
            message: "User email can not be empty"
        });
    }
    // Create a User
    const user = new User({
        name: req.body.name, 
        email: req.body.email,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
        groups: req.body.groups,
    });

    // Save User in the database
    user.save()
    .then(data => {
        res.status(201).send({
            message: 'User successfully created',
            id: data._id
        });
    });
};

// Find a single user with a user_id
exports.findOne = (req, res) => {
    User.findById(req.params.user_id)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: 'User not found with id ' + req.params.user_id
            });            
        }
        res.status(200).send({
            id: user._id,
            name: user.name,
            email: user.email
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error."
        });
    });
};

// Retrieve and return users by groupID or projectID.
exports.findAll = (req, res) => {
    if (req.param.groupID) {
        User.find({
            groups: req.params.groupID
        })
        .then(users => {
            res.send(users);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Error."
            });
        });
    }
    else if (req.param.projectID) {
        Project.findById(req.params.project_id)
        .then(project => {
            User.find({
                '_id': { $in: project.members }
            })
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Error."
            });
        });
    }
};

// Update a user identified by the user_id in the request
exports.update = (req, res) => {
    // Find user and update it with the request body
    User.findByIdAndUpdate(req.params.user_id, {
        name: req.body.name, 
        email: req.body.email,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
        groups: req.body.groups,
    }, {new: true, omitUndefined: true})
    .then(user => {
        if(user) {
            res.status(200).send({
                message: 'User successfully updated',
                id: user._id,
                name: user.name,
                email: user.email
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error."
        });
    });
};

// Delete a user with the specified user_id in the request
exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.user_id)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.user_id
            });
        }
        res.status(200).send({
            message: 'User successfully deleted',
            id: user._id
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error."
        });
    });
};
