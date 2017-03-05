var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var groupSchema = new Schema({
  name: { type: String, unique: true },
  messages: { type: Array },
});


var GROUP = mongoose.model('group', groupSchema);
module.exports = GROUP;
