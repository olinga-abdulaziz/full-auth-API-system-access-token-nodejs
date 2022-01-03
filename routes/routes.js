const express=require('express')
const router=express.Router()
const User=require('../models/userModel')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')


router.get('/',(req,res)=>{
    var token=req.session.token
    res.render('index',{token})
})

router.get('/register', (req,res)=>{
    res.render('register')
})  

router.get('/register/login', (req,res)=>{
    
    res.render('login')
})  


// handling registration

router.post('/register/new-user', async (req,res)=>{

    const isuser=await User.findOne()
    if(isuser.email || isuser.username){ 
        res.send("user already exist")
     }else{

    // encrypting password
    const salt=await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(req.body.password,salt)
    console.log(hashedPassword);
    const user=new User({
        username:req.body.username,
        email:req.body.email,
        password:hashedPassword
    })

    try {
      
        const saveUser=await user.save().then(res.redirect('login'))
    } catch (err) {
        console.log(err);
    }

}

})


router.post('/login',async (req,res)=>{
    // compairing password and login
    try {
        // find user
        const user=await User.findOne()
        const credentials=await bcrypt.compare(req.body.password,user.password)

        if(credentials){

            // asign the token

            const token=jwt.sign({_id:user._id},process.env.SECRETE_TOKEN)
            res.header('auth-token',token)
            req.session.token=token
            res.redirect('/')
            
        }else{
            res.redirect('/login/login')
        }
    } catch (err) {
        console.log(err);
    }
})





module.exports=router