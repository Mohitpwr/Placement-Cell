const express=require('express');
const router=express.Router();



router.use('/students',require('./students'))
router.use('/interviews',require('./interviews'))
router.use('/',require('./users'))

module.exports=router;