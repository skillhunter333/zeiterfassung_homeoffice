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

       startHomeOffice: async (req, res) => {
        try {
            const userId = req.user._id; 
            const user = await UserCollection.findById(userId);

            // Prüfen ob letzter Arbeitszeitblock noch offen
            if (user.worktime.length > 0) {
                const lastBlock = user.worktime[user.worktime.length - 1];
                if (!lastBlock.end) {
                    return res.status(400).send('Es existiert bereits ein offener Arbeitszeitblock.');
                }
            }

            // Hinzufügen neuer Arbeitszeitblock
            user.worktime.push({ start: new Date() });
            await user.save();

            res.status(200).send('Arbeitszeit erfolgreich gestartet.');
        } catch (error) {
            res.status(500).send('Serverfehler beim Starten der Arbeitszeit.');
        }
    },
    
    //mailFunktion muss noch eingefügt werden

    stopHomeOffice: async (req, res) => {
        try {
            const userId = req.user._id;
            const user = await UserCollection.findById(userId);

            // Prüfen ob offener Arbeitszeitblock vorhanden 
            if (user.worktime.length === 0 || user.worktime[user.worktime.length - 1].end) {
                return res.status(400).send('Kein offener Arbeitszeitblock vorhanden.');
            }

            // Endzeitpunkt für aktuellen Arbeitszeitblock
            user.worktime[user.worktime.length - 1].end = new Date();
            await user.save();

            res.status(200).send('Arbeitszeit erfolgreich beendet.');
        } catch (error) {
            res.status(500).send('Serverfehler beim Beenden der Arbeitszeit.');
        }
    },
};

module.exports = userController;