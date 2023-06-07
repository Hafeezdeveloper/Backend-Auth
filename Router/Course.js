const express = require("express");
const courseRouter = express.Router()
const {sendResponse} = require("../Comp/Helper");
const courseController = require("../Contoller/Contollerabc");
const CourseModel = require("../Models/CourseSchema")


courseRouter.get("/", courseController.GetApi)

courseRouter.post("/", courseController.GetApi)

courseRouter.put("/:id", courseController.PutApi)

courseRouter.delete("/:id",courseController.DeleteApi)

module.exports = courseRouter