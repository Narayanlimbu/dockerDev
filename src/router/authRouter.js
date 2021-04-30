import express from 'express';
import {createUser} from '../controller/signup.js';

const router=express.Router();
router.post("/signup", createUser)
export {router as signupRouter};