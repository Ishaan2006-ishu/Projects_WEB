// const express=require("express");
// const {handleGetAllUsers,handleGetUserById,
//     handleDeleteUserById,handleCreateNewUser
// } = require('../controller/user')
// const router=express.Router();


// router.route("./").get(handleGetAllUsers)
//                   .post(handleCreateNewUser);
// router.route("/:id").get(handleGetUserById)
//                     .delete(handleDeleteUserById);
// module.export=router;

const express = require("express");
const verifyToken = require("../middlewares/auth");

const {
handleGetAllUsers,
handleGetUserById,
handleDeleteUserById,
handleCreateNewUser,
handleRegister,
handleLogin
} = require("../controllers/user");

const router = express.Router();

router.post("/register", handleRegister);
router.post("/login", handleLogin);

router.route("/")
.get(verifyToken, handleGetAllUsers)
.post(handleCreateNewUser);

router.route("/:id")
.get(handleGetUserById)
.delete(handleDeleteUserById);

module.exports = router;