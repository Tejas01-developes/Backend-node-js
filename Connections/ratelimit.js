import ratelimit from 'express-rate-limit';


export const limit=ratelimit({
    windowMs:15 * 60 * 1000,
    max:5,
    keyGenerator:(req)=>{
const email=req.body.email || "no email";
console.log( `${req.ip}:${email}`)
return `${req.ip}:${email}`;

    },
    message:{
        success:false,
        message:"too many attempts"
    },
    standardHeaders:true,
    legacyHeaders:false
})