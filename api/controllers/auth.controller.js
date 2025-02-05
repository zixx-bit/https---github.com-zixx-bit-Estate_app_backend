import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";

export const register = async(req, res) =>{
    // destructure data 
    const {username, email, password} = req.body;
    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // console.log(hashedPassword);

    const newUser = await prisma.user.create({
        data: {
            username,
            email, 
            password: hashedPassword,
        }
    });
    console.log(newUser)
    res.status(201).json({message: "User created successfully"})
};
export const login = (req, res) =>{
    // db operations
};
export const logout = (req, res) =>{
    // db operations
};