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
    res.send("User Added Successful");
});
 
//get
app.get("/get/:id",function(req,res){
    fetchid=req.params.id;
    monmodel.find(({id:fetchid}),function(err,val){
        if(err){
            res.send("errrrrr");
        }else{
            if(val.length == 0){
                res.send("Cannot find any customer using this id");
            }else{
                res.send(val);
            }
        }

    })
   
});

//put 
app.put("/update/:id",async(req,res)=>{
    let upid=req.params.id;
    let upname=req.body.name;
    let upemail=req.body.email;

    monmodel.findOneAndUpdate({id:upid},{$set:{name:upname,email:upemail}},{new:true},(err,data)=>{
        if(err){
            res.send("Error")
        }else{
            if(data == null){
                res.send("Nothing Found")
            }else{
                res.send(data)
            }
        }
    })
});

//delete

app.delete("/delete/:id",function(req,res){
    let delid=req.params.id;
    monmodel.findOneAndDelete(({id:delid}),function(err,docs){
        if(err){
            res.send("Some Error");
        }else{
            if(docs ==null){
                res.send("No any data");
            }else{
                res.send(docs);
            }
        }
    })
})

app.listen(3000,()=>{
    console.log("on port 3000")
});
