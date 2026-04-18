const mongoose=require('mongoose')

const UptownieSchema = new mongoose.Schema({
    name:String,
    price:String,
    description:String,
    image: String,
    category: {
        type: String,
        required: true
    }
})

const UptownieModel=mongoose.model("product",UptownieSchema)
module.exports=UptownieModel