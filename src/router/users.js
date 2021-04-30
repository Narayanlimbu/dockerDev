import express from 'express';
import fetchUsers from '../controller/get-users.js';
import authRequire from '../middleware/authMiddleware.js';
const router =express.Router();

router.get("/users",authRequire, fetchUsers)


export {router as getUsers};