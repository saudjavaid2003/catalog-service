import express from "express"
import { CategoryController } from "./category-controller"
import categoryValidator from "./category-validator"
const categoryController=new CategoryController()
const router=express.Router()

router.post("/",categoryValidator,categoryController.create)

export default router