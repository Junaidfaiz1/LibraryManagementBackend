import User from "../Models/User.Model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) =>{
    try {
        const {name, rnumber, email, password} = req.body;
        const newuser = new User({
            name,
            rnumber,
            email,
            password
        })
         await newuser.save();
         res.status(201).json(newuser);
    }catch (error) {
        res.status(500).json({error: error.message});
    }
}

export const loginUser = async (req, res)=>{
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: "Invalid credentials"});
        }
        const token = jwt.sign({email: user.email, id: user._id}, process.env.TokenKey , {expiresIn: "1h"});
        res.status(200).json({result: user, token});

    }catch (error) {
        res.status(500).json({error:error.message});
    }
}

export const getUsers = async (req, res)=>{
    try{
        const users = await User.find({});
        res.status(200).json(users);
    }catch (error) {
        res.status(500).json({error: error.message});
    }
}

export const getUserCount = async (req, res)=>{
    try{
        const count = await User.countDocuments();
        res.status(200).json(count);

    }catch (error) {
        res.status(500).json({error: error.message});
    }
}

export const getUserForDashboard = async (req, res)=>{
    try{
        const users = await User.find().limit(4);
        res.status(200).json(users);
    }catch (error) {
        res.status(500).json({error: error.message});
    }
}