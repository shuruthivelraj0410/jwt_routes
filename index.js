import express from "express";
import dotenv from "dotenv";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createUser, findUser } from './mysql/query.js'
dotenv.config()
const app = express();
app.use(express.json())

app.post('/',(req,res)=>{
    try{
    res.render('index',{title : "shuruthi"})
    }catch(e){
        console.log(e)
    }
})
app.post('/register', async (req, res) => {
try{
    let username = req.body.username;
    let role = 'user';
    let salt = await bcrypt.genSalt(10);
    let password = await bcrypt.hash(req.body.password, salt);
    let message = '';
    let [data, created] = await createUser({ username, password, role })
    console.log(created)
    if (created) {
        let accessToken =  jwt.sign({username,password,role},process.env.SECRET)
        res.cookie('accessToken',accessToken)
        message = "Registered Successfully"
    }
    else {
        message = "Already account created. Kindly Login"
    }
    res.json(message)
}
catch(e){
    console.log("###############################",e)
}
})
const authenticateToken = async (req,res,next)=>{
    // console.log(req.headers.cookie)
    let accessToken = req.headers.cookie.split('=')[1]
    let data = jwt.verify(accessToken,process.env.SECRET,
        (err,data)=>{
        if(err) throw err;
        if(data) return data;
     }
     )
    let response = await findUser(data)
    let result =  await bcrypt.compare(req.body.password,response.password)
    if(result){
        next()
    }
    else{
        res.json({code : "Authentication Failed"})
    }
}
app.post('/login',authenticateToken,(req,res)=>{
res.json("Login successful")
})
app.listen(process.env.PORT, () => {
    console.log(`listening to port ${process.env.PORT}`)
})