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








server.listen(3000,()=>{
    console.log("server started on port 3000")
})
