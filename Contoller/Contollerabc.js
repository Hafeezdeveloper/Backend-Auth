const { sendResponse } = require("../Comp/Helper")
const CourseModel = require("../Models/CourseSchema")


let courseController = {
    GetApi: async(req,res) =>{
        try{
        let result = await CourseModel.find()
        if(!result){
            res.send(sendResponse(false,null,"Data not Found","error")).status(404)
        }else{
            res.send(sendResponse(true,result,"Data Found","sucess")).status(200)
        }
        }catch(e){
            console.log(e)
        }
    },
    PostApi:async(req,res) =>{
        let {name , duration,fees , shortName} = req.body
        try{
            let obj = {name , duration , fees , shortName}
            let requiresArr = ["name","duration","fees","shortName"]
            let errArr = []
            
            requiresArr.map( (x) =>{
                if(!obj[x]){
                    errArr.push(x)
                }
            })
            if(errArr.length > 0 ){ 
                res.send(sendResponse(false,null,errArr,"error")).status(404)
            }else{
               let data = await CourseModel.create(obj)
               .then( (succ) =>{
                res.send(sendResponse(true,succ,"Data send To database","success"))
               })
               .catch( (err)=>{
                res.send(sendResponse(false,err,"Data not send","error"))
               })
            }
    
        }catch(e){
            console.log(e)
        }
    },
    PutApi:async(req,res) =>{
        try{
            let id = req.params.id
            let data = await CourseModel.findById(id)
            if(!data){
                res.send(sendResponse(false,null,"data can not send"))
            }else{
            let update = await CourseModel.findByIdAndUpdate(id,req.body,{new:true})
            if(!update){
                res.send(sendResponse(false,null,"can not update","error"))
            }else{
                res.send(sendResponse(true,update,"update succesfully","sucess")).status(200)
            }
            }
        }catch(e){
            console.log(e)
        }
    },
    DeleteApi: async(req,res) =>{
        try{
        let id = req.params.id
        let data = await CourseModel.findById(id)
        if(!data){
            res.send(sendResponse(false,null,"can not delete message","error"))
        }else{
        let deleteData = await CourseModel.findByIdAndDelete(data)
        if(!deleteData){
            res.send(sendResponse(false,null,"message can not delete","error")).status(404)
        }else{
            res.send(sendResponse(true,deleteData,"message delete sucessfully","sucess")).status(200)
        }   
        }
        }catch(e){
            console.log(e)
        }
    }
    

}

module.exports = courseController