const express = require("express");
const app = express();
const dotenv = require("dotenv");
const users = require("./userSchema");
const bcrypt = require("bcrypt");

dotenv.config();
require("./connect");
const PORT = 4000;

app.listen(PORT, ()=>{
    console.log(`server running on ${PORT}`);
});

app.use(express.json());
app.post("/signup", async (req, res) =>{
    const {username, password} = req.body;

    try{
        const isFound = await users.findOne({username});
        if(isFound){
            res.status(400).send({message: "user already registered!"});
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

app.post("/signin", async (req, res)=>{

})