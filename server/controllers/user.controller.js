const User = require("../models/user.model");
const _ = require('lodash');
const { validationResult } = require('express-validator');

module.exports.loginController = (req, res) => {
    const { username, password } = req.body;

    console.log({ username, password });
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const firstError = errors.array().map(error => error.msg)[0];
        return res.status(422).json({
          errors: firstError
        });
    } else {
        User.findOne({ username }).exec((err, user) => {
            console.log(user);
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