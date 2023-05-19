var router = require("express").Router();
var localStorage = require('localStorage');
const User = require("../models/user");
const Clubheads = require("../models/clubheads");
const Admins = require("../models/admin");
const Normaluser = require("../models/normaluser")
const bcrypt = require("bcryptjs");
var localStorage = require('localStorage')

router.get("/admin", (req, res) => {
    res.render("Admin/register")
})

router.get("/", (req, res) => {
  res.render("register")
})

router.post("/registeradmin", async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const a_pass = await bcrypt.hash(req.body.password, salt);
    console.log(req.body);
    const registerUser = await new User({
      username: req.body.username,
      password:a_pass,
      usertype: "admin",
      name: req.body.name,
  });
  registerUser.save();
    const registerAdmin = await new Admins({
        name: req.body.name,
        email: req.body.email,
        mobilenumber: req.body.mobilenumber,
        username: req.body.username,
        gender: req.body.gender,
        dob: req.body.dob,
        age: req.body.age,
    });
    registerAdmin.save().then(
        () => {
            res.redirect("/");
        }
      ).catch(
        (error) => {
          res.send(error)
        }
    );
  });

  router.post("/registerclubhead", async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const a_pass = await bcrypt.hash(req.body.password, salt);
    console.log(req.body);
    const registerUser = await new User({
      username: req.body.username,
      password:a_pass,
      usertype: "clubhead",
      name: req.body.name,
  });
  registerUser.save();
    const registerClubhead = await new Clubheads({
        name: req.body.name,
        email: req.body.email,
        mobilenumber: req.body.mobilenumber,
        username: req.body.username,
        gender: req.body.gender,
        dob: req.body.dob,
        age: req.body.age,
    });
    registerClubhead.save().then(
        () => {
            res.redirect("/");
        }
      ).catch(
        (error) => {
          res.send(error)
        }
    );
  });

  router.post("/registernormaluser", async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const a_pass = await bcrypt.hash(req.body.password, salt);
    console.log(req.body);
    const registerUser = await new User({
      username: req.body.username,
      password:a_pass,
      usertype: "normaluser",
      name: req.body.name,
  });
  registerUser.save();
    const registerNormaluser = await new Normaluser({
        name: req.body.name,
        email: req.body.email,
        mobilenumber: req.body.mobilenumber,
        username: req.body.username,
        gender: req.body.gender,
        dob: req.body.dob,
        age: req.body.age,
        notifications: [],
    });
    registerNormaluser.save().then(
        () => {
            res.redirect("/");
        }
      ).catch(
        (error) => {
          res.send(error)
        }
    );
  });


module.exports = router;