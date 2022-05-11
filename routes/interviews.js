const express=require('express');
const router=express.Router();

const interviews=require('../controllers/interviews_controller')



router.get('/interviewList',interviews.interviews)
router.post('/interviewList',interviews.addInterview)


module.exports=router