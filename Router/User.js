const express = require("express");
const rouetr =  express.Router()
const {sendResponse} = require("../Comp/Helper")
const userSchema = require("../Models/UserSchema")
const bycrpt = require("bcrypt");
const AuthController = require("../Controller/authController");
const ProtectedController = require("../Controller/ProtectController");

rouetr.post("/signup",  async (req,res) =>{
    let {userName , email , password} = req.body
    let obj = {userName , email , password}
    let requiredArr = ["userName","email","password"]
    let errArr = []

    requiredArr.forEach( (x) =>{
        if(!obj[x]){
            errArr.push(x)
        }
    })

    if(errArr.length > 0){
        res.send(sendResponse(false,null,errArr,"Error")).status(400)  
        return
    }else{
        let bycrptPasswword = await bycrpt.hash(obj.password,10)
        obj.password = bycrptPasswword

        let exisiting = await userSchema.findOne({email})
        if(exisiting){
            res.send(sendResponse(false,null,"User alerady taken","error"))
        }else{
            userSchema.create(obj)
            .then( (result) =>{
                res.send(sendResponse(true,result,"User save sucessfully","sucess")).status(200)
            })
            .catch( (err) =>{
                res.send(sendResponse(false,err,"Internal error","Error"))
            })
        }
    }

})  
                                                                             
rouetr.post("/login", AuthController.Login)

rouetr.get("/test", ProtectedController.Protected , (req,res) =>{
    res.send("User are valid")  
})

rouetr.get("/", (req,res) =>{
    
})
rouetr.put("/", (req,res) =>{
    
})
rouetr.delete("/", (req,res) =>{
    
})

module.exports = rouetr

