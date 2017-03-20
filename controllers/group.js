var Group = require('../models/group');

exports.newGroup = function(req, res, next) {
  if (!req.user || !req.user._id) {
    res.send('Cannot Add, invalid input');
  }
  Group.findOne({ name: req.body.name }, (err, group) => {
    if (err) return next(err);
    if (group) {
      return res.status(422).send({error: 'Group Already Exists'});
    } else {
      const data = req.body;
      data.creatorId = req.user._id;
      const newGroup = new Group(data);
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

exports.deleteGroup = function(req, res, next) {
  if (!req.user || !req.user._id) {
    res.send('cannot delete. invalid input');
  }
  if (req.headers.creatorid !== req.user._id.toString()) {
    return res.status(401).send('only admins or the group creator can delete groups');

  }
  const groupId = req.params.id;

  Group.findByIdAndRemove(groupId, function(err, group) {
    if (err) res.send(err);
    const response = {
      message: "Todo successfully deleted",
      _id: group._id,
    };
    res.send(response);
  });
}
