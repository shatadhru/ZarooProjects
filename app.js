const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const cors = require("cors")
const connectDb = require("./Database/MongodbConnection");
const path = require("path");




// All Routes 
const AuthenticationRoutes = require("./routes/Authentications Handaler/Authentications");
const AiRoutes = require("./routes/AiRoutesHandaler/TourCreationRoutes");
const BookingRoutes = require("./routes/Booking/Booking");

// All Routes End


// Cors Setup

var corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://ai.zaroo.co",
    "https://server.zaroo.co",
    "https://zaroo.co",
    "https://www.zaroo.co",
   
  ]
}

app.use(cors(corsOptions));

// Cors Setup End


// All Models

const User = require("./models/AuthenticationMOdel");

// All Models End

// Express JSON 
app.use(express.json());

// Mongodb Connection
 connectDb();

// Socket Connections 

const { Server } = require("socket.io");
const { connections } = require("mongoose");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  console.log("Socket Connected");

  socket.on("message", (data) => {
    console.log(data);
  });

  socket.on("cheak-username", async (username) => {
    console.log(username);

    const user = User.findOne({username : username });
    
    if(user){

      socket.emit("user-available" , user.username)

    }




  });
});


// Socket Connections End





app.use("/auth", AuthenticationRoutes);
app.use("/api", AiRoutes);
app.use("/api", BookingRoutes);

module.exports = server ;

