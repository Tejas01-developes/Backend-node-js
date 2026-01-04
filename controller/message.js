import {db} from '../Connections/mysql.js';


export const sendmsg=(req,resp)=>{
    const activeuser=req.user.email;

    if(!activeuser){
        return resp.status(400).json({success:false,message:"you are not logged in"})
    }
const{reciver,message}=req.body;

if(!reciver || !message){
    return resp.status(400).json({success:false,message:"reviver or message is not set"})
}
console.log(reciver,message)
db.query(
    'INSERT INTO messages (sender,reciver,msg) VALUES (?,?,?)',
    [activeuser,reciver,message],
    (err)=>{
        if(err){
            return resp.status(400).json({success:false,message:"message not sent"})
        }
        return resp.status(200).json({success:true,message:"message sent"})
    }
)



}


export const getmessages=(req,resp)=>{
    const activeuser=req.user.email;
console.log("active",activeuser)
    if(!activeuser){
        return resp.status(400).json({success:false,message:"you are not logged in"})
    }
    const{friend}=req.query;
    console.log("query",friend)
    if(!friend){
        return resp.status(400).json({success:false,message:"you are not logged in"})
    }

    db.query(
        `SELECT sender,reciver,msg,msg_at FROM messages WHERE 
        (sender=? AND reciver=? ) OR
        (reciver=? AND sender=? ) ORDER BY msg_at ASC`,
        [activeuser,friend,friend,activeuser],
        (err,result)=>{
            if(err){
                return resp.status(400).json({success:false,message:"message not sent"}) 
            }
            if(result.length === 0){
                return resp.status(400).json({success:false,message:"No messages"}) 
            }
            return resp.status(200).json({success:true,message:"messages",messages:result})
        }
    )
}




