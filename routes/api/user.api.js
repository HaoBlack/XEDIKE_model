// TODO: require package from npm
const express = require('express');
const passport = require("passport");
const upload = require("../../config/upload");


// TODO: require package
const {validateRegister, validateLogin} = require("../../validation/validateUser");
const {authorizing} = require("../../middleware/auth");
const {User} = require("../../models/User");
const {Trip} = require("../../models/Trip");
const {
    createUser,
    login,
    getUserInfo,
    getUserList,
    deleteAccount,
    uploadAvatar,
    updateAccount,
    rateDriver,
    getUserHistoryTrip,
    changePassword
} = require("../../controller/users.controller");


// TODO: set up package
const router = express.Router();

// ------------------ ROUTER -----------------------

// route: api/user/register
// desc: register api
// status: public
router.post('/register', validateRegister, createUser);


// route: api/user/register
// desc: register api
// status: public
router.post("/login", validateLogin, login);

// route: api/user/getUsersList
// desc: get user list
// status: public
router.get("/getUsersList", getUserList);


// route: api/user/test-private
// desc: test pass authentication
// status: private
router.get("/testPassport",
    passport.authenticate("jwt", {session: false}),
    authorizing("passenger"),
    (req, res) => {
        return res.status(200).json(req.user);
    }
);

// route: api/user/deleteAccount
// desc: delete user
// status: private (passenger and driver)
router.delete("/deleteAccount", 
    passport.authenticate("jwt", {session: false}),
    deleteAccount
);

// route: api/user/uploadAvatar
// desc: upload avatar
// status: private (passenger and driver)
router.post("/uploadAvatar", 
    passport.authenticate("jwt", {session: false}),
    upload.single("avatar"),
    uploadAvatar
);

// route: api/user/updateAccount
// desc:  update account
// status: private (passenger and driver)
router.patch("/updateAccount", 
    passport.authenticate("jwt", {session: false}),
    updateAccount
);

// route: api/user/rateDriver/:driverId
// desc:  rate driver
// status: private (passenger)
router.post("/rateDriver/:driverId", 
    passport.authenticate("jwt", {session: false}),
    authorizing("passenger"),
    rateDriver
)

// route: api/user/getUserTrip
// desc:  get user's history trip
// status: private (passenger)
router.get("/getUserTrip", 
    passport.authenticate("jwt", {session: false}),
    authorizing("passenger"),
    getUserHistoryTrip
)

// route: api/user/changePassword
// desc:  change user's password
// status: private 
router.patch("/changePassword", 
    passport.authenticate("jwt", {session: false}),
    changePassword
)

// route: api/user/:userId
// desc: get user info
// status: public
router.get("/:userId", getUserInfo);




module.exports = router;