const express = require('express');
const app = express();
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const bodyParser = require('body-parser');
const UserModel = require("./Models/User");
const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter');

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
require('dotenv').config();
require('./Models/db');
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(cors());
app.use('/auth', AuthRouter);
app.use('/data', ProductRouter);

app.use(express.static("public"));
app.use(express.static("node_modules"));


app.get('/ping', (req, res) => {
    res.send('PONG');
});

  

  app.get("/reset-password/:id/:token", async (req, res) => {
    const { id, token } = req.params;
    console.log(req.params);
    const oldUser = await UserModel.findOne({ _id: id });
    if (!oldUser) {
      return res.json({ status: "User Not Exists!!" });
    }
    const secret = process.env.JWT_SECRET + oldUser.password;
    try {
      const verify = jwt.verify(token, secret);
      res.render("index", { email: verify.email, status: "Not Verified" });
    } catch (error) {
      console.log(error);
      res.send("Not Verified");
    }
  });
  
  app.post("/reset-password/:id/:token", async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;
  
    const oldUser = await UserModel.findOne({ _id: id });
    if (!oldUser) {
      return res.json({ status: "User Not Exists!!" });
    }
    const secret = process.env.JWT_SECRET + oldUser.password;
    try {
      const verify = jwt.verify(token, secret);
      const encryptedPassword = await bcrypt.hash(password, 10);
      await UserModel.updateOne(
        {
          _id: id,
        },
        {
          $set: {
            password: encryptedPassword,
          },
        }
      );
  
      res.render("index", { email: verify.email, status: "verified" });
    } catch (error) {
      console.log(error);
      res.json({ status: "Something Went Wrong" });
    }
  });

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})