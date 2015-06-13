var router = require("express").Router();

var Topic = require("../models/TopicModel");

router.get("/", function (req, res) {
  Topic.find()
    .or([{"owner": {$in: [req.user._id]}}])
    .exec(function (err, topics) {
      if(err) return err;
      res.send(topics);
    });
});

router.get("/:_id", function (req, res) {
  Topic.findById(req.params._id)
    .where("owner").in([req.user._id])
    .populate("owner")
    .exec(function (err, topic) {
      if(err) return err;
      res.status(200).send(topic);
    });

});

router.post("/", function (req, res) {
  var topic = new Topic(req.body);
  topic.owner.push(req.user);

  topic.save(function (err) {
    if(err) return err;
    res.status(201).send(topic);
  });
});

router.put("/", function (req, res) {
  Topic.findById(req.body._id)
    .where("owner").in([req.user._id])
    .exec(function (err, topic) {
      if(err) return err;
      if(!topic) return res.status(400).send();

      topic.name = req.body.name;
      topic.description = req.body.description;
      topic.save(function (err) {
        if(err) return err;
        res.status(200).send(topic);
      })
    });
});

router.delete("/:_id", function (req, res) {
  Topic.findById(req.params._id)
    .where("owner").in([req.user._id])
    .remove(function (err, result) {
      if(err) return err;
      if(result.result.n == 0) return res.status(400).send();
      res.status(200).send();
    });
});

module.exports = router;
