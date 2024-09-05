import UserModel from "../models/Auth.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); // Ensure this line is present to load environment variables from a .env file

// Register Functionality
const Register = async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        if (!userName || !email || !password) {
            return res.status(400).json({ success: false, message: "All Fields Are Required" });
        }

        // Check if user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ success: false, message: "Email already exists" });
        }

        // Create a new user
        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = new UserModel({
            userName, email, password: hashedPassword
        });

        // Save the new user
        await newUser.save();

        return res.status(201).json({ success: true, message: "User registered successfully", user: newUser });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
};

// Login Functionality
const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const checkUser = await UserModel.findOne({ email });
        if (!checkUser) {
            return res.status(404).json({ success: false, message: "User Not Found Please Register" });
        }
        const isMatch = bcrypt.compareSync(password, checkUser.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Username & Password Is Invalid" });
        }
        const token = jwt.sign({ userId: checkUser._id }, process.env.SECRETKEY, { expiresIn: '1h' });
        res.cookie("token" , token,{
            httpOnly : true,
            secure : false,
            maxAge: 3 * 24 * 3600 * 1000
        })
        
        // res.setHeader('Authorization', `Bearer ${token}`);
        res.status(200).json({ success: true, message: "Login Successfully", User:checkUser ,token });
    } catch (error) {
        // console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
}

const Logout = async(req,res)=>{
    try {
        res.clearCookie('token')
        res.status(200).json({ success: true, message: "User Logout Successfully"});
    } catch (error) {
        // console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
}

export { Register, Login , Logout };
