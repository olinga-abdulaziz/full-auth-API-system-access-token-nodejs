const express=require('express')
const dotenv=require('dotenv')
const router=require('./routes/routes')
const db=require('./db/db')
const bodyparser=require('body-parser')
const privateRoute=require('./routes/privateroutes')
const session=require('express-session')
//initialize app
const app=express()


app.use(express.json())

// setting up body parser
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())

// setup session
app.use(session({secret: 'mySecret', resave: false, saveUninitialized: false}));

//set dotenv
dotenv.config()

// connecting db
db()

// setup view engine
app.set('view engine','ejs')
app.set('views','./views')

// loading routes
app.use('/',router)
app.use('/api',privateRoute)



const port=process.env.PORT||8080
app.listen(port,()=>console.log(`.... server is live on port : ${port}`))