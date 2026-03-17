//const express=require("express");
//const{logReqRes}=require("./middlewares");
//const mongoose=  require("mongoose");
//const users=require("./MOCK_DATA.json");
//const fs=require("fs");
//const {connentMongoDb}=require("./connection");
//console.log(users);

//const app=express();
//app.use(express.urlencoded({extended: false}));
//app.use(logReqRes("log.txt"));
//const PORT=8000;
//connentMongoDb("mongodb://127.0.0.1:27017/youtube-app-1")

//const userRouter=require("./routes/user");

// mongoose.connect('mongodb://127.0.0.1:27017/youtube-app-1')
// .then(()=>console.log("Mongodb connected"))
// .catch((err)=>console.log("Mongo error",err))




// schema
// const userSchema=new mongoose.Schema({
//     firstName: {
//     type:String,
//     required:true,
//     },
//     lastName:{
//         type:String,
//     },
//     email:{
//         type:String,
//         required:true,
//         unique:true,
//     },
//     jobTitle:{
//         type: String,
//     },
//     gender:{
//         type:String,
//     }

// })

// const User = mongoose.model("User",userSchema)

// app.use((req,res,next)=>{
//     fs.appendFile('log.txt',`\n${Date.now()} : ${req.ip} : ${req.path}`,(err,data)=>{
//         next();
//     });
// });


//ROUTES
// app.get('/users', async (req,res)=>{
//     const allDbUsers=await User.find({});

//     const html =`
//     <ul>
//     ${allDbUsers.map(user=>`<li>${user.firstName}</li>`).join("")}
//     </ul>`;
//     return res.send(html);

// })
// app.get('/api/users', async (req,res)=>{
//     const allDbUsers=await User.find({});
    
//     return res.send(allDbUsers);


// });
// app.get("/api/users/:id",(req,res)=>{
    
//     const id=Number(req.params.id);
//     const user = users.find((user)=>user.id === id);
//     res.json(user);

// })

// app.post("/api/users", async (req, res)=>{
//     //create todo: create new user

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
//     return res.status(201).json({msg: "success"})
    
// })
// app.patch("/api/users:id", (req, res)=>{
//     //create tood: cedit user id
//     return res.json("status:pending");
//     return res.json({satus:"success"})

// })
// app.delete("/api/users/:id", async (req, res)=>{
//     await User.findIdByIdAndDelete(req.params.id)
    //create tood:delete user with thaat id
    // const id=Number(req.params.id);
    // const user=users.find(user=>{
    //     return user.id===id;
    // })

    // if(user){
    //     // create new array without the deleted user
    // const filteredUsers = users.filter(user => user.id !== id);

    // // update original array (because users is const)
    // users.length = 0;                 // clear array
    // users.push(...filteredUsers);     // refill with filtered data

    //     fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{
    //     return res.json({status:"success", id:users.length});
    // })

    // }
    // else{
    //     return res.json({status:"not find"})
    // }


//})

// app.use("/user",userRouter);

// app.listen(PORT, ()=>console.log(`Server startd at port ${8000}`));

// const express = require("express");
// const app=express();

// const data=require("./Books.json");
// app.get("/books",(req,res)=>{
//     const html=`
//     <ul>
//     ${data.map(book=>`<li>${book.name}.</li>`).join("")}
//     </ul>
//     `
//     res.send(html);

// });

// app.get("/books/:id",(req,res)=>{
//     const id=Number(req.params.id);
//     const book=data.find(book=>(book.id===id));
//     //res.json(book);
//     const html=`Available -> ${book.name}`;
//     res.send(html);

// });



// app.listen(8000)



//===========>last update
// const express=require("express");
// const{logReqRes}=require("./middlewares");

// const fs=require("fs");
// const {connentMongoDb}=require("./connection");

// const app=express();
// app.use(express.urlencoded({extended: false}));
// app.use(logReqRes("log.txt"));
// const PORT=8000;
// connentMongoDb("mongodb://127.0.0.1:27017/youtube-app-1").then(()=>{
//     console.log("Mongodb connected!")
// })

// const userRouter=require("./routes/user");

// app.use("/user",userRouter);

// app.listen(PORT, ()=>console.log(`Server startd at port ${8000}`));
const express = require("express");
const {logReqRes} = require("./middlewares");
const {connectMongoDb} = require("./connection");

const userRouter = require("./routes/user");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(logReqRes("log.txt"));

app.use(express.static("public"));

const PORT = 8000;

connectMongoDb("mongodb://127.0.0.1:27017/youtube-app-1")
.then(()=>console.log("MongoDB connected"))
.catch((err)=>console.log("MongoDB connection error:", err));

app.use("/user", userRouter);

app.listen(PORT, ()=>console.log(`Server started at port ${PORT}`));