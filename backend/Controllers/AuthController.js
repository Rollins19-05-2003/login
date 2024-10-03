const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require("../Models/User");
var nodemailer = require("nodemailer");

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409)
                .json({ message: 'User is already exist, you can login', success: false });
        }
        const userModel = new UserModel({ name, email, password });
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        res.status(201)
            .json({
                message: "Signup successfully",
                success: true
            })
    } catch (err) {
        res.status(500)
            .json({
                message: "Internal server errror",
                success: false
            })
    }
}


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        const errorMsg = 'Auth failed email or password is wrong';
        if (!user) {
            return res.status(403)
                .json({ message: errorMsg, success: false });
        }
        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(403)
                .json({ message: errorMsg, success: false });
        }

        // console.log("JWT_SECRET:", process.env.JWT_SECRET);
        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )

        res.status(200)
            .json({
                message: "Login Success",
                success: true,
                jwtToken,
                email,
                name: user.name
            })
    } catch (err) {
        res.status(500)
            .json({
                message: "Internal server errror",
                success: false
            })
    }
}

const reset = async (req, res) => {
    const { email } = req.body;
    try {
      const oldUser = await UserModel.findOne({ email });
      if (!oldUser) {
        return res.json({ status: "User Not Exists!!" });
      }
      const secret = process.env.JWT_SECRET + oldUser.password;
      const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
        expiresIn: "5m",
      });
      const link = `http://localhost:8080/reset-password/${oldUser._id}/${token}`;
      console.log(link);

   
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'sdeb7433@gmail.com',
          pass: 'awausrilzdsljvji'
        }
      });
      
      var mailOptions = {
        from: 'sdeb7433@gmail.com',
        to: 'sdev795001@gmail.com',
        subject: 'Password Reset',
        text: "Click the below link to set the Password. This link will expired in 5 minutes\n" + link
      };
      
    // Using async/await for better error handling
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);  

  } catch (error) {
    console.error("Error during password reset:", error);  
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
    signup,
    login,
    reset
}