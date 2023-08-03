const express = require("express");
const app = express();
const dotenv = require("dotenv");
const users = require("./userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require('cors');

dotenv.config();
require("./connect");
const PORT = process.env.PORT;

app.listen(PORT, ()=>{
    console.log(`server running on ${PORT}`);
});

app.use(express.json());   // to read req data 
app.use(cors());

app.post("/signup", async (req, res) =>{
    const {username, password} = req.body;
    try{
        const isFound = await users.findOne({username});
        if(isFound){
            res.send({message: "user already registered!"});
            return;
        }
        const hash = await bcrypt.hash(password, 10);
        const user = new users({username, password: hash});
        const resp = await user.save();
        if(resp){
            res.status(200).send({message: "user created successfully!"})
        }
    }
    catch(err){
        res.status(400).send({messager: err})
    }
});

app.post("/signin", async (req,res)=>{
    const { username, password }= req.body;
    console.log(username, password);
    try{
        let foundUser = await users.findOne({username});
        if(!foundUser){
            res.send({message: "invailid username or password!"});
            return;
        }
        let resp = await bcrypt.compare(password, foundUser.password);
        if(!resp){
            res.send({message: "invailid username or password!"});
            return;
        }
        if(resp){
            const payload = {username};
            const secretKey = process.env.secretKey;
            const token = await jwt.sign(payload, secretKey);
            res.send({message: "user logged in successfully!",
                       token : token});
        }
    }
    catch(err){
        console.log("err", err);
        res.send({message: err})
    }
});