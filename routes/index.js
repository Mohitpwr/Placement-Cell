const express=require('express');
const router=express.Router();
const studentController=require('../controllers/student_controller')

router.get("/studentsList",studentController.studentsList)
module.exports=router;