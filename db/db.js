const mongoose=require('mongoose')

const dbConnection=async ()=>{
    try {
        const conn=await mongoose.connect(process.env.MONGO_URI)
        console.log(`connected to mongodb servers : ${conn.connection.host}`);
    } catch (err) {
        console.log(err);
    }
}

module.exports=dbConnection