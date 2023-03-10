/* imports */
const jwt = require("jsonwebtoken")
require("dotenv").config()

/* this function generate token for the passed id */
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" }, process.env.JWT_SECRET)
}

/* exports */
module.exports = generateToken