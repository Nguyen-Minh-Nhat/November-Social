require("dotenv").config();
const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const connectDB = require("./configs");
const bodyParser = require("body-parser");
const SocketServer = require("./socketServer");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");
const commentRouter = require("./routes/comment");
const userRouter = require("./routes/user");
const chatRouter = require("./routes/chat");
const { Server } = require("socket.io");
const cookieParser = require("cookie-parser");
const corsOptions = {
  origin: true, //included origin as true
  credentials: true, //included credentials as true
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
  }),
);
app.use(bodyParser.urlencoded({ extended: true }));

// Socket
const http = require("http").createServer(app);
const io = new Server(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  SocketServer(socket);
});

connectDB();

app.use("/api/auth", authRouter);
app.use("/api/post", postRouter);
app.use("/api/comment", commentRouter);
app.use("/api/user", userRouter);
app.use("/api/chat", chatRouter);

http.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
  console.log("-------------------------------");
});
