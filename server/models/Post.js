import mongoose from "mongoose";
const postSchema =mongoose.Schema(
    {
        userId:{
            type:String,
            required:true,
        },
        firstName:{
            type:String,
            required:true,
        },
        lastName:{
            type:String,
            required:true,
        },
        location:{
            type:String,
            discription:true,
            picturePath:String,
            userPicturePath:String,
            likes:{
                type:Map,
                of:Boolean,
            },   //more efficient when large no of likes  
        },
        comment:{
            type:Array,
            default:[]
        }
    },
    {
        timestamps:true
    }
);

const Post =mongoose.model("Post",postSchema);
export default Post;