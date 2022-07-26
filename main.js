const { response } = require("express");
const express=require("express");
const app=express();

const mongoose=require("mongoose");
app.use(express.json());
mongoose.connect("mongodb://localhost:27017/mynewdb",{
    
},(err)=>{
    if(!err){
        console.log("connect to db")
    }else{
        console.log("error")
    }
})

const sch={
    name:String,
    email:String,
    id:Number
}
const monmodel=mongoose.model("student1",sch);

//post
app.post("/post",async(req,res)=>{
    console.log("inside post function");

    const data=new monmodel({
        name:req.body.name,
        email:req.body.email,
        id:req.body.id
    })
    const val=await data.save();
    res.send("New User Created Success");
})
app.listen(3000,()=>{
    console.log("on port 3000")
})
//hh

