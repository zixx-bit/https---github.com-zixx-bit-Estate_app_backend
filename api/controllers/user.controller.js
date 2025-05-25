import prisma from "../lib/prisma.js" 
import bcrypt from "bcrypt";

export const getUsers = async(req, res)=>{
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users)
        // const users = await prisma.user.findMany
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "failed to get user"})
    }
}

export const getUser = async (req, res) =>{
    // get id from parameters
    const id = req.params.id;
    try {
        const user =await prisma.user.findUnique({
            where: {id:id}
       })
       res.status(200).json(user);
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "failed to get user"})
    }
}

export const updateUser = async(req, res) =>{
    const id = req.params.id;
    const tokenUserId = req.userId;
    const {password, avatar, username, email, ...inputs} = req.body;   

    if ( username==null) {
        return res.status(403).json({message:"username cannot be null"});
    } 

    if (id !== tokenUserId) {
        return res.status(403).json({message:" Not authorized! "})
    }
    let updatedPassword = null;
    try {
        if (password) {
            updatedPassword = await bcrypt.hash(password, 10);
        }
        const updatedUser = await prisma.user.update({
        where:{id: id},
        data: {
            ...inputs,
            ...(username &&{username}),
            ...(email &&{email}),
            ...(updatedPassword && {password: updatedPassword}),
            ...(avatar &&{avatar} )
        
        },
    
    })   
       const {password: userPassword, ...restOfData} = updatedUser    
        res.status(200).json(restOfData)
        // console.log(res.data);
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "failed to update user"})
    }
}

export const deleteUser = async(req, res) =>{
    const id= req.params.id;
    const tokenUserId = req.userId;
    if (id !== tokenUserId) {
        return res.status(403).json({message: "Not authorized"});
    }
    try {
        await prisma.user.delete({
            where: {id:id},
        });
        res.status(200).json({message: "User deleted"});
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "failed to delete user"})
    }
}