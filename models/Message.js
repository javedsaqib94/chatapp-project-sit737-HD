const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    chatroom: {
        type: mongoose.Schema.Types.ObjectId ,
        required: "Chatroom is Required!",
        ref: "Chatroom",
    },
    user: {
        type: mongoose.Schema.Types.ObjectId ,
        required: "Chatroom is Required!",
        ref: "User",
    },
    message:{
        type: String,
        required: "Message is Required!",
    },
});

module.exports = mongoose.model("Message", messageSchema);