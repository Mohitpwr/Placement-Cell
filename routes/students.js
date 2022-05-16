const express=require('express');
const router=express.Router();
const studentController=require('../controllers/student_controller')
const passport=require('passport')

router.get("/studentsList",studentController.studentsList)
router.post("/studentsList",studentController.addStudent)

router.get("/studentDetail/:id",passport.checkAuthentication,studentController.studentDetail)
router.get("/editDetail/:id",passport.checkAuthentication,studentController.editDetail)
router.post("/updateStudent/:id",passport.checkAuthentication,studentController.updateStudent)
router.post("/updateStatus/:id",passport.checkAuthentication,studentController.updateStatus)
module.exports=router;