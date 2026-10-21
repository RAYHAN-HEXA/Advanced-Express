import { pool } from "../../db";
import bcrypt from "bcryptjs";
import jwt, { type JwtPayload } from "jsonwebtoken";
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
const refreshToken = jwt.sign(jwtPayload,config.refresh_secret as string,{expiresIn:"1d"})
return {refreshToken,accessToken};
}


export const authService = {
loginUserIntoDB
}
const generateFreshToken = async(token : string)=>{

      // 1. Check token
      if (!token) {
          throw new Error('unauthorized')
      }

      // 2. Verify token
      const decoded = jwt.verify(
        token,
        config.refresh_secret as string
      ) as JwtPayload;

      // 3. Find user from database
      const userData = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [decoded.email]
      );

      // 4. Check user existence
      if (userData.rows.length === 0) {
          throw new Error('forbidden')
      }

      // 5. Get user
      const user = userData.rows[0];

      console.log(user);
      if(!user.is_active){
     throw new Error('forbidden')
}

}
