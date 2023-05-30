const mongoose =  require("mongoose");
const User =  mongoose.model("User");
const sha256 =  require("js-sha256");
const jwt =  require("jwt-then");

exports.register = async (req, res) =>{
    const {name, email, password} = req.body;
    
    

    const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|deakin\.edu\.au)$/;
    
   
   
    if (!emailRegex.test(email))  throw "Email is not supported from that domain. ";
    if(password.length < 6) throw "Password must be atleast 6 character long.";

    const userExists = await User.findOne({
        email, 
    });
    
    if (userExists) throw "Email with same Email address already Exists.";
    const user = new User({
        name, 
        email,
        password: sha256(password + process.env.SALT ),
    });


    await user.save();

    res.json({
        message : "User [" + name +"] Registered Successfully!",
    });

};

exports.login = async (req, res) =>{
    const {email , password} = req.body;
    const user = await User.findOne({
        email, 
        password : sha256(password + process.env.SALT )
    });
    
    if (!user) throw "Email and Password did not Match.";

    const token = await jwt.sign({id : user.id}, process.env.SECRET);
    res.json({
        message : "User Logged in Successfully!",
        token,
    });
};