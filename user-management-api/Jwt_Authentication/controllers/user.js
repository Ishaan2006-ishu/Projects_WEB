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

module.exports = {
    handleGetAllUsers,
    handleGetUserById,
    handleDeleteUserById,
    handleCreateNewUser
};