var express = require('express');
var router = express.Router();

const Group = require('../controllers/group');
console.log(Group);
router.get('/api/', Group.getGroups);
router.get('/api/getgroup/:id', Group.getGroup);
router.post('/api/newmessage/:id', Group.newMessage);
router.post('/api/newgroup', Group.newGroup);
// router.post('/api/signin', requireSignin, Authentication.signin);
// router.post('/api/editInfo', Authentication.editInfo);
// router.post('/api/uploadavatar', Authentication.uploadAvatar);

module.exports = router;
