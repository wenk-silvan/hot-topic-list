var mongoose = require("mongoose");

var topicSchema = mongoose.Schema({
  name: String,
  description: String,
  owner: [{type: mongoose.Schema.Types.ObjectId, ref: 'user'}]
});

module.exports = mongoose.model("topic", topicSchema);

