import User from '../model/user.js';
import bcrypt from 'bcrypt';

const signIn=async (req, res)=>{
    const {username, password}=req.body;
    const user=await User.findOne({username});

    if(!user){
        res.send("invalid username");
    }
    const compare=await bcrypt.compare(password, user.password);
    if(!compare){
        res.send("invalid credentials");
    }

    req.session.user=user;
    res.send("logedin");
}
export {signIn};