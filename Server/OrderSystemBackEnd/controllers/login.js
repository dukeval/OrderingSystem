const User = require('../models/User');


exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        
        //validate password
        if (!user.comparePassword(password)) return res.status(401).json({message: 'Invalid username or password'});
  
        res.status(200).json(user.generateJWT());
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};

exports.register = async (req, res) => {
    try {
        debugger
      const { email } = req.body;
      const {username }= req.body;
  
      // Make sure this account doesn't already exist by check both the email and username
      const emailAdd = await User.find({email });
      const userId = await User.find({username: username });
  
      if (emailAdd.length>0 || userId.length>0 ) 
        return res.status(401).json({ message: 'The email address or username you have entered is already associated with another account.' });
  
      const newUser = new User({ ...req.body });
      const userProfile = await newUser.save();
  
      res.send(userProfile)
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
  }