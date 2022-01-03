const express=require('express')
const router=express.Router()
const auth=require('./verifytoken')

router.get('/', auth, (req,res)=>{
    res.json({post:"Random data you should not access"})
})

module.exports=router