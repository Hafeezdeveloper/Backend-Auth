const jwt = require("jsonwebtoken");
const { sendResponse } = require("../Comp/Helper");

let ProtectedController = {
    Protected: async (req,res,next)=>{
        let token = req.headers.authorization;
        token = token.split(" ")[1]
        jwt.verify(token, process.env.SECURE_KEY, function(err, decoded) {
            if(err){
                res.send(sendResponse(false,null,"User Unathorized","error"))
            }
            // res.send(sendResponse(false,decoded,"User Athorized","sucess"))
            next()
          });
          
    }
}

module.exports = ProtectedController