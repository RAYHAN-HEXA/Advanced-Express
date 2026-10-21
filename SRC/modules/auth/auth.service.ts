import { pool } from "../../db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../Config";


const loginUserIntoDB = async (payload:{
    email:string;
    password : string;
})=>{
const { email,password} = payload;
//checks if  the user exists 
// compare passowrd 
// genarate token
const userData = await pool.query(
    `SELECT * FROM users WHERE  email=$1`,[email]
)
if(userData.rows.length===0){
    throw Error("Invalid Credential")
}
const user = userData.rows[0];
// console.log(user);

const matchPassword = await bcrypt.compare(
  password,
  user.password
);

console.log(matchPassword)
if(!matchPassword){
        throw Error("Invalid Credential");

}
// Genarate Token
const jwtPayload = {
    id : user.id,
    name : user.name,
    role: user.role,
    is_active : user.is_active,
    email : user.email,


}
const accessToken = jwt.sign(jwtPayload,config.jwt_secret as string,{expiresIn:"1d"})
return {accessToken};
}


export const authService = {
loginUserIntoDB
}
