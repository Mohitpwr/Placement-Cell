const express=require('express');
const router=express.Router();



router.use('/students',require('./students'))
router.use('/interviews',require('./interviews'))

module.exports=router;