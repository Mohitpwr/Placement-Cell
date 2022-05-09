const mongoose=require("mongoose");

mongoose.connect('mongodb://localhost:27017/Placementcell')

const db=mongoose.connection

console.log('connected to database Placementcell')
module.exports=db