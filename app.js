import express, { json } from 'express';
import http from 'http';
import './Connections/mysql.js';
import { frontend } from './Connections/cors.js';
import router from './routes/routes.js';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import { Server } from 'socket.io';

dotenv.config();

const app=express();

app.use(express.urlencoded({extended:true}));
app.use(json());
app.use(cookieParser())
const server=http.createServer(app);
const io=new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        credentials:true
    }
})
const onlineuser=new Map();
io.on("connection",(socket)=>{
console.log("socket connected",socket.id)

socket.on("join",(email)=>{
    onlineuser.set(email,socket.id)
    console.log("joined",email)
})


})









app.use(frontend)
app.use("/apis",router)


const port=process.env.PORT || 3000;





server.listen(port,()=>{
    console.log("server started on port 3000")
})
