var express = require('express');
var router = express.Router();

const Group = require('../controllers/group');
router.get('/api/', Group.getGroups);
router.get('/api/getgroup/:id', Group.getGroup);
router.post('/api/newmessage/:id', Group.newMessage);
router.post('/api/newgroup', Group.newGroup);

module.exports = router;
