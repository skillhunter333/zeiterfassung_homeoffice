require('dotenv').config()
const mongoose = require('mongoose');

async function connectDB() {
      try {
          await mongoose.connect(process.env.MONGODB_URI);
          return console.log('Datenbankverbindung erfolgreich')
      } catch (error){
          console.log('Fehler bei der Verbindung zur Datenbank')
          console.log(error)
      }
    }

module.exports = connectDB
