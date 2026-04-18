const mongoose=require('mongoose')

const UptownieSchema = new mongoose.Schema({
    firstName:String,
    secondName:String,
    email:String,
    password:String,
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    }
})

const UptownieModel=mongoose.model("user",UptownieSchema)
module.exports=UptownieModel