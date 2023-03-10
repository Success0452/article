/* imports */
const express = require('express');
const UserFunctions = require('../controllers/users');

let usersRoute = express();

/* user route implmentation */
usersRoute.post("/create", UserFunctions.signUp);
usersRoute.post("/verify", UserFunctions.verifyUser);
usersRoute.post("/login", UserFunctions.login);

/* exports */
module.exports = usersRoute;