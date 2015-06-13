var router = require('express').Router();
var passport = require('passport');

//var Topic = require("../models/TopicModel");
var User = require("../models/UserModel");

router.get("/find/:query", function (req, res) {
  var parts = decodeURIComponent(req.params.query).split(" ");
  var regex = [];
  for (var i in parts) {
    regex.push(new RegExp(parts[i], "i"));
  }

  User.find({
    $or: [
      {"firstname": {$in: regex}},
      {"lastname": {$in: regex}},
      {"local.username": {$in: regex}}
    ]
  })
    .limit(10)
    .select('_id firstname lastname local.username')
    .exec(function (err, users) {
      if(err) return err;
      res.status(200).send(users);
    });
});

module.exports = router;
