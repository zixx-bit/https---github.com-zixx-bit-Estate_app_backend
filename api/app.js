import express from "express";
import cookieParser from "cookie-parser";
import postRoute from "./routes/post.route.js";
import authRoute from "./routes/auth.route.js";
import testRoute from "./routes/test.route.js";
import userRoute from "./routes/user.route.js";
import cors from "cors";


const app = express().use(express.json());
app.use(cookieParser());
app.use(cors({origin: process.env.CLIENT_URL, credentials: true}))
// app.use(express.json())

app.use("/api/posts", postRoute);
app.use("/api/auth", authRoute);
app.use("/api/test", testRoute); 
app.use("/api/users", userRoute)
// app.use("/api/auth/regist", (req, res) =>{
//     res.send("Welcome")
// })

app.use("/api/posts/id", (req, res) => {
  res.send("auth works");
});
app.listen(8800, () => {
  console.log("server is running");
});
