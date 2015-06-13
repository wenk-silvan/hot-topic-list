var router = require('express').Router();
var passport = require('passport');

router.post("/login", function (req, res, next) {
  passport.authenticate('local-login', function (err, user, info) {
    if(err) return next(err);

    if(!user) {
      res.status(401).send(info);
    }
    else {
      req.login(user, function () {
        res.status(200).send(user);
      });
    }
  })(req, res, next);
});

router.post('/signup', function (req, res, next) {
  passport.authenticate('local-signup', function (err, user, info) {
    if(err) return next(err);
    if(!user) {
      res.status(400).send(info);
    }
    else {
      res.status(200).send(user);
    }
  })(req, res, next);
});

router.get("/account", function(req, res, next){
  if(!req.user) {
    res.status(404).send();
    return;

  }
  res.status(200).send(req.user);
});

router.get('/logout', function (req, res) {
  req.logout();
  res.status(204).send();
});

module.exports = router;
