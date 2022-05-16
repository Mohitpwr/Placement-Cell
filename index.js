const express=require('express')
const app= express();
const cookieParser = require("cookie-parser");


const passport = require("passport");
const passportLocal = require("./confiq/passport-local-strategy");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const path = require("path");
app.use(express.urlencoded())
app.use(cookieParser())
const flash = require("connect-flash");
const customMware = require("./confiq/middleware");
require('./confiq/mongoose')


// mongo store is used to store the session cookie in the db
app.use(
    session({
      name: "placement",
      // TODO change the secret before deployment in production mode
      // secret: env.session_cookies_key,
      secret: 'secretkey',
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 1000 * 60 * 100,
      },
      store: MongoStore.create(
        {
            mongoUrl: 'mongodb://localhost:27017/Placementcell',
            autoRemove: 'disabled'
        
        },
        function(err){
            console.log(err ||  'connect-mongodb setup ok');
        }
    )
    })
  );
  
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());
  app.use(customMware.setFlash);

app.use(express.static('./assests'))
//set view engine for rendering views
app.set('view engine','ejs')
app.set('views','./views')








//set routes
app.use('/',require('./routes'))

app.listen('3000',(err)=>{
    console.log("server is up and running on port:3000")
})