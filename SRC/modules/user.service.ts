import { pool } from "../db";
import type { Iuser } from "./user.interface";
// @ts-expect-error bcrypt does not provide declarations in this project
import bcrypt from "bcrypt";


const createUserIntoDB = async(payload : any)=>{
        const {name ,email,password,age,role} = payload;
        const hashpassword = await bcrypt.hash(password,10)

     const result = await pool.query(
    `INSERT INTO users(name,email,password,age,role) VALUES($1,$2,$3,$4,COALESCE($5,'user')) RETURNING *
    
    `,
    [name,email,hashpassword,age,role]
  );
  delete result.rows[0].password;
  return result;
  
} 
const getAllusersFromDB = async()=>{
   const result =   await pool.query(`
      SELECT * FROM users
    `)
    return result;
}
const getSingleUserFromDB = async (id: string)=>{
  const result = await pool.query(
      `
      SELECT * FROM users WHERE id=$1

      `,
      [id]
    );
    return result;
}
const updateUsertoDB = async (payload :Iuser,id : string)=>{
  const {name,password,age,is_active} = payload
   const result  = await pool.query(`
   
    UPDATE  users  
    SET  name =COALESCE($1,name),
         password =COALESCE($2 ,password),
         age=COALESCE($3, age),
         is_active=COALESCE($4 ,is_active)
 
    WHERE id=$5  RETURNING  *

    `,[name,password,age,is_active,id]);
    return result;
  
      

    }
    const deletUserFromDelet = async (id : string)=>{
      const result = await pool.query(
      `DELETE FROM users 
       WHERE id = $1
      `,[id]
    ) 
    return result;
    }
    


export const userServices = {
    createUserIntoDB,getAllusersFromDB,getSingleUserFromDB,updateUsertoDB,deletUserFromDelet
}