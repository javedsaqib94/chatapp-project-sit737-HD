const mongoose = require("mongoose");

const chatroomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: "Name is Required!",
    },
});

module.exports = mongoose.model("Chatroom", chatroomSchema);