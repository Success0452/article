const express = require('express');
const UserFunctions = require('../controllers/users');

let usersRoute = express();

usersRoute.post("/create", UserFunctions.signUp);
usersRoute.post("/verify", UserFunctions.verifyUser);
usersRoute.post("/login", UserFunctions.login);

module.exports = usersRoute;