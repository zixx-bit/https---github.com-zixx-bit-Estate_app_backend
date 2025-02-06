import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
// REGISTER
export const register = async (req, res) => {
  // destructure data
  const { username, email, password } = req.body;
  try {
    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // console.log(hashedPassword);
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    console.log(newUser);
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    // console.log(error)
    res.status(500).json({ message: "Failed to create user! Try again." });
  }
};
// LOGIN
export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });
    // Check if user exists
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }
    // Check if password is correct 
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials!"});
    }
    //Generate token to send to user
  } catch (error) {
    console.log(error)
    res.status(500).json({message: "Login failed!"})
  } // db operations
};
export const logout = (req, res) => {
  // db operations
};
