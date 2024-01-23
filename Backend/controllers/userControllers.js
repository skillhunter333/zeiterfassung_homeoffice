const dotenv = require("dotenv")
dotenv.config();
const UserCollection = require("../models/userSchema");
const ErrorStatus = require("../utils/errorStatus");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const userController = {
    
        login: async (req, res, next) => {
    
    try {
    const { username, password } = req.body;
    if (!username || !password) throw new ErrorStatus("Fehlender Benutzername oder Passwort", 400);
    const foundUser = await UserCollection.findOne({ username }).select(
      "+password"
    );
    if (!foundUser) throw new ErrorStatus("Benutzer nicht gefunden", 404);

    const compare = await bcrypt.compare(password, foundUser.password);
    if (!compare) throw new ErrorStatus("Passwort stimmt nicht überein", 401);

    const token = jwt.sign({ _id: foundUser._id }, process.env.JWT_SECRET, { expiresIn: '12h' });
    

    return res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 12, //Cookie verfällt nach 12h 
        sameSite: "none",
        secure: true,
      })
      .sendStatus(200);
  } catch (error) {
    next(error);
  }
    },
};

module.exports = userController;