import express from 'express';
import {signIn} from '../controller/signin.js';
const router =express.Router();
router.post('/signin',signIn );
export {router as signInRouter};