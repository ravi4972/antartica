const express = require('express');
const {createUser,login,JWT,validateReq,findUser,sortedList} = require('./functions');


const router = express.Router();

router.post('/users/singup',validateReq,createUser);
router.post('/users/login',validateReq,login,JWT);
router.get('/users',findUser);
router.get('/users/sort',sortedList);

router.use((err,req,res,next)=>{
    res.status(err.errorCode||"500").send(err.message);
})

module.exports = router;