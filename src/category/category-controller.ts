import { NextFunction, Request, Response } from "express";

export class CategoryController {
    async create(req:Request,res:Response,next:NextFunction){
        try{
            res.send("Create category")


        }
        catch(error){
            console.log(error)
            next(error)
        }
    }}