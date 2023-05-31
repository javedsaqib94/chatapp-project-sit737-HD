const mongoose =  require("mongoose");
const Chatroom = mongoose.model("Chatroom");



exports.createChatroom = async  (req, res ) => {
    const {name} =  req.body;

    const nameRegex = /^[A-Za-z\s]+$/;

    if(!nameRegex.test(name)) throw "chatroom can containe only Alphabets.    ";

    const chatroonExists =  await Chatroom.findOne({name});
    if(chatroonExists) throw "Chatroom with that name already exists"
    const chatroom = new Chatroom({
        name,
    });
    await chatroom.save();
    res.json({
        message : "Chatroom Created !!!"
    });

};

exports.getAllChatrooms = async (req, res) => {
    const chatrooms = await Chatroom.find({});
    res.json(chatrooms);
}