var router = require("express").Router();
var localStorage = require('localStorage');
const User = require("../../models/user");
const Admins = require("../../models/admin");
const Events = require("../../models/events")
const Pastevents = require("../../models/pastevents")
const Grievances = require('../../models/grievance');
const fs = require("fs");
const path = require('path');

router.get("/", (req, res) => {
  Grievances.find({}, function (err, allgrievances) {
		if (err) {
			console.log(err);
		} else {
			res.render('Admin/adminDashboard', { gre: allgrievances });
		}
	});
})

router.get("/addevents", (req, res) => {
  res.render("Admin/addEvents")
})

router.get("/addpastevents", (req, res) => {
    res.render("Admin/addPastEvents")
})

router.get("/events", (req, res) => {
  Events.find({}, function (err, allpevents) {
      if (err) {
          console.log(err);
      } 
      else {
          res.render("Admin/events", { pevents: allpevents })
      }
  })
})

router.post("/createevents", (req, res) => {
    const saveEvents = new Events({
        event_name : req.body.eventname,
        event_date : req.body.date,
        event_desc:req.body.desc,
        registration_end_date : req.body.enddate,
        registration_link : req.body.link,
        event_status :req.body.status,
    });
    saveEvents.save().then(
        () => {
            res.redirect("/adminDashboard");
        }
        ).catch(
        (error) => {
            res.render("Admin/addEvents");
        }   
        );
})

router.post("/createpastevents", async (req, res) => {
    const saveEvents = new Pastevents({
        event_name : req.body.eventname,
        event_date : req.body.date,
        event_desc:req.body.desc,  
    });
    const uploadDir = "public/uploads";

    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
  
    const images = [];
  
    req.files.image = !req.files.image.length
      ? [req.files.image]
      : req.files.image;
    for (let i = 0; i < req.files.image.length; i++) {
      const image = req.files.image[i];
      let uploadPath = __dirname + "/../../public/uploads/" + image.name;
  
      await new Promise((resolve) => {
        image.mv(uploadPath, (err) => {
          if (err) throw err;
          console.log(image);
          if (!err) images.push(`uploads/${image.name}`);
          resolve(true);
        });
      });
    }
    saveEvents.images = images;
    await saveEvents.save().then(
      () => {
          res.redirect("/");
      }
    ).catch(
      (error) => {
        res.render("Admin/addPastEvents");
      }
    );
})

function validUser() {
  if(localStorage.getItem("username")) {
      return true;
  }
  return false;
}

module.exports = router;