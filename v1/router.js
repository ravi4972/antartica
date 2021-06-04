const express = require('express');
const {createUser,login,JWT,validateReq} = require('./functions');


const router = express.Router();

router.post('/user',validateReq,createUser);
router.post('/user/login',validateReq,login,JWT)

module.exports = router;