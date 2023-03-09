require("dotenv").config()
const User = require("../models/users");
const jwt = require("jsonwebtoken")

const protect = async(req, res, next) => {
    let token;
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith("Bearer ")) {
        return res.status(400).json({ msg: "Invalid authorization format"})
    }

    token = auth.split(' ')[1]

    const decode = jwt.verify(token, process.env.JWT_SECRET)

    req.header = await User.findOne({where: {id: decode.id}})

    next()
}

module.exports = protect;