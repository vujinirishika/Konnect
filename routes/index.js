var router = require("express").Router();
var localStorage = require('localStorage');
const User = require("../models/user");
const Admins = require("../models/admin");
const Events = require("../models/events")
const Pastevents = require("../models/pastevents")
const Items = require("../models/marketplace")
const Normaluser = require("../models/normaluser")
const Grievances = require('../models/grievance');
const Posts = require("../models/post")
const fs = require("fs");
const path = require('path');
const open = require('open');

router.use("/register", require("./register"));
router.use("/login", require("./login"));
router.use("/adminDashboard", require("./Admin/index"));

router.get("/", (req, res) => {
    res.render("login", {msg: ""})
})

// Rendering user's items
router.get("/myitems", (req, res) => {
    if(validUser()) {
        Items.find({username: localStorage.getItem("username")}, function(err, items) {
            if(err) {
                console.log(err);
            }
            else {
                res.render("items",{ items: items, name: localStorage.getItem("name")})
            }
        })
    }
    else {
        res.render("login", {msg: "Session Timeout"});
    }
})

// Rendering user's posts
router.get("/myposts",(req, res) => {
    if(validUser()) {
        Posts.find({username: localStorage.getItem("username")}, function(err, posts) {
            if(err) {
                console.log(err);
            }
            else {
                res.render("posts",{ posts: posts, name: localStorage.getItem("name")})
            }
        })
    }
    else {
        res.render("login", {msg: "Session Timeout"});
    }
})

// Rendering user's notifications
router.get("/notifications", (req, res) => {
    if(validUser()) {
        Normaluser.findOne({username: localStorage.getItem("username")}, function(err, users) {
            if(err) {
                console.log(err);
            }
            else {
                res.render("notifications",{ user: users, name: localStorage.getItem("name")})
            }
        })
    }
    else {
        res.render("login", {msg: "Session Timeout"});
    }
})

// Rendering Events page
router.get("/events", (req, res) => {
    if(validUser()) {
        Events.find({}, function (err, allpevents) {
            if (err) {
                console.log(err);
            } 
            else {
                res.render("events", { pevents: allpevents , name: localStorage.getItem("name")})
            }
        })
    }
    else {
        res.render("login", {msg: "Session Timeout"});
    }
})

// Rendering Forum page
router.get("/forum", (req, res) => {
    if(validUser()) {
        Posts.find({}, function (err, allposts) {
            if (err) {
                console.log(err);
            } 
            else {
                res.render("forum", { posts: allposts , name: localStorage.getItem("name")})
            }
        })
    }
    else {
        res.render("login", {msg: "Session Timeout"});
    }
})

// Rendering Events blog page
router.get("/eventsblog", (req, res) => {
    if(validUser()) {
        Pastevents.find({}, function (err, allevents) {
            if (err) {
                console.log(err);
            } 
            else {
                res.render("eventsblog", { events: allevents , name: localStorage.getItem("name")})
            }
        })
    }
    else {
        res.render("login", {msg: "Session Timeout"});
    }
})

// Rendering Books in market place
router.get('/marketplace/books', (req, res)=> {
    if(validUser()) {
        var noMatch = null;
        if(req.query.search) {
            var regex = new RegExp(escapeRegex(req.query.search), 'gi');
            Items.find({itemname: regex}, function(err, allitems){
            if(err){
                console.log(err);
            } else {
                if(allitems.length < 1) {
                    noMatch = "No product match,the query";
                }
                res.render("marketplace",{items:allitems, noMatch: noMatch, msg: "", name: localStorage.getItem("name")});
            }
            });
        } 
        else {
            Items.find({}, function(err, allitems){
            if(err){
                console.log(err);
            } else {
                noMatch = "No product match,the query";
                res.render("marketplace",{items:allitems, noMatch: noMatch, msg: "", name: localStorage.getItem("name")});
            }
            });
        }
    }
    else {
        res.render("login", {msg: "Session Timeout"});
    }
});

//Rendering add grievance page
router.get("/grievance", (req, res) => {
    if (validUser()) {
        res.render('grievance', { name: localStorage.getItem('name') });
		} else {
			res.render('login', { msg: 'Session Timeout' });
		}
})

