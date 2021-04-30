import User from '../model/user.js';

const fetchUsers=async(req,res,next)=>{
    try{
        const users=await User.find();
        res.send(users);
    }catch{
        console.log("error");
    }

}

export default fetchUsers;