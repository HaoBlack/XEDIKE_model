
// TODO: require package
const {Driver} = require("../models/Driver");
const {Car} = require("../models/Car");
const {Trip} = require("../models/Trip");
const upload = require("../config/upload");

// TODO: create driver's profile
module.exports.createDriverProfile = (req, res) => {
    const {address, passportId, job} = req.body;

    Driver.findOne({userId: req.user.id})
        .then(driver => {
            if(driver) {
                return res.status(400).json({error: "Driver's profile existed"});
            }
            const newDriver = new Driver(
                {
                userId: req.user.id ,
                address, passportId, job}
                );
            return newDriver.save()
        })
        .then(driver => res.status(200).json(driver))
        .catch(err => res.status(400).json(err))
}

module.exports.adjustDriverProfile = (req, res) => {
    const {address, passportId, job} = req.body;
    console.log(req.body);
    Driver.findOne({userId: req.user.id})
        .then(driver => {
            console.log(driver);
            if(!driver) {
                return res.status(400).json({error: "Driver's profile is not existed"});
            }

            driver.address = address;
            driver.passportId = passportId;
            driver.job = job;
            return driver.save()
        })
        .then(driver => res.status(200).json(driver))
        .catch(err => res.status(400).json(err))
}

// TODO: delete driver's profile
module.exports.deleteDriverProfile =  (req, res) => {
    Driver.findOneAndDelete({userId: req.user.id})
        .then(response => res.status(200).json({message: "Profile deleted"}))
        .catch(err => res.status(400).json(err))
}

// TODO: get driver's profile
module.exports.getDriverProfile = (req, res) => {
    const driverId = req.params.driverId;
    Driver.findOne({userId: driverId})
        .then(driver => {
            if(!driver) return res.status(400).json({error: "Can't find this driver"});
            return res.status(200).json(driver);
        })
        .catch(err => res.status(400).json(err))
}

module.exports.addCarImage = (req, res) => {
        Driver.findOne({userId: req.user.id})
        .then(driver => {                
            if(!driver) return res.status(400).json({error: "Can't find driver's profile"});

            const carId = req.params.carId;
            const carImage = req.file.path;
            let carLocate;
            let adjustedCar = driver.carInfo.find((car, index) => {
                carLocate = index;
                return (car._id == carId);
            })
            if(!adjustedCar) return res.status(400).json({error: "Cannot find car"});
            adjustedCar.carImage = carImage;

            driver.carInfo[carLocate] = adjustedCar;
            return driver.save()
        })
        .then(driver =>  res.status(200).json(driver.carInfo[driver.carInfo.length - 1]))
        .catch(err => res.status(400).json(err))
    }

// TODO: add driver's
module.exports.addDriverCar = (req, res) => {
    Driver.findOne({userId: req.user.id})
        .then(driver => {
            if(!driver) return res.status(400).json({error: "Can't find this driver"});
            const {brand, model, manufacturingYear, licensePlate, numberOfSeats} = req.body;
            const carImage = 'http://www.kensap.org/wp-content/uploads/empty-photo.jpg';
            const newCar = new Car({brand, 
                model, 
                manufacturingYear, 
                licensePlate,
                numberOfSeats, 
                carImage});
            
            driver.carInfo.push(newCar);
            return driver.save()
        })
        .then(driver => {
            res.status(200).json(driver.carInfo[driver.carInfo.length - 1])
        })
        .catch(err => res.status(400).json(err))
}


// TODO: adjust driver's car
module.exports.updateDriverCar = (req, res) => {        
    Driver.findOne({userId: req.user.id})
        .then(driver => {                
            if(!driver) return res.status(400).json({error: "Can't find driver's profile"});

            const carId = req.params.carId;
            const {brand, model, manufacturingYear, licensePlate, numberOfSeats} = req.body;
            let carLocate;
            let adjustedCar = driver.carInfo.find((car, index) => {
                carLocate = index;
                return (car._id == carId);
            })
            if(!adjustedCar) return res.status(400).json({error: "Cannot find car"});

            adjustedCar.brand = brand;
            adjustedCar.model = model;
            adjustedCar.manufacturingYear = manufacturingYear;
            adjustedCar.licensePlate = licensePlate;
            adjustedCar.numberOfSeats = numberOfSeats;

            driver.carInfo[carLocate] = adjustedCar;
            return driver.save()
        })
        .then(driver =>  res.status(200).json(driver.carInfo))
        .catch(err => res.status(400).json(err))
}

// TODO: delete driver's car
module.exports.deleteDriverCar = (req, res) => {
    const carId = req.params.carId;
    Driver.findOne({userId: req.user.id})
        .then(driver => {
            if(!driver) return res.status(400).json({message: "Can't find user"});
            for(let i = 0; i < driver.carInfo.length; i++){
                if(driver.carInfo[i]._id == carId){
                    driver.carInfo.splice(i, 1);
                }
            }
            return driver.save()
        })
        .then(driver => res.status(200).json(driver.carInfo))   
        .catch(err => res.status(400).json(err))         
}

// TODO: get driver's trips created
module.exports.getDriverTrip = (req, res) => {
    const driverId = req.user.id;
    Trip.find({driverId})
        .then(trips => {
            return res.status(200).json(trips)
        })
        .catch(err => res.status(400).json(err))
}