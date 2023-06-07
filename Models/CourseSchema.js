const mongoose = require("mongoose");

let CourseSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    fees: {
        type: String,
        required: true
    },
    shortName: {
        type: String,
        required: true
    }
})

let CourseModel = mongoose.model("courses", CourseSchema)
module.exports = CourseModel