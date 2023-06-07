const {sendResponse} = require("../Comp/Helper")
const studentModel = require("../Models/Student")

let StudentController = {
    paginationRoute:async (req,res) =>{
        let { page , limit } = req.query
        let skip = (page - 1) * 5
        try{        
          let result = await studentModel.find().skip(skip).limit(limit)      
          if(!result){
            res.send(sendResponse(false,null,"data not found","error")).status(404)
          }else{
            res.send(sendResponse(true,result,"Data found","sucess")).status(200)
          }
        }catch(e){
            console.log(e)
        }
    },

}

module.exports = StudentController