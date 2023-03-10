/* imports */
const UserModel = require('../models/users');
const { SendMail, SendMutipleMail } = require('../subscribers/mailer');
const sequelize = require('../config/helper');
const User = require('../models/users');
const bcrypt = require('bcrypt');
const token = require('../subscribers/token');

/* function to create an account */
const signUp = async(req, res, next) => {

    /* conditional statement to check for empty inputs of required parameters */
    if(!req.body.first_name || !req.body.last_name || 
        !req.body.email || !req.body.password || 
        !req.body.gender || !req.body.phone || !req.body.bio){
            res.status(200).json({ msg: 'all paramters are required' });
        }

        /* check for exiting user */
      await sequelize.sync().then(async() => {
        const user = await UserModel.findOne({ where: { email: req.body.email}});

        if(user){
            return res.status(400).json({ msg: "user with this email alreaddy exist"})
        }
      });
      
    /* variable to generate random numbers for otp verifivation*/
    const pin = `${Math.floor(1000 + Math.random() * 9000)}`;

    let result;

    /* hashing of password with bcrypt*/
    const salt = await bcrypt.genSalt(10);
    const passwordHashed = await bcrypt.hash(req.body.password, salt);

    /* creating of user */
    await sequelize.sync().then(async() => {

        await UserModel.sync().then(async() => {
           result = await UserModel.create({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: passwordHashed,
                gender: req.body.gender,
                bio: req.body.bio,
                phone: req.body.phone,
                otp: pin,
                status: false
            })
        }).then(async() => {
            SendMail(
                result.dataValues.email,
                `Interview verification`,
                `<p> make use of this pin to verify your account <b>${pin}</b></p>`
            )
            res.status(200).json({ msg: 'user created successfully, check your email to continue'});
        }).catch(e => {  res.status(200).json({ msg: e.message }); });

    });
    
}

/* function to verify a user account */
const verifyUser = async(req, res, next) => {

    /* checks for empty input */
    if(!req.body.email || !req.body.otp){
        return res.status(400).json({ msg: "confirm your details"});
    }

    /* check for user details */
    const user = await UserModel.findOne({ where: {email: req.body.email, otp: req.body.otp }});

    /* notify the user if details are not found */
    if(!user){
        return res.status(400).json({ msg: "confirm your details"});
    }

    /* check whether profile is verified already or not */
    if(user.status){
        return res.status(400).json({ msg: "user has been verified already"});
    }

    /* update user details to verify user */
    await UserModel.update({ status: true, otp: "0000"}, { where: { email: req.body.email}})
    .then((result) => {
        res.status(201).json({ msg: "email verified"})
    }).catch((e) => { res.status(201).json({ msg: e.message}); })
}

/* function to verify user details and login user*/
const login = async(req, res, next) => {

    /* check for empty details */
    if(!req.body.email || !req.body.password){
        return res.status(400).json({ msg: "confirm your details"});
    }

    /* check for user details */
    const user = await UserModel.findOne({ where: {email: req.body.email}});

    if(!user){
        return res.status(400).json({ msg: "confirm your details"});
    }

    console.log(user.dataValues.password);

    /* verify password */
    const compare = await bcrypt.compare(req.body.password, user.dataValues.password);

    if(!compare){
        return res.status(400).json({ msg: "incorrect details"});
    }

    res.status(200).json({
        msg: "user logged in",
        token: token(user.dataValues.id)
    });


}

/* exports */
module.exports = { signUp, verifyUser, login };