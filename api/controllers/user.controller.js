import prisma from "../lib/prisma.js" 

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
    const body = req.body;
    

    if (id !== tokenUserId) {
        return res.status(403).json({message:" Not authorized! "})
    }
    try {
        const updatedUser = await prisma.user.update({
        where:{id: id},
        data: body})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "failed to update user"})
    }
}

export const deleteUser = async(req, res) =>{
    try {
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "failed to delete user"})
    }
}