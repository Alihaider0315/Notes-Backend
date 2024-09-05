// import jwt from 'jsonwebtoken'
// import UserModel from '../models/Auth.js';

// const VerificationToken  = async (req,res,next)=>{
//     try {
//       const token = req.cookies.token
//       if(!token){
//         return res.status(303).json({sucess:false,message:"Unauthorized, Please Login"});
        
//       }
//       const decode = await jwt.decode(token,process.env.SECRETKEY);
//       const userDecode = await UserModel.findById(decode.userId)
//       if(!userDecode){
//         return res.status(404).json({sucess:false,message:"User Not Found"});
        
//       }
//       req.userId = userDecode._id
//       next()
//     //   console.log(userDecode)
//     } catch (error) {
//         res.status(500).json({sucess:false,message:"Internal Server Error"})
//     }
// }

// export {VerificationToken}

import jwt from 'jsonwebtoken';
import UserModel from '../models/Auth.js';

const VerificationToken = async (req, res, next) => {
    try {
        // Extract the token from the Authorization header
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, message: "Unauthorized, Please Login" });
        }

        // Remove 'Bearer ' prefix and get the actual token
        const token = authHeader.split(' ')[1];

        // Verify and decode the token
        let decode;
        try {
            decode = jwt.verify(token, process.env.SECRETKEY);
        } catch (err) {
            return res.status(401).json({ success: false, message: "Invalid or expired token" });
        }

        const userDecode = await UserModel.findById(decode.userId);

        if (!userDecode) {
            return res.status(404).json({ success: false, message: "User Not Found" });
        }

        // Attach user ID to the request object
        req.userId = userDecode._id;
        next();
    } catch (error) {
        console.error('Verification error:', error);  // Log error for debugging
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export { VerificationToken };