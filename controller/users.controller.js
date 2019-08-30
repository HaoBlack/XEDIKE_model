// TODO: require package from npm
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');


// TODO: require model 
const {User} = require("../models/User");
const {Driver} = require("../models/Driver");
const {Trip} = require("../models/Trip");
const secretKey = process.env.SECRET_KEY;


//TODO: set up package




// TODO: controller register
module.exports.createUser = (req, res) => {
    const { email, password, fullName, userType, phone, dateOfBirth } = req.body;
    let errors = {};
    // find if user is existed
    User.findOne({ $or: [{ email }, { phone }] })
    .then(user => {
        if (user) {
            if (user.email === email) errors.email = "Email already existed";
            if (user.phone === phone) errors.phone = "Phone already existed";
            return res.status(400).json(errors);
        }


        const newUser = new User({ email, password, fullName, userType, phone, dateOfBirth });

        // salt password to secret code and save
        bcrypt.genSalt(10, (err, salt) => {
            if (err) return res.status(400).json(err);
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) return res.status(400).json(err);
                newUser.password = hash;

                newUser.save()
                    .then(user => {
                        return res.status(200).json(user)
                    })
                    .catch(console.log)
            })
        })
    })
}

// TODO: controller login
module.exports.login = (req, res) => {
    const {email, password} = req.body;

    User.findOne({email})
        .then(user => {
            if(!user) return res.status(400).json({email: 'Error, email not match'});

            bcrypt.compare(password, user.password) // so sánh password nhập vs password dc hash
                .then(isMatch => {
                    if(!isMatch) return res.status(400).json({password: 'Wrong password'});

                    
                    const payload = {
                        id: user._id,
                        email: user.email,
                        fullName: user.fullName,
                        userType: user.userType,
                        avatar: user.avatar
                    }

                    // Nếu trùng khớp thì trả về 1 chuỗi token để xác nhận user đăng nhập
                    jwt.sign(
                        payload,
                        secretKey,
                        {expiresIn: "1h"},
                        (err, token) => {
                            res.status(200).json({
                                success: true,
                                token: 'Bearer ' + token
                            })
                        }
                    )
                })
        })
}

// TODO: get user info
module.exports.getUserInfo = (req, res) => {
    const id = req.params.userId;
    User.findById(id)
        .then(user => {
            if(!user) return res.status(400).json({error: "User doesn't exist"});
            return res.status(200).json(user)
        })
        .catch(err => {
            return res.status(400).json(err);
        })
}

// TODO: get users list
module.exports.getUserList = (req, res) => {
    User.find()
        .then(users => {
            return res.status(200).json(users)
        })
        .catch(err => {
            return res.status(400).json(err);
        })
}

// TODO: delete account
module.exports.deleteAccount = (req, res) => {
    User.findByIdAndDelete(req.user.id)
        .then(response => {
            return res.status(200).json({message: "Deleted"})
        })
        .catch(err => {
            return res.status(400).json(err);
        })
}

// TODO: upload avatar
module.exports.uploadAvatar = (req, res) => {
    User.findById(req.user.id)
        .then(user => {
            if(!user) return res.status(400).json({error: "User doesn't exist"});

            const regexPath = /(png|svg|jpg|jpeg)$/i;
            if(!regexPath.test(req.file.path)){
                return res.status.json({error: "Avatar must be image"});
            }
            user.avatar = req.file.path;
            return user.save()
        })
        .then(user => res.status(200).json(user))
        .catch(err => {
            return res.status(400).json(err);
        })
}

// TODO: update account
module.exports.updateAccount = (req, res) => {
    User.findById(req.user.id)
        .then( user => {
            if(!user) return res.status(400).json({error: "User doesn't exist"});

            const { fullName, dateOfBirth} = req.body;
            user.fullName = fullName;
            user.dateOfBirth = dateOfBirth;

            return user.save()            
        })
        .then(user => {
            return res.status(200).json(user)
        })
        .catch(err => {
            return res.status(400).json(err);
        })
}


// TODO: rate driver
module.exports.rateDriver = (req, res) => {
    const driverId = req.params.driverId;
    Driver.findOne({userId: driverId})
        .then(driver => {
            if(!driver) return res.status(400).json({error: "Driver not found"});

            const {raiting} = req.body;
            driver.passengerRates.push(raiting);
            return driver.save()
        })
        .then(driver => res.status(200).json(driver))
        .catch(err => res.status(400).json(err))
}

// TODO:  get user's history trip
module.exports.getUserHistoryTrip = (req, res) => {
    const userId = req.user.id;        
    Trip.find()
        .then(trips => {
            let userTripHistory = [];
            trips.map(trip => {
                trip.passengers.map(passenger => {
                    if(passenger.passengerId === userId)
                        userTripHistory.push(trip);
                })
            })
            return res.status(200).json(userTripHistory);
        })
        .catch(err => res.status(400).json(err))
}

module.exports.changePassword = (req, res) => {
    const userId = req.user.id;
    User.findById(userId)
        .then(user => {
            if(!user) return res.status(400).json({error: "User doesn't exist"});

            const {oldPassword, newPassword} = req.body;  

            bcrypt.compare(oldPassword, user.password) // so sánh password nhập vs password dc hash
                .then(isMatch => {
                    if(!isMatch) return res.status(400).json({password: 'Wrong password'});
                    
                    user.password = newPassword;
                    bcrypt.genSalt(10, (err, salt) => {
                        if(err) return res.status(400).json(err);
                        bcrypt.hash(user.password, salt, (err, hash) => {
                            if(err) return res.status(400).json(err);
                            user.password = hash;

                            user.save()
                                .then(user => {
                                    return res.status(200).json(user)
                                })
                                .catch(console.log)
                        })
                    })
                })                                  
        })
        .catch(err => res.status(400).json(err))
}