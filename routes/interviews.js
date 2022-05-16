const express=require('express');
const router=express.Router();
const passport=require('passport')
const interviews=require('../controllers/interviews_controller')



router.get('/interviewList',interviews.interviews)
router.post('/interviewList',interviews.addInterview)
router.get('/interviewDetails/:id',interviews.interviewDetails)



module.exports=router