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
router.post("/signin",async(req,res)=>{
    let email=req.body.email
    let data=await usermodel.findOne({"email":email})
    if(!data)
    {
        return res.json(
            {
                status:"incorrect email id"
            }
        )
    }
    console.log(data)
    let dbpassword=data.pasword
    let inputpassword=req.body.pasword
    console.log(dbpassword)
    console.log(inputpassword)
    const match=await bcrypt.compare(inputpassword,dbpassword)
    if(!match)
    {
        return res.json(
            {
                status:"incorrect password"
            }
        )
    }
    res.json(
        {
            status:"success"
        }
    )
})
module.exports=router