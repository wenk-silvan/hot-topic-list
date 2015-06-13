var router = require('express').Router();

router.use("/authentication", require("./router/AuthenticationRouter"));
router.use("/topics", isLoggedIn, require("./router/TopicRouter"));
router.use("/user", isLoggedIn, require("./router/UserRouter"));

function isLoggedIn(req, res, next) {
  if(req.isUnauthenticated()) {
    res.status(401).send();
    return;
  }
  return next();
}

module.exports = router;
