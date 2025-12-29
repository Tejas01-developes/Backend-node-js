import jwt from 'jsonwebtoken';
import { accesstoken } from '../tokens/tokens';


export const cookiefilter=(req,resp,next)=>{
    const cookie=req.cookies.refresh;

    if(!cookie){
        return resp.status(400).json({success:false,message:"no access token"})
    }

    jwt.verify(cookie,process.env.REFRESH_KEY,(err,decode)=>{
        if(err){
            return resp.status(400).json({success:false,message:"cookie is invalid"})
        }
        req.user=decode;
        
        next();
    })
}