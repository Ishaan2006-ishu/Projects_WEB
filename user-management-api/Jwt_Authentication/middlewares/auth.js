const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "secret123";

function verifyToken(req,res,next){

    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).json({msg:"No token provided"});
    }

    // support both "Bearer <token>" and raw token
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : authHeader;

    try{

        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;

        next();

    }catch(err){

        return res.status(401).json({msg:"Invalid token"});
    }

}

module.exports = verifyToken;