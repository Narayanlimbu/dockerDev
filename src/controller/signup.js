import User from '../model/user.js';
import bcrypt from 'bcrypt';


const createUser=async (req, res)=>{
    const {username, password}=req.body;
    const hashedPass=await bcrypt.hash(password, 8);
    const user=await User.create({username, password:hashedPass});
    req.session.user=user;
    res.status(201).send(user);
}
export {createUser};