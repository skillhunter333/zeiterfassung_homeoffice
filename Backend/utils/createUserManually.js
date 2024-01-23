require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const UserCollection = require('../models/userSchema');

//Zuerst muss das zu speichernde PW mittels hashPW.js ermittelt werden, da in DB keine plaintext Passwörter

async function createUser() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Datenbankverbindung erfolgreich');

        const newUser = new UserCollection({
            username: 'Neo1999',
            password: '$2b$10$8KqlyUti7cAhnbdHQYkgTu1xvmjyWUqamm01A6R/xMHm6/Ob4JeJ6',
            firstName: 'Thomas',
            lastName: 'Anderson',
        });

        await newUser.save();
        console.log('Benutzer erfolgreich erstellt');
    } catch (error) {
        console.error('Fehler beim Erstellen des Benutzers oder der Datenbankverbindung:', error);
    } finally {
        await mongoose.disconnect();
    }
}

createUser();
