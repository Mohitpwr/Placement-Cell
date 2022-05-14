const express=require('express')
const app= express();
const cookieParser = require("cookie-parser");
const path = require("path");
app.use(express.urlencoded())
app.use(cookieParser())

require('./confiq/mongoose')


app.use(express.static('./assests'))
//set view engine for rendering views
app.set('view engine','ejs')
app.set('views','./views')








//set routes
app.use('/',require('./routes'))

app.listen('3000',(err)=>{
    console.log("server is up and running on port:3000")
})