// Rendering Tools in market place
router.get('/marketplace/tools', (req, res)=> {
    if(validUser()) {
        var noMatch = null;
        if(req.query.search) {
            var regex = new RegExp(escapeRegex(req.query.search), 'gi');
            Items.find({itemname: regex}, function(err, allitems){
            if(err){
                console.log(err);
            } else {
                if(allitems.length < 1) {
                    noMatch = "No product match,the query";
                }
                res.render("tools",{items:allitems, noMatch: noMatch, msg: "", name: localStorage.getItem("name")});
            }
            });
        } 
        else {
            Items.find({}, function(err, allitems){
            if(err){
                console.log(err);
            } else {
                noMatch = "No product match,the query";
                res.render("tools",{items:allitems, noMatch: noMatch, msg: "", name: localStorage.getItem("name")});
            }
            });
        }
    }
    else {
        res.render("login", {msg: "Session Timeout"});
    }
});

// Rendering Apron in market place
router.get('/marketplace/apron', (req, res)=> {
    if(validUser()) {
        var noMatch = null;
        if(req.query.search) {
            var regex = new RegExp(escapeRegex(req.query.search), 'gi');
            Items.find({itemname: regex}, function(err, allitems){
            if(err){
                console.log(err);
            } else {
                if(allitems.length < 1) {
                    noMatch = "No product match,the query";
                }
                res.render("apron",{items:allitems, noMatch: noMatch, msg: "", name: localStorage.getItem("name")});
            }
            });
        } 
        else {
            Items.find({}, function(err, allitems){
            if(err){
                console.log(err);
            } else {
                noMatch = "No product match,the query";
                res.render("apron",{items:allitems, noMatch: noMatch, msg: "", name: localStorage.getItem("name")});
            }
            });
        }
    }
    else {
        res.render("login", {msg: "Session Timeout"});
    }
});

// Rendering Electronics in market place
router.get('/marketplace/electronics', (req, res)=> {
    if(validUser()) {
        var noMatch = null;
        if(req.query.search) {
            var regex = new RegExp(escapeRegex(req.query.search), 'gi');
            Items.find({itemname: regex}, function(err, allitems){
            if(err){
                console.log(err);
            } else {
                if(allitems.length < 1) {
                    noMatch = "No product match,the query";
                }
                res.render("electronics",{items:allitems, noMatch: noMatch, msg: "", name: localStorage.getItem("name")});
            }
            });
        } 
        else {
            Items.find({}, function(err, allitems){
            if(err){
                console.log(err);
            } else {
                noMatch = "No product match,the query";
                res.render("electronics",{items:allitems, noMatch: noMatch, msg: "", name: localStorage.getItem("name")});
            }
            });
        }
    }
    else {
        res.render("login", {msg: "Session Timeout"});
    }
});

// Adding Marketplace items
router.post("/additems", async (req, res) => {
    if(validUser()) {
        const username = localStorage.getItem("username");
        const name = localStorage.getItem("name");
        const user = await Normaluser.findOne({name: name})
        const mno = user.mobilenumber
        const email = user.email
        const saveItems = new Items({
            username: username,
            name: name,
            email: email,
            itemname: req.body.name,
            mno : mno,
            originalprice :req.body.price,
            finalprice: req.body.pricel,
            description: req.body.desc,
            types: req.body.sel1,
        });
        const uploadDir = "public/uploads";

        if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
    
        const images = [];
    
        req.files.image = !req.files.image.length
        ? [req.files.image]
        : req.files.image;
        for (let i = 0; i < req.files.image.length; i++) {
        const image = req.files.image[i];
        let uploadPath = __dirname + "/../public/uploads/" + image.name;
    
        await new Promise((resolve) => {
            image.mv(uploadPath, (err) => {
            if (err) throw err;
            console.log(image);
            if (!err) images.push(`uploads/${image.name}`);
            resolve(true);
            });
        });
        }
        saveItems.images = images;
        await saveItems.save().then(
            () => {
                res.render("marketplace",{msg: "Item added successfully", name: localStorage.getItem("name")});
            }
            ).catch(
            (error) => {
                console.log(error)
            }   
            );
    }
    else {
        res.render("login", {msg: "Session Timeout"});
    }
})

