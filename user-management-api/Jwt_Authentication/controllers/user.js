// const User=require("../models/user");

// async function handGetAllUsers(req,res){
//     const allDbUsers=await User.find({});
    
//     return res.json(allDbUsers);

// }

// async function handleGetUserById(req,res){
//     const id=Number(req.params.id);
//     const user = users.find((user)=>user.id === id);
//     res.json(user);
// }
// async function handleDeleteUserById(req,res){
//     await User.findIdByIdAndDelete(req.params.id)
//     return res.json({status:"success"});
// }

// async function handleCreateNewUser(req,res){
//     const body=req.body;
//     if(
//         !body||
//         !body.firstName||
//         !body.lastName||
//         !body.email||
//         !body.gender||
//         !body.jobTitle
//     ) {
//         return res.status(400).json({msg:"all fields are req"});

//     }
//     const result=await User.create({
//         firstName:body.firstName,
//         lastName:body.lastName,
//         email:body.email,
//         jobTitle:body.jobTitle,
//         gender:body.gender,


//     })
//     console.log(result)
//     return res.status(201).json({msg: "success",id:result._id})

// }

// module.exports={
//     handGetAllUsers,
//     handleGetUserById,
//     handleDeleteUserById,
//     handleCreateNewUser,

// }

const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "secret123";

async function handleGetAllUsers(req,res){

    const allDbUsers = await User.find({});
    return res.json(allDbUsers);

}

async function handleGetUserById(req,res){

    const user = await User.findById(req.params.id);

    if(!user){
        return res.status(404).json({msg:"User not found"});
    }

    return res.json(user);

}

async function handleDeleteUserById(req,res){

    await User.findByIdAndDelete(req.params.id);

    return res.json({status:"success"});
}

async function handleCreateNewUser(req,res){

    const body=req.body;

    if(
        !body.firstName ||
        !body.email
    ){
        return res.status(400).json({msg:"Required fields missing"});
    }

    const result = await User.create({
        firstName:body.firstName,
        lastName:body.lastName,
        email:body.email,
        jobTitle:body.jobTitle,
        gender:body.gender
    });

    return res.status(201).json({
        msg:"success",
        id:result._id
    });

}

async function handleRegister(req, res) {
    const { firstName, email, password } = req.body;

    if (!firstName || !email || !password) {
        return res.status(400).json({ msg: "firstName, email and password are required" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
        return res.status(409).json({ msg: "Email already registered" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ firstName, email, password: hashed });

    return res.status(201).json({ msg: "User registered", id: user._id });
}

async function handleLogin(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ msg: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).json({ msg: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return res.status(401).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "1d" });

    return res.json({ token });
}

module.exports = {
    handleGetAllUsers,
    handleGetUserById,
    handleDeleteUserById,
    handleCreateNewUser,
    handleRegister,
    handleLogin
};
