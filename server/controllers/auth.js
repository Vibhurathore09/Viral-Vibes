import bcrpyt from 'bcrypt';
import  Jwt  from 'jsonwebtoken';
import User from "../models/User.js";

// Register User

export const register =async (req,res)=>
{

    try {
        const {
            fileName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        } =req.body;

        const salt =await bcrpyt.genSalt();
        const passwordHash =await bcrpyt.hash(password,salt);

        const newUser =new User({
            fileName,
            lastName,
            email,
            password:passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewProfile:Math.floor(Math.random()*10000),
            impressions:Math.floor(Math.random()*10000),
            

        });
        const savedUser =await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({error:err.message});
    }
};


// loggin in

export const login =async (req,res) =>
{
    try {
        
        const {email,password}=req.body;
        const user = await User.findOne({email:email});
        if(!user)
        {
            return res.status(400).json({msg:"User not exist"});
        }

        const isMatch = await bcrpyt.compare(password,user.password);  //compare is matching password

        if(!isMatch)
        {
            return res.status(400).json({msg:"Invalid Password"});
        }

        const token =Jwt.sign({id:user._id},process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({token,user});

    } catch (error) {
        res.status(500).json({error:err.message});
    }
}

