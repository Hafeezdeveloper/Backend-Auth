const express = require("express")
const app = express()
require("dotenv").config()
const mongoose = require("mongoose")
const cors = require("cors")
app.use(express.json())
app.use(cors())


const userRouter = require("./Router/User")
const StudentRouter = require("./Router/Student")
const courseRouter = require("./Router/Course")
const Teachrouter = require("./Router/Teacher")

app.use("/api/user",userRouter)
app.use("/api/student",StudentRouter)
app.use("/api/course",courseRouter)
app.use("/api/teacher",Teachrouter)

mongoose.connect(process.env.MONGO_URI)
.then( (succ) =>{
    app.listen(process.env.PORT, () =>{
        console.log("server is running sucessfully")
    })
})
.catch( (err) =>{
    console.log(err)
})
