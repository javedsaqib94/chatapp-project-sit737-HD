require('dotenv').config();


const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});
mongoose.connection.on('error', (err) => {
    console.log("mongoose connection error: " + err.message);
    
});

mongoose.connection.once('open', () => {
    console.log("MongoDB connected!");
});


//bringing all the models
require("./models/Chatrooms");
require("./models/User");
require("./models/Message");


const app = require('./app' );



const server = app.listen(8000, ()=> {
    console.log("server  listening on port  8000");
});


const io = require('socket.io')(server);
const jwt= require('jwt-then');
io.use(async (socket,next) => {
    try {       
        const token = socket.handshake.query.token; 
        
        const payload = await jwt.verify(token, process.env.SECRET);
        socket.userId = payload.id;
        next();
    } catch (err) {
        
    }
});

io.on('connection', (socket) =>{
    console.log("connected" + socket.userId);
    
    socket.on("disconnec" , () =>{
        console.log("Disconnected" + socket.userId);
    });
});