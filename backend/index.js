import express from "express";
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";
import commentRouter from "./routes/comment.route.js";
import connectDB from "./lib/connectDb.js";
import webhookRouter from "./routes/webhook.route.js";
import { clerkMiddleware, requireAuth } from "@clerk/express";
import cors from "cors";

const app = express();
app.use(cors(process.env.CLIENT_URL));
app.use(clerkMiddleware());

//use body parser middleware
app.use("/webhooks", webhookRouter);

//use json middleware
app.use(express.json());

// allow cross-origin requests
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// app.get("/authState", (req, res) => {
//   const authState = req.auth;
//   res.json(authState);
// });

// app.get("/protected", (req, res) => {
//   const userId = req.auth.userId;
//   if(!userId) {
//     return res.status(401).send("Unauthorized");
//   }
//     res.send("Protected route");
// });

app.get("/protected", requireAuth(), (req, res) => {
  const userId = req.auth.userId;
  if (!userId) {
    return res.status(401).send("Unauthorized");
  }
  res.send("Protected route");
});

app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);

// global error handler

// app.use((error, req, res, next) => {
//   res.status(error.status || 500);
//   res.json({
//     message: error.message || "An unknown error occurred!",
//     status: error.status,
//     stack: error.stack,
//   });
// });

app.listen(3000, () => {
  connectDB();
  console.log("Server is running on port 3000");
});
