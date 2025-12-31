  import express from 'express';
  import "dotenv/config";
  import cors from 'cors';
  import http from 'http';
  import  connectDB  from './lib/db.js';
  import userRouter from './routes/userRoutes.js';
  import messageRouter from './routes/messageRoutes.js';
  import { Server } from "socket.io";


  const app = express();
  const server = http.createServer(app);

 
  export const io = new Server(server, {
    cors: {
    
      origin: [
        "http://localhost:5173", 
        "https://chat-app-client-6wl7.onrender.com" 
      ],
      credentials: true
    },
  });

  
  export const userSocketMap = {}; 

  export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
  };

  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    console.log("User connected", userId);

    if (userId) userSocketMap[userId] = socket.id;

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
      console.log("User Disconnected", userId);
      delete userSocketMap[userId];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
  });

  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ limit: "10mb", extended: true }));

  
  const allowedOrigins = [
    'http://localhost:5173', 
    'https://chat-app-client-6wl7.onrender.com' 
  ];

  app.use(cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true
  }));



  
  app.use("/api/status", (req, res) => res.send("server is live"));
  app.use("/api/auth", userRouter);
  app.use("/api/messages", messageRouter);


 
  await connectDB();

  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => console.log("Server is running on port: " + PORT));

  export default server;