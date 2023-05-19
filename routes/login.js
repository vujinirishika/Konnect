var router = require("express").Router();
var localStorage = require('localStorage');
const User = require("../models/user");
const Clubheads = require("../models/clubheads");
const Admins = require("../models/admin");
const Normaluser = require("../models/normaluser")
const bcrypt = require("bcryptjs");
var localStorage = require('localStorage')

router.post("/", async (req, res) => {
    console.log(req.body);
    const user = await User.findOne({username: req.body.username});
    if(user.usertype === "admin") {
        const validUser = await bcrypt.compare(req.body.password, user.password)
        if(validUser) {
            localStorage.setItem("user-type",user.usertype);
            localStorage.setItem("username",user.username);
            Admins.findOne({username: user.username}, function(err, docs) {
                localStorage.setItem('name',docs.name);
            })
            res.redirect("/adminDashboard");
        }
        else {
            res.render("login",{msg: "Invalid username/password"});
        }
    }
    else if(user.usertype === "normaluser") {
        const validUser = await bcrypt.compare(req.body.password, user.password)
        if(validUser) {
            localStorage.setItem("user-type",user.usertype);
            localStorage.setItem("username",user.username);
            Normaluser.findOne({username: user.username}, function(err, docs) {
                localStorage.setItem('name',docs.name);
            })
            res.redirect("/forum");
        }
        else {
            res.render("login",{msg: "Invalid username/password"});
        }
    }
})

module.exports = router;