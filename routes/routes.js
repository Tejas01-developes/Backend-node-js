import express from 'express';
import { loginuser, register } from '../controller/Reg_login.js';
import { limit } from '../Connections/ratelimit.js';

const router=express.Router();

router.post("/register",register);
router.post("/login",limit,loginuser)


export default router;