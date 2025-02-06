import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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
      where: { username: username },
    });
    // Check if user exists
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }
    // Check if password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }
    //Generate token to send to the user
    // const token = jwt.sign({
    //   id:user.id,
    // }, process.env.).

    const age = 1000 * 60 * 60 * 24 * 7;

    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: age
      }
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: age,
      })
      .status(200)
      .json({ message: "Login successful" });
    // res.setHeader("Set-Cookie", "test=" + "myValue").json("success");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Login failed!" });
  }

  // db operations
};
export const logout = (req, res) => {
  // db operations
};
