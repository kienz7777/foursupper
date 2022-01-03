const User = require("../models/user.model");
const _ = require('lodash');
const { validationResult } = require('express-validator');

module.exports.loginController = (req, res) => {
    const { username, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const firstError = errors.array().map(error => error.msg)[0];
        return res.status(422).json({
          errors: firstError
        });
    } else {
        User.findOne({ username }).exec((err, user) => {
            if (err || !user) {
                return res.status(400).json({
                    errors: 'User does not exits. Please retype'
                });
            } else {
                if (user.password === password) {
                    const { _id, permission } = user;
                    return res.json({ _id, username, password, permission });
                } else {
                    return res.status(400).json({
                        errors: 'Email and password do not match'
                      });
                }
            }
        });
    }
};

module.exports.getAll = (req, res) => {
    User.find({}).exec((err, user) => {
        return res.json(user);
    });
};

module.exports.resetPayment = (req, res) => {
    User.updateMany({},
        { $set: { payment: 0 } },
        (err, data) => {
        if (err) return res.json({success: false, errors: err});
        return res.json({
            success: true,
            messages: 'Reset all payment successfully!'
        });
    });
};