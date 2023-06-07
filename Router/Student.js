const express = require("express")
const Studentrouter  =  express.Router()
const {sendResponse} = require("../Comp/Helper")
const StudentController = require("../Controller/StudentController")
const studentModel = require("../Models/Student")

Studentrouter.get("/", StudentController.paginationRoute)

Studentrouter.post("/", async (req,res) =>{
    let {firstName, lastName, contact} = req.body
    try{
        let obj = {firstName, lastName, contact}
        let arrRequired = ["firstName","lastName","contact"]
        let errArr = []
        arrRequired.map( (x) =>{
            if(!obj[x]){
                errArr.push(x)
            }
        })

        if(errArr.length > 0){
            res.send(sendResponse(false,errArr,"Enter required Feilds","error"))
        }else{
            let result = new studentModel(obj)
            await result.save()
            if(!result){
                res.send(sendResponse(false,null,"Data Not save","error")).status(404)
            }else{
                res.send(sendResponse(true,result,"Data save sucessfully","succes")).status(200)
            }
        }

    }catch(e){
        console.log(e)
    }
})

Studentrouter.put("/:id", async (req,res) =>{
    try{
      let id = req.params.id   
    let Data = await studentModel.findById(id)
      if(!Data){
        res.send(sendResponse(false,null,"ID not Found","error"))
      }else{
       let update = await studentModel.findByIdAndUpdate(id,req.body,{new:true})
        if(!update){
            res.send(sendResponse(false,null,"Not Update Data","error")).status(404)
        }else{
            res.send(sendResponse(true,update,"Data updated","sucess")).status(200)
        }
      }
    }catch(e){
        console.log(e)
    }
})

Studentrouter.delete("/:id", async (req,res) =>{
    try{
    let id = req.params.id
    let dataCheck = await studentModel.findById(id)
    if(!dataCheck){
        res.send(sendResponse(false,null,"Data not found by id","error")).status(404)
    }else{
        let deleteData = await studentModel.findByIdAndDelete(dataCheck)
        if(!deleteData){
            res.send(sendResponse(false,null,"Data not Delete","error"))
        }else{
            res.send(sendResponse(true,deleteData,"Data delete sucessfully","success")).status(200)
        }
    }
    }catch(e){
        console.log(e)
    } 
})

module.exports = Studentrouter