import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* Register User */
export const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation,
        } = req.body;

        /* Password encryptation */
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000),
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser); // So the frontend receives the response
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}

/* Loggin User */
export const login = async (req, res) => {
    try {

        const { email, password } = req.body;
        const user = await User.findOne({ email: email });

        if (!user) return res.status(400).json({ msg: "User does not exist" });

        const userFound = await bcrypt.compare(password, user.password);

        if (!userFound) return res.status(400).json({ msg: "Invalid credentials" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET); // token used for verification
        delete user.password;
        res.status(200).json({ token, user });

    } catch {
        res.status(500).json({ error: err.message });
    }
}