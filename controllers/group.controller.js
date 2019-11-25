const Group = require('../models/group.model.js');
const User = require('../models/user.model.js');

// Create and Save a new Group
exports.create = (req, res) => {
    // Validate request
    if(!req.body.name) {
        return res.status(400).send({
            message: "Group name can not be empty"
        });
    }
    if(!req.body.owner) {
        return res.status(400).send({
            message: "Group owner can not be empty"
        });
    }
    // Create a Group
    const group = new Group({
        name: req.body.name || 'Untitled Group', 
        owner: req.body.owner
    });

    // Save Group in the database
    group.save()
    .then(data => {
        res.status(201).send({
            message: 'Group successfully created',
            id: data._id
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error."
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
            owner: group.owner
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error."
        });
    });
};

// Update a group identified by the group_id in the request
exports.update = (req, res) => {
    // Find group and update it with the request body
    Group.findByIdAndUpdate(req.params.group_id, {
        name: req.body.name, 
        owner: req.body.owner
    }, {new: true, omitUndefined: true})
    .then(group => {
        if(!group) {
            return res.status(404).send({
                message: "Group not found with id " + req.params.group_id
            });
        }
        res.status(200).send({
            message: 'Group successfully updated',
            id: group._id,
            name: group.name,
            owner: group.owner
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error."
        });
    });
};

// Delete a group with the specified group_id in the request
exports.delete = (req, res) => {
    Group.findByIdAndRemove(req.params.group_id)
    .then(group => {
        if(!group) {
            return res.status(404).send({
                message: "Group not found with id " + req.params.group_id
            });
        }
        res.status(200).send({
            message: 'Group successfully deleted',
            id: group._id
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error."
        });
    });
};

// Add an user to group
exports.assignGroup = (req, res) => {
    // Find user and add group_id to its groups
    User.findByIdAndUpdate(req.params.user_id, {
        $addToSet: { groups: req.params.group_id }
    })
    .then(user => {
        if(user) {
            res.status(200).send({
                message: 'Added group for user',
                id: user._id,
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error."
        });
    });
};
