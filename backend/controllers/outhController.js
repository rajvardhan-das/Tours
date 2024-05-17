// authMiddleware.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Middleware to handle user registration
export const registerMiddleware = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
            photo: req.body.photo
        });

        await newUser.save();
        req.user = newUser; // Passing the created user to the next middleware
        next(); // Pass control to the next middleware
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to create" });
    }
};

// Middleware to handle user login
export const loginMiddleware = async (req, res, next) => {
    const email = req.body.email;
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const checkPassword = await bcrypt.compare(req.body.password, user.password);
        if (!checkPassword) {
            return res.status(401).json({ success: false, message: "Wrong password" });
        }

        req.user = user; // Passing the logged-in user to the next middleware
        next(); // Pass control to the next middleware
    } catch (err) {
        return res.status(500).json({ success: false, message: "Failed to login" });
    }
};

// Middleware to generate JWT token
export const generateTokenMiddleware = (req, res) => {
    const { user } = req;
    const { password, role, ...rest } = user._doc;

    const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "15d" }
    );

    res.cookie('accessToken', token, {
        httpOnly: true,
        expires: token.expiresIn
    }).status(200).json({ success: true, message: "Successfully logged in", data: { token, ...rest, role } });
};
