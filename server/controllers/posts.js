import Post from "../models/Post.js";
import User from "../models/User.js";

// createPost


export const createPost=async(req,res)=>  //handles post picture
{
    try {
        
        const {userId,description,picturePath}=req.body;
        const user =await User.findById(userId);
        const newPost =new Post({
            userId,
            firstName:user.firstName,
            lastName:user.lastName,
            location:user.location,
            description,
            userPicturePath:user.picturePath,
            picturePath,
            likes:{},
            comment:[]
        })

        await newPost.save();

        const post =await Post.find();   //grabs all the post

        res.send(201).json(post);

    } catch (error) {
            res.status(409).json({message: err.message});        
    }
}

//  Read 
export const getFeedPosts =async (req,res)=>
{
    try {
        
        const post =await Post.find();   //grabs all the post

        res.send(200).json(post);

    } catch (error) {
        res.status(404).json({message: err.message});
    }
}


export const getUserPosts =async (req,res)=>
{
    try {
        
        const {userId}=req.params;
        const post =await Post.find({userId});   //grabs all the post

        res.send(200).json(post);

    } catch (error) {
        res.status(404).json({message: err.message});
    }
}


// Update 

export const likePost =async(req,res)=>
{
    try {
        
        const {id}=req.params;
        const {userId}=req.body;
        const post =await Post.findById({id});  

        const isLiked =post.likes.get(userId);

        if(isLiked)
        {
            post.likes.delete(userId);
        }
        else
        {
            post.likes.set(userId,true);
        }

        const updatedPost = await Post.findByIdAndUpdate(id,{likes:post.likes},{new:true});   //updates likes in post 
        res.send(200).json(updatedPost);

    } catch (error) {
        res.status(404).json({message: err.message});
    }
}