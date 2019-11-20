const Group = require('../models/group.model.js');

// Create and Save a new Group
exports.create = (req, res) => {
    // Create a Group
    const group = new Group({
        name: req.body.name || 'Untitled Group', 
        email: req.body.email  || 'example@test.com',
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
        // groups: req.body.groups,
    });

    // Save Group in the database
    group.save()
    .then(data => {
        res.status(201).send({
            message: 'Group successfully created',
            id: data._id
        });
    });
};

// Find a single group with a group_id
exports.findOne = (req, res) => {
    Group.findById(req.params.group_id)
    .then(group => {
        if(!group) {
            return res.status(404).send({
                message: 'Group not found with id ' + req.params.group_id
            });            
        }
        res.status(200).send({
            id: group._id,
            name: group.name,
            email: group.email
        });
    });
};

// Update a group identified by the group_id in the request
exports.update = (req, res) => {
    // Find group and update it with the request body
    Group.findByIdAndUpdate(req.params.group_id, {
        name: req.body.name || 'Untitled Group', 
        email: req.body.email  || 'example@test.com',
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
        // groups: req.body.groups,
    }, {new: true})
    .then(group => {
        if(group) {
            res.status(200).send({
                message: 'Group successfully updated',
                id: group._id,
                name: group.name,
                email: group.email
            });
        }
    });
};

// Delete a group with the specified group_id in the request
exports.delete = (req, res) => {
    Group.findByIdAndRemove(req.params.group_id)
    .then(group => {
        if(group) {
            res.status(200).send({
                message: 'Group successfully deleted',
                id: group._id
            });
        }
    });
};

// Add an user to group
exports.update = (req, res) => {
    User.findOne(req.params.user_id)
    .then(user => {
        if (user) {
            // Find user and add group_id to its groups
            User.findByIdAndUpdate(req.params.user_id, {
                groups: [...user.groups, req.params.group_id]
            }, {new: true})
            .then(group => {
                if(group) {
                    res.status(200).send({
                        message: 'Group successfully updated',
                        id: group._id,
                        name: group.name,
                        email: group.email
                    });
                }
            });
        }
    });
};
