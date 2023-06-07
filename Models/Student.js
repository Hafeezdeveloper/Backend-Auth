const mongoose = require("mongoose")

let StudentSchema = mongoose.Schema({
    firstName:{
    type:String,
    required:true   
    },
    lastName:{
    type:String,
    required:true   
    },
    contact:{
    type:String,
    required:true        
    }

})

let studentModel = mongoose.model("students",StudentSchema)
module.exports = studentModel