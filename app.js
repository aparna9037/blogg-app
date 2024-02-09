const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const userroute=require("./controller/userrouter")
const postrouter=require("./controller/postrouter")

const app=express()

app.use(express.json())
app.use(cors())

app.use("/api/blogg",userroute)
app.use("/api/post",postrouter)
mongoose.connect("mongodb+srv://aparna:aparna2468@cluster0.gxutpre.mongodb.net/bloggDb?retryWrites=true&w=majority",
{
    useNewUrlParser:true
})

app.listen(3001,()=>{
    console.log("server running")
})