// TODO: require package
const mongoose = require("mongoose");
const express = require("express");
const passport = require("passport");


// TODO: install package
require('dotenv').config(); // use for .env file
const app =express();
const port = process.env.PORT || 5500;

// TODO: setting for server
mongoose.connect(process.env.MONGOOSE_URL,{useNewUrlParser: true})
    .then(console.log('connected to mongodb'))
    .catch(console.log);
app.listen(port, () => {
    console.log("server running on port: " + port);
})

// TODO: install middleware
    // allow origin
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
        res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, PATCH');
        next();
      });

    // parser
    app.use(express.urlencoded({extended: true}));
    app.use(express.json());

    // passport
    app.use(passport.initialize())
    require("./config/passport")(passport);
    
    // serve static file
    app.use('/uploads', express.static('uploads'));


// TODO: router
app.use("/api/user", require("./routes/api/user.api"));
app.use("/api/user/driver", require("./routes/api/driver.api"));
app.use("/api/trip", require("./routes/api/trip.api"));
