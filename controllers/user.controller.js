import User from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const registerAdmin= async(req,res)=>{
    try {
        const {username,password}= req.body;

        const existingAdmin =  await User.findOne({username});
        if(existingAdmin){
            return res.status(400).json({
                message:`this username ${username} already taken`
            })
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const newAdmin = new User({username,password:hashedPassword});
        await newAdmin.save();
        res.status(201).json({
            message: "Admin Registered Successfully"
        })
        
    } catch (error) {
        
    res.status(500).json({
        message:"Internal Server Error", error:error.message
    })
    }
}

export const loginAdmin = async (req,res)=>{
    try {
        const {username,password} = req.body;

        const user = await User.findOne({username});
        if (!user){
            return res.status(400).json({
                message:"Invalid username or Password"
            })
        }

        const isMatch= await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({
                message:"Invalid username or Password"
            })
                }

        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET,{expiresIn:'10d'})

        res.status(200).json({ 
            message: "Login successful",
             token
             });


    } catch (error) {
        res.status(500).json({
            message:"Internal Server Error", error:error.message
        });
    }
}

export const getAdminInof= async(req,res)=>{
    try {
        const user = await User.find();
        res.status(200).json({ 
            success: true, 
            data: user 
        });

    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }}