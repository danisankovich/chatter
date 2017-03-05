var Group = require('../models/group');

exports.newGroup = function(req, res, next) {
  Group.findOne({ name: req.body.name }, (err, group) => {
    if (err) return next(err);
    if (group) {
      return res.status(422).send({error: 'Group Already Exists'});
    } else {
      const newGroup = new Group(req.body);
      newGroup.save();
      res.send({name: newGroup.name, id: newGroup._id});
    }
  });
}

exports.getGroups = function(req, res, next) {
  Group.find({}, {messages: 0}, (err, groups) => {
    if (err) return next(err);
    res.send(groups);
  });
}
exports.getGroup = function(req, res, next) {
  Group.findById(req.params.id, (err, group) => {
    if (err) return next(err);
    res.send(group);
  });
}
exports.newMessage = function(req, res, next) {
  const message = JSON.parse(req.body.data);

  Group.findByIdAndUpdate(req.params.id,
    {$push: {messages: message}},
    {safe: true, upsert: true},
    (err, group) => {
      if (err) return next(err);
      group.messages.push(message)
      res.send(group.messages);
  });
}
