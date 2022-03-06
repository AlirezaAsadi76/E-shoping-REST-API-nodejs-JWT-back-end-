const Jwt = require('jsonwebtoken');
const User = require('../model/User');
async function verifyToken(req, res, next) {
    const token = req.headers.token;
    if (!token) {
        return res.status(401).json({ message: "you are not authenticated" });
    }
    try {
        const decode = Jwt.verify(token, process.env.JWT_KEY);
        const user = await User.findById(decode.id);
        if(!user) {
            return res.status(403).json({ message: "you are not authenticated" });
        }
        
        req.user = user;
    } catch (err) {
        return res.status(400).json({ message: "invalid token" });
    }
    next();
}
async function verfiTokenAndAuth(req, res, next) {
    verifyToken(req, res, () => {
        if(req.user._id==req.params.id || req.user.isAdmin)
        {
            next();
        }
        else
        {
            res.status(403).json({ message: "you are not allow" });
        }
    });
}
async function verfiTokenAndAdmin(req, res, next) {
    verifyToken(req, res, () => {
        if( req.user.isAdmin)
        {
            next();
        }
        else
        {
            res.status(403).json({ message: "you are not allow" });
        }
    });
}
module.exports={verifyToken,verfiTokenAndAuth,verfiTokenAndAdmin}