let express = require("express")
const { sendResponse } = require("../Comp/Helper")
const TecaherModel = require("../Models/TechaerSchema")
let Teachrouter = express.Router()

Teachrouter.get("/", async(req,res) =>{
    try{
        let result = await TecaherModel.find()
        if(!result){
            res.send(sendResponse(false,null,"no data send","error"))
        }else{
            res.send(sendResponse(true,result,"data Found","sucess"))
        }
    }catch(e){
        console.log(e)
    }
})

Teachrouter.post("/", async(req,res) =>{
    let {name, course , contact} = req.body
    let obj = {name, course , contact}
    try{
        let reqArr = ["name","course","contact"]
        let errArr = []

        reqArr.map( (x) =>{
            if(!obj[x]){
                errArr.push(x)
            }
    })
    if(errArr.length > 0){
        res.send(false,null,"required Feilds","error")
    }else{
    let result =  TecaherModel(obj)
    await result.save()
        if(!result){
            res.send(sendResponse(false,null,"Result Not save","error"))
        }else{
        res.send(sendResponse(true,result,"Save data to Database","sucess"))
        }
    }

    }catch(e){

    }
})
Teachrouter.put("/:id", async(req,res) =>{
    try{
    let id = req.params.id
        let datafind = await TecaherModel.findById(id)

        if(!datafind){
            res.send(sendResponse(false,null,"Data not found by ID","error"))
        }else{
        let update = await TecaherModel.findByIdAndUpdate(id,req.body,{new:true})
            if(!update){
        res.send(sendResponse(false,null,"Can not Update","Error"))
            }else{
        res.send(sendResponse(true,update,"Update successfully","sucess"))
            }
        }
  }catch(e){
      console.log(e)
  }
})

Teachrouter.delete("/:id", async(req,res) =>{
    try{
    let id = req.params.id
        let datafind = await TecaherModel.findById(id)

        if(!datafind){
            res.send(sendResponse(false,null,"Data not found by ID","error"))
        }else{
        let dele = await TecaherModel.findByIdAndDelete(datafind)
            if(!dele){
        res.send(sendResponse(false,null,"Can not Update","Error"))
            }else{
        res.send(sendResponse(true,dele,"Update successfully","sucess"))
            }
        }
  }catch(e){
      console.log(e)
  }
})


module.exports = Teachrouter    