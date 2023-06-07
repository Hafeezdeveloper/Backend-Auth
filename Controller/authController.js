const { sendResponse } = require("../Comp/Helper")
const bycrpt = require("bcrypt");
const userSchema = require("../Models/UserSchema")
const jwt = require("jsonwebtoken")

let AuthController = {
    Login: async (req, res) => {
        let { email, password } = req.body
        let obj = { email, password }
        let reqdArr = ["email", "password"]
        let errArr = []

        reqdArr.map((x) => {
            if (!obj[x]) {
                errArr.push(x)
            }
        })

        if (errArr.length > 0) {
            res.send(sendResponse(false, null, "enter fields", "error")).status(400)
        } else {
            let result = await userSchema.findOne({ email })
            
            if (result) {
                let passEnd = await bycrpt.compare(obj.password, result.password)

                if(passEnd){
                    var token = jwt.sign({ ...result }, process.env.SECURE_KEY,{expiresIn: "1h"});
                    res.send(sendResponse(true, {user : result , token}, "token get"))
                }else{
                    res.send(sendResponse(true, null, "password not match"))
                    
                }

            } else {
                res.send(sendResponse(true, null, "Email not Found login First"))
            }

            // .then( async (resu)=>{
            //     // res.send(sendResponse(true, passEnd,"password macth", "Login Sucessfully"))
            //     res.send(sendResponse(false, resu, "Password  match","sucess"))
            // }).catch((err)=>{
            //     res.send(sendResponse(false, null, "Password not match"))
            // })

        }

    }
}

module.exports = AuthController