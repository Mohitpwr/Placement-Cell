const express=require('express');
const router=express.Router();
const studentController=require('../controllers/student_controller')

router.get("/studentsList",studentController.studentsList)
router.post("/studentsList",studentController.addStudent)

router.get("/studentDetail/:id",studentController.studentDetail)
module.exports=router;