// Sending alert notification for selected item in Marketplace
router.post("/marketplace/:id", (req, res) => {
    if(validUser()) {
        var id = req.params.id
        console.log(id)
        Items.findOne({_id: id}, function(err, item) {
            if(err) {
                console.log(err)
            }
            else {
                username = item.username
                curname = localStorage.getItem("username");
                Normaluser.findOne({username: username}, function(err, docs) {
                    if(err) {
                        console.log(err)
                    }
                    else {
                        console.log(docs.notifications)
                        const notif = docs.notifications
                        notif[notif.length] = curname+" has requested for your product "+item.itemname+" details."
                        console.log(notif)
                        Normaluser.updateOne({username: username}, {$set: {notifications: notif},
                        }).then(
                            () => {
                                res.render("moreDetails", {item: item, name: localStorage.getItem("name")})
                            }
                        ).catch(
                            (error) => {

                            }
                        )
                    }
                });
            }
        })
    }
    else {
        res.render("login", {msg: "Session Timeout"});
    }
})

// Sending whatsapp message for selected item in Marketplace
router.post("/sendmsg/:id", async (req, res) => {
    if(validUser()) {
        var id = req.params.id
        Items.findOne({_id: id}, async function(err, item) {
            if(err) {
                console.log(err)
            }
            else {
                const curname = localStorage.getItem("username");
                const phone = item.mno
                const username = item.name;
                const message = "Hi "+username+" \nI'm "+curname+" intrested in purchasing your product "+item.itemname+". Where and when can we meet?"
                await open(`https://api.whatsapp.com/send?phone=${phone}&text=${message}`)
                await res.redirect(`/marketplace/books`)
            }
        })
    }
    else {
        res.render("login", {msg: "Session Timeout"});
    }
})

// Adding posts from Forum page
router.post("/addpost", async (req, res) => {
    if(validUser()) {
        const date_ob = await new Date();
        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();
        let hours = date_ob.getHours();
        let minutes = date_ob.getMinutes();
        const username = localStorage.getItem("username");
        const name = localStorage.getItem("name");
        const savePost = new Posts({
            username: username,
            name: name,
            caption: req.body.caption,
            date: year + "-" + month + "-" + date,
            time: hours + ":" + minutes,
            likes: 0,
            comments: []
        });
        const uploadDir = "public/uploads";

        if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
    
        const images = [];
    
        req.files.image = !req.files.image.length
        ? [req.files.image]
        : req.files.image;
        for (let i = 0; i < req.files.image.length; i++) {
        const image = req.files.image[i];
        let uploadPath = __dirname + "/../public/uploads/" + image.name;
    
        await new Promise((resolve) => {
            image.mv(uploadPath, (err) => {
            if (err) throw err;
            console.log(image);
            if (!err) images.push(`uploads/${image.name}`);
            resolve(true);
            });
        });
        }
        savePost.images = images;
        await savePost.save().then(
            () => {
                res.redirect("/forum")
            }
            ).catch(
            (error) => {
                console.log(error)
            }   
            );
    }
    else {
        res.render("login", {msg: "Session Timeout"});
    }
})

// Adding likes for a post in Forum page
router.post("/addlike/:id", (req, res) => {
    if(validUser()) {
        var id = req.params.id;
        Posts.findOne({_id: id}, function(err, docs) {
            if(err) {
                console.log(err);
            }
            else {
                like = docs.likes
                like[like.length] = localStorage.getItem("name");
                Posts.updateOne({_id: id}, {$set: {likes: like}, 
                }).then(
                    () => {
                        res.redirect("/forum")
                    }
                ).catch(
                    (error) => {

                    }
                )
            }
        })
    }
    else {
        res.render("login", {msg: "Session Timeout"});
    }
})

// Adding comments for a post in Forum page
router.post("/addcomment/:id", (req, res) => {
    if(validUser()) {
        var id = req.params.id;
        Posts.findOne({_id: id}, function(err, docs) {
            if(err) {
                console.log(err);
            }
            else {
                comment = docs.comments
                comment[comment.length] = localStorage.getItem("name") + "asdfg" + req.body.comment;
                Posts.updateOne({_id: id}, {$set: {comments: comment}, 
                }).then(
                    () => {
                        res.redirect("/forum")
                    }
                ).catch(
                    (error) => {

                    }
                )
            }
        })
    }
    else {
        res.render("login", {msg: "Session Timeout"});
    }
})

// Update in posts
router.post("/update/:id", async (req, res) => {
    if(validUser()) {
        console.log(req.body)
        const id = req.params.id;
        Posts.findOne({_id: id}, async function(err, docs) {
            let images = docs.images
            if(req.files) {
                const uploadDir = "public/uploads";
                if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
                req.files.image = !req.files.image.length
                ? [req.files.image]
                : req.files.image;
                for (let i = 0; i < req.files.image.length; i++) {
                    const image = req.files.image[i];
                    let uploadPath = __dirname + "/../public/uploads/" + image.name;
                
                    await new Promise((resolve) => {
                        image.mv(uploadPath, (err) => {
                        if (err) throw err;
                        console.log(image);
                        if (!err) images.push(`uploads/${image.name}`);
                        resolve(true);
                        });
                    });
                }
                Posts.findOneAndUpdate({_id: id}, {images: images}, null, function(err, docs) {
                    if(err) {
                        console.log(err);
                    }
                    else {
                        console.log(docs)
                    }
                })
            }
        })

        Posts.findOneAndUpdate({_id: id}, {caption: req.body.caption}, null, function (err, docs) {
            if (err){
                console.log(err)
            }
            else{
                res.redirect("/forum")
            }
        })
    }
    else {
        res.render("login", {msg: "Session Timeout"});
    }
})

// Delete in posts
router.post("/delete/:id", (req, res) => {
    if(validUser()) {
        const id = req.params.id;
        Posts.findOneAndDelete({_id: id}, function(err, docs) {
            if(err) {
                console.log(err);
            }
            else {
                res.redirect("/forum")
            }
        })
    }
    else {
        res.render("login", {msg: "Session Timeout"});
    }
})

// Update in items
router.post("/updateitem/:id", async (req, res) => {
    if(validUser()) {
        console.log(req.body)
        const id = req.params.id;
        Items.findOne({_id: id}, async function(err, docs) {
            let images = docs.images
            if(req.files) {
                const uploadDir = "public/uploads";
                if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
                req.files.image = !req.files.image.length
                ? [req.files.image]
                : req.files.image;
                for (let i = 0; i < req.files.image.length; i++) {
                    const image = req.files.image[i];
                    let uploadPath = __dirname + "/../public/uploads/" + image.name;
                
                    await new Promise((resolve) => {
                        image.mv(uploadPath, (err) => {
                        if (err) throw err;
                        console.log(image);
                        if (!err) images.push(`uploads/${image.name}`);
                        resolve(true);
                        });
                    });
                }
                Items.findOneAndUpdate({_id: id}, {images: images}, null, function(err, docs) {
                    if(err) {
                        console.log(err);
                    }
                    else {
                        console.log(docs)
                    }
                })
            }
        })

        Items.findOneAndUpdate({_id: id}, {itemname: req.body.itemname, originalprice: req.body.originalprice, finalprice: req.body.finalprice}, null, function (err, docs) {
            if (err){
                console.log(err)
            }
            else{
                res.redirect("/marketplace/books")
            }
        })
    }
    else {
        res.render("login", {msg: "Session Timeout"});
    }
})

// Delete in items
router.post("/deleteitem/:id", (req, res) => {
    if(validUser()) {
        const id = req.params.id;
        Items.findOneAndDelete({_id: id}, function(err, docs) {
            if(err) {
                console.log(err);
            }
            else {
                res.redirect("/marketplace/books")
            }
        })
    }
    else {
        res.render("login", {msg: "Session Timeout"});
    }
})

//Adding grievances
router.post('/addgrievenace', async (req, res) => {
    if (validUser()) {
        const addGrievance = await new Grievances({
					title: req.body.title,
					description: req.body.description,
				});
        addGrievance.save();
        res.redirect("/marketplace/books")
    } else {
                res.render('login', { msg: 'Session Timeout' });
            }
});

// Logout functionality
router.post("/logout", (req, res) => {
    localStorage.clear();
    res.redirect("/");
})

// function to check whether the user is authorized
function validUser() {
    if(localStorage.getItem("username")) {
        return true;
    }
    return false;
}

// function for regular expression
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = router;