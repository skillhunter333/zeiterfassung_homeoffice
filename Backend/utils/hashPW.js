const bcrypt = require('bcrypt');

async function hashPassword() {
  const plaintextpw = ''; 

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(plaintextpw, salt);

    console.log('Gehashtes Passwort:', hashedPassword);
  } catch (error) {
    console.error('Fehler beim Hashen des Passworts:', error);
  }
}

hashPassword();
