const mongoose=require("mongoose")

const userSchema=new mongoose.Schema(
    {
        name:String,
        age:String,
        mobno:String,
        address:String,
        pincode:String,
        email:String,
        pasword:String
    }
)
module.exports=mongoose.model("user",userSchema)