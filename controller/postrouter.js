const express=require("express")

const postmodel=require("../models/postmodel")
const router=express.Router()

router.post("/add",async(req,res)=>{
    let data=req.body
    let post=new postmodel(data)
    let result=await post.save()
    res.json(
        {
            status:"success"
        }
    )
})
router.get("/viewpost",async(req,res)=>{
    let result=await postmodel.find()
    .populate("userid","name age mobno address pincode -_id")
    .exec()
    res.json(result)
})
module.exports=router