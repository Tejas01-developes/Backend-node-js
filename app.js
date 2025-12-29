import express, { json } from 'express';
import http from 'http';
import './Connections/mysql.js';
import { frontend } from './Connections/cors.js';
import router from './routes/routes.js';

const app=express();

app.use(express.urlencoded({extended:true}));
app.use(json());
const server=http.createServer(app);
app.use(frontend)
app.use("/apis",router)


const port=process.env.PORT || 3000;





server.listen(port,()=>{
    console.log("server started on port 3000")
})
