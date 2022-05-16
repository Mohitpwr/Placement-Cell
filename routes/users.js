const express=require('express');
const router=express.Router();
const {downloadCSV}=require('../controllers/csv_controller')
const userController=require('../controllers/users_controller')
const passport=require('passport')


router.get('/',userController.signIn)
router.get('/signUp',userController.signUp)
router.post('/create',userController.create)
router.get('/signOut',userController.signOut)
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/'}),userController.createSession)
router.get("/csv/downloadcsv", downloadCSV);



module.exports=router;