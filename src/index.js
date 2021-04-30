import express from 'express';
import mongoose from 'mongoose';
import {signupRouter} from './router/authRouter.js';
import {getUsers} from './router/users.js';
import {signInRouter} from './router/sign-in.js'
import envConfig from './config/config.js';
import redis from 'redis';
import connectRedis from 'connect-redis';
import session from 'express-session';
import cors from 'cors';

let RedisStore=connectRedis(session);
let redisClient=redis.createClient({
    host:envConfig.REDIS_URL,
    port:envConfig.REDIS_PORT
})


const app=express();

//connsect with mongo db

mongoose.connect('mongodb://nrnlimbu:password@mongo:27017/?authSource=admin', {useNewUrlParser:true, useUnifiedTopology: true})
.then(()=>{
    console.log("mongodb connected");
})
.catch((e)=>{
    console.log(e);
})

app.enable("trust proxy");
app.use(cors());
app.use(express.json());
// create session while user logs in
app.use("/auth",session({
        store: new RedisStore({client:redisClient}),
        secret:envConfig.SESSION_SECRET,
        cookie:{
            secure:false,
            resave:false,
            saveUninitialized: false,
            httpOnly: true,
            maxAge:60000,
        }})
)

app.use("/auth", signupRouter);
app.use("/auth", getUsers);
app.use("/auth", signInRouter);

app.get('/', (req, res)=>{
    console.log("request received");
    res.send("WelCome to the New App !!!");
})




app.listen(3000, ()=>{
    console.log("listining on port 3000");
})