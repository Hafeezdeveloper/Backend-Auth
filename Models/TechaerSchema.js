const { default: mongoose } = require("mongoose");


let TeacherSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    course:{
        type:String,
        required:true
    },
    contact:{
        type:String,
        required:true
    }
})

let TecaherModel = mongoose.model("Teacher",TeacherSchema)
module.exports = TecaherModel