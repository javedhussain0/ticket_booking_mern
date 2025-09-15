import User from "../Models/User.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

export const register = async (req , res) =>{
    try{
        const {name , lastName , email , password , role} = req.body;
        if(!name || !lastName || !email || !password|| !role){
            return res.status(200).json({
                message : "Please fill all the required fields",
                success : false
            });
        };
        const user = await User.findOne({email});
        if(user){
            return res.status(200).json({
                message : "Email already exists",
                success : false
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            name,
            lastName,
            email,
            password: hashedPassword,
            role
        })
        

    }catch(e){
        console.log("Error",e)

    }
}
export const login = async (req , res) =>{
    try{
        const {email , password , role} = req.body;
        if(!email ||!password || !role){
            res.status(401).json({
                message : "Please fill all the required fields",
                success : false

            });
        };
       const user = await User.findOne({email});
       if(!user){
        res.status(401).json({
            message : "Incorrect Email or Password",
            success : false
        });
       }
       const isMatch = await bcrypt.compare(password, user.password);
       if(!isMatch){
        res.status(401).json({
            message : "Incorrect  Password",
            success : false
        });
       }
       if(role === user.role){
        res.status(401).json({
            message : "Unauthorized Access",
            success : false
        });
       }
       const tokenData = {
        userId : user._id

       }
       const token = await jwt.sign(tokenData, process.env.JWT_SECRET ,{expiresIn: '1d'} );
      user ={
        _id:user._id,
        name: user.name,
        lastName : user.lastName,
        email: user.email,
        role: user.role
        
      }
       return res.status(200).cookie("token",token, {maxAge:1*24*60*60*1000, httpsOnly : true, sameSite:'strict'}).json({
     message : `welcome back ${user.find}`,
        success : 'true'
       })
     
      
       
    }catch(e){
        console.log("Error",e)
}
}
export const logout = async (req, res) =>{
    try{
        return res.status(200).cookie("token" , "",{maxAge:0}).json({
            message : "Logged out successfully",
            success : 'true'
        })
    }catch(e){
        console.log("Error",e)
    }
}

export const updateProfile = async (req, res)=>{
    const {name , lastName , email , password , skills} = req.body;
    if(!name || !lastName || !email || !password|| !skills){
        return res.status(200).json({
            message : "Please fill all the required fields",
            success : false
        });
    };
    const skillsArray = skills.split(",");
    const userId = req.id;
    let user = await User.findById(userId);
// udate data
    user.name = name,
    user.lastName = lastName,
    user.email = email,
    user.skills = skillsArray;
  await user.save();
  user ={
    _id:user._id,
    name: user.name,
    lastName : user.lastName,
    email: user.email,
    skills: user.skills
  }
   
   
}


