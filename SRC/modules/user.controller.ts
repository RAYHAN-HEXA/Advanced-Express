import type { Request, Response } from "express";
import { pool } from "../db";
import { userServices } from "./user.service";
import { Result } from "pg";

const createUser = async(  req:Request ,res: Response )=>{ // Final Post End Point => /api/users
    // console.log(req.body);
    const {name ,email,password,age} = req.body;
      
try {
    const result = await userServices.createUserIntoDB(req.body)
   
  console.log(result.rows[0]);
   res.status(201).json({
      message : " Created  successfully ",
      data :result.rows
    })
} catch(error:any){

  res.status(500).json({
    success: false,
    message: error.message,
    error: error
    })
}
}
const getAllusers =  async(req :Request, res:Response) => {
 
try {
      const result = await userServices.getAllusersFromDB();
      res.status(200).json({
      success : true,
      message : " data retrived successfully ",
      data : result.rows
    })
  
} catch (error :any) {
res.status(500).json({
      success : false,
      message : error.message,
      error : error
      
    })
}
}
const getSingleUser = async (req:Request,res: Response)=>{
  const { id  }= req.params;
  console.log(id);

  try {
    const result = await userServices.getSingleUserFromDB(id as string)

    if(result.rows.length === 0){
      return res.status(404).json({
        success : false,
        message : " data not found ",
        data : {}
      })
    }

    return res.status(200).json({
      success : true,
      message : " data retrived successfully ",
      data : result.rows[0]
    })

  } catch (error:any) {
    return res.status(500).json({
      success : false,
      message : error.message,
      error : error
    })
  }

}

const updateUser = async(req:Request,res:Response)=>{
  const {id} = req.params;
  const {name,password,age,is_active} =req.body;

  // console.log("id:", id);

  // console.log({name,password,age,is_active})
 
  try {
    const result = await userServices.updateUsertoDB(req.body,id as string)

    if(result.rows.length === 0){
      return res.status(404).json({
        success : false,
        message : " data not found ",
      })
    }

    return res.status(200).json({
      success : true,
      message : "data updated successfully",
      data : result.rows[0]
    })

  } catch (error:any) {
    return res.status(500).json({
      success : false,
      message : error.message,
      error : error
    })
  }
}
const deletUser = async(req:Request,res: Response)=>{
  const {id} = req.params;
  try {
    const result = await  userServices.deletUserFromDelet(id as string)
    
    if(result.rowCount === 0 ){
      res.status(404).json({
      success : false,
      message : " data not found ", 
    })
    }
    console.log(result)
    res.status(200).json({
      success : true,
      message : " user deleted  successfully ",
      data : {}
    })


    
  } catch (error:any) {
    res.status(500).json({
      success : false,
      message : error.message,
      error : error
      
    })
    
  }
}
export const userController = {
    createUser, getAllusers,getSingleUser,updateUser,deletUser
}
