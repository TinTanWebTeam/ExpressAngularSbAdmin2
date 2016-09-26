const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const appConfig = require('../configs/app.config');
const UserModel = require('../models/user.model');

let authRoute = express.Router();

let handleResult = {
    checkUserInDatabase: function(username, password, res) {
        try {
            UserModel.findOne({
                username: username
            }, function(error, user) {
                if (error) {
                    res.status(400).send(error);
                } else {
                    bcrypt.compare(password, user.password, function(err, result) {
                        if (err) {
                            res.status(400).send(err);
                        } else {
                            if (result) {
                                handleResult.generateToken(user, res);
                            } else {
                                res.status(400).send({
                                    message: 'Password miss match!'
                                });
                            }
                        }
                    });
                }
            });
        } catch (exception) {
            res.status(400).send(exception);
        }
    },
    generateToken: function(user, res) {
        let userInfo = {
            username: user.username,
            email: user.email,
            role: user.role,
            login_at: moment(),
            expire_at: moment().add(7,'day'),
            token: null
        };
        try {
            let token = jwt.sign(userInfo, appConfig.secret, {
                expiresIn: '7d'
            });
            if (token) {
                userInfo.token = token;
                res.status(201).send(userInfo);
            } else {
                res.status(400).send({
                    message: 'Some thing went wrong!'
                });
            }
        } catch (exception) {
            res.status(400).send(exception);
        }
    }
};

authRoute.post('/', function(req, res) {
    if (req.body.username && req.body.password) {
        handleResult.checkUserInDatabase(req.body.username, req.body.password, res);
    } else {
        res.status(400).send({
            message: 'Please enter username and password!'
        });
    }
});

module.exports = authRoute;