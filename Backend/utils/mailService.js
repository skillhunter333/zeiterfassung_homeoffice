const nodemailer = require('nodemailer');
const dotenv = require("dotenv")
dotenv.config();

const sendStoptimeEmail = async (username, date) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PW
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'simon.risspy@gmail.com',
            subject: 'HomeOffice Arbeitszeit gestoppt',
            text: `Der Benutzer ${username} hat seine HomeOffice-Zeit am ${date.toLocaleDateString()} gestoppt`
        };

        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Fehler beim Senden der E-Mail:', error);
        
    }
};

module.exports = sendStoptimeEmail;
