const express=require("express")
const usermodel=require("../models/usermodel")

const router=express.Router()
const bcrypt=require("bcryptjs")

hashpasswordgenerator=async(pwd)=>{
    const salt=await bcrypt.genSalt(10)
    return bcrypt.hash(pwd,salt)
}
router.post("/signup",async(req,res)=>{
    let{data}={"data":req.body}
    let password=data.pasword
    hashpasswordgenerator(password).then(
        (hashedpassword)=>{
            console.log(hashedpassword)
            data.pasword=hashedpassword
            console.log(data)
            let user=new usermodel(data)
            let response=user.save()
            res.json(
                {
                    status:"success"
                }
            )
        }
    )
})
module.exports=router