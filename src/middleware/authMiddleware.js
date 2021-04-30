const authRequire=(req,res,next)=>{
   const {user}=req.session;
   if(!user){
       res.send("Un authorised access");
   }
   next();
}

export default authRequire;