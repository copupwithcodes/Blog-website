const  User =  require('../models/User');
const bcrypt = require("bcryptjs");
const getAllUser = async(req,res,next)=>{
        try {
        const users = await User.find();
        if (!users.length) {
          return res.status(404).json({ message: "No users found" });
        }
        return res.status(200).json({ users });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server Error" });
      }
};

const signUp = async(req,res,next)=>{
   const {name, email, password} = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({message: "Invalid request body"});
    }
    let existingUser;
    try{
        existingUser = await User.findOne({email});
    }catch{
        return console.log(err);
    }
    if(existingUser){
        return res.status(400).json({message: "User Already Exists"});
    }
    const hashedPassword = bcrypt.hashSync(password);
    const user = new User({
        name ,
        email ,
        password : hashedPassword,
        blogs : []
    })
    
    try{
       await user.save();
    }catch(err){
        return console.log(err);
    }
    return res.status(201).json({user});
}
const login = async(req,res,next)=>{
    const {email, password} = req.body;
    if (!email || !password) {
        return res.status(400).json({message: "Invalid request body"});
    }
    let existingUser;
    try{
        existingUser = await User.findOne({email});
    }catch{
        return console.log(err);
    }
    if(!existingUser){
        return res.status(404).json({message: "Couldn't find user by this ID"});
    }
    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
    if(!isPasswordCorrect){
        res.status(400).json({message: "Incorrect Password"})
    }
    return res.status(200).json({message: "Login Successfull"})
    
}

module.exports  = {
    getAllUser,
    signUp,
    login
}
