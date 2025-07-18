const userModel = require('../model/user');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();


module.exports = async(req, res, next)=>{
    // const token = req.cookies.token;
    const token = req.headers.authorization || req.cookies.token;
    // const token = req.cookies.token;
    // console.log(token)
    // console.log(`Backend geted token: ${token}`);
    // if(!req.headers.authorization) return res.status(401).json({message: "cookie not found (Backend Error)"}); // for production mode
    // console.log(`Backend geted token: ${req.headers.authorization}`);
    if(!token) return res.status(401).json({message: "token not found (Backend Error)"}); // for development mode

    try {
        // let decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET_KEY);
        // let decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET_KEY); // for production mode
        let decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // for development mode
        let user = await userModel.findOne({_id: decoded.id}).select('-password');
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({message: error.message, MyMessage: "isLoggedIn Failed"});
    }
}
