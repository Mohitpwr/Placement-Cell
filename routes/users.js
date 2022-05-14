const express=require('express');
const router=express.Router();
const {downloadCSV}=require('../controllers/csv_controller')




router.get("/csv/downloadcsv", downloadCSV);



module.exports=router;