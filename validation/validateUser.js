const validator = require("validator");

module.exports.validateRegister = (req, res, next) =>{
    let errors = {};
    const {email, password, password2, fullName, userType, phone, dateOfBirth} = req.body;

    // check email
    if(validator.isEmpty(email)){
        errors.email = "Email required";
    }
    else if(!validator.isEmail(email)){
        errors.email = "Wrong email";
    }

    // check password
    if(validator.isEmpty(password)){
        errors.password = "Pasword required";        
    }
    else if(!validator.isLength(password, {min: 6, max: 30})){
        errors.password = "Password must be 6 - 30 characters";
    }
    
    if(validator.isEmpty(password2)){
        errors.password2 = "Confirm pasword required";        
    }
    else if(!validator.equals(password, password2)){
        errors.password2 = "Confirm password not match";
    }

    // check date of birth
    if(validator.isEmpty(dateOfBirth)){
        errors.dateOfBirth = "date of birth is reuqired";        
    }
    

    // check fullName
    if(validator.isEmpty(fullName)){
        errors.fullName = "full name required";        
    }
    else if(!validator.isLength(fullName, {min: 5, max: 30})){
        errors.fullName = "Full name must be 5 - 30 characters";
    }
    

    // check userType
    if( !validator.equals(userType, "driver") &&
        !validator.equals(userType, "passenger")
     ){
         errors.userType = "Choose driver or passenger";
     }

    // check phone
    if(validator.isEmpty(phone)){
        errors.phone = "Phone number required";
    }
    else if(!validator.isLength(phone, {min: 10, max: 11})){
        errors.phone = "Phone number must be 10 - 11 characters";
    }

    



    // send errors if not valite
    if(Object.keys(errors).length){
        return res.status(400).json(errors);
    }
    next();
}


module.exports.validateLogin = (req, res, next) => {
    let errors = {};
    const {email, password} = req.body;
    // check email
    if(validator.isEmpty(email)){
        errors.email = "Email required";
    }
    else if(!validator.isEmail(email)){
        errors.email = "Wrong email";
    }

    // check password
    if(validator.isEmpty(password)){
        errors.password = "Pasword required";        
    }
    else if(!validator.isLength(password, {min: 6, max: 30})){
        errors.password = "Password must be 6 - 30 characters";
    }

    
    // send errors if not valite
    if(Object.keys(errors).length){
        return res.status(400).json(errors);
    }
    next();
}
