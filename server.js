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

app.listen(8000, ()=> {
    console.log("server  listening on port  8000");
})