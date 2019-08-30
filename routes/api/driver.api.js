// TODO: require package from npm
const express = require("express");
const passport = require("passport");



// TODO: require package
const {authorizing} = require("../../middleware/auth");
const upload = require("../../config/upload");
const {
    validateDriverProfile,
    validateDriverCar
} = require("../../validation/validateDriver");
const {
    createDriverProfile,
    deleteDriverProfile,
    getDriverProfile,
    addDriverCar,
    updateDriverCar,
    deleteDriverCar,
    getDriverTrip,
    adjustDriverProfile,
    addCarImage
} = require("../../controller/drivers.controller");
const {Driver} = require("../../models/User");
const {Trip} = require("../../models/Trip");


// TODO: set up package
const router = express.Router();


// route: api/user/driver/createProfile
// desc: create profile for driver
// status: private
router.post("/createProfile", 
    passport.authenticate("jwt", {session: false}),
    authorizing("driver"),
    validateDriverProfile,
    createDriverProfile
);

router.post("/adjustDriverProfile",
    passport.authenticate("jwt", {session: false}),
    authorizing("driver"),
    validateDriverProfile,
    adjustDriverProfile
)

// route: api/user/driver/deleteProfile
// desc: delete driver's profile
// status: private
router.delete("/deleteProfile", 
    passport.authenticate("jwt", {session: false}),
    authorizing("driver"),
    deleteDriverProfile
);

// route: api/user/driver/addCar
// desc: add car for driver
// status: private
router.post("/addCar", 
    passport.authenticate("jwt", {session: false}),
    authorizing("driver"),
    // validateDriverCar,
    addDriverCar
);

router.patch("/addCarImage/:carId",
    passport.authenticate("jwt", {session: false}),
    authorizing("driver"),
    upload.single('carImage'),
    addCarImage
)

// route: api/user/driver/updateCar/:carId
// desc: update car
// status: private
router.patch("/updateCar/:carId", 
    passport.authenticate("jwt", {session: false}),
    authorizing("driver"),
    // validateDriverCar,
    updateDriverCar
);

// route: api/user/driver/deleteCar/:carId
// desc: delete driver's car
// status: private
router.post("/deleteCar/:carId", 
    passport.authenticate("jwt", {session: false}),
    authorizing("driver"),
    deleteDriverCar
);

// route: api/user/driver/getDriverTrip
// desc: get driver's trips created
// status: private
router.get("/getDriverTrip",
    passport.authenticate("jwt", {session: false}),
    authorizing("driver"),
    getDriverTrip
)

// route: api/user/driver/:driverId
// desc: get driver info
// status: public
router.get("/:driverId", getDriverProfile);

module.exports = router;
