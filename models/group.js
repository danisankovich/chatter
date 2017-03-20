var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var groupSchema = new Schema({
  name: { type: String, unique: true },
  messages: { type: Array },
  creatorId: {type: String},
});


var GROUP = mongoose.model('group', groupSchema);
module.exports = GROUP;
