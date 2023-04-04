import  Jwt  from "jsonwebtoken";

export const verifyToken =async (req,res,next) =>
{
    try {
        
        let token =req.header("Authrization");

        if(!token)
        {
            return res.status(403).send("Access Denied");
        }

        if(token.startsWith("Bearer"))
        {
            token =token.slice(7,token.length).trimLeft();
        }

        const verified =Jwt.verify(token,process.env.JWT_SECRET);
        req.user =verified;
        next();
    } catch (error) {
        res.status(500).json({error:err.message});
    }
}

export default verifyToken;