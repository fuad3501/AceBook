/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

// backend methods for logging in/out and etc.

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const Message = require("./model/message")

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user) socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|


// Backend method displays all messages
router.get("/allmessages", (req, res) => {
  Message.find({}).then((messages) => {      // executes query (empty means fetch all)
    res.send(messages);
  })
});


// Backend method displays new message
router.post("/newmessage", (req, res) => {
  let newMessage = new Message ({
    userId: req.user._id,
    name: req.user.name, 
    content: req.body.content
  })
  newMessage.save()                          // saves new message to database
});


// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
