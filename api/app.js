import express from "express";
import cookieParser from "cookie-parser";
import postRoute from "./routes/post.route.js";
import authRoute from "./routes/auth.route.js";

const app = express().use(express.json());
app.use(cookieParser());

// app.use(express.json())

app.use("/api/posts", postRoute);
app.use("/api/auth", authRoute);
// app.use("/api/auth/register", (req, res) =>{
//     res.send("Welcome")
// })

app.use("/api/posts/id", (req, res) => {
  res.send("auth works");
});
app.listen(8800, () => {
  console.log("server is running");
});
