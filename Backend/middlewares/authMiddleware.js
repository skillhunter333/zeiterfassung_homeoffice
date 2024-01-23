const jwt = require('jsonwebtoken');
const UserCollection = require('../models/userSchema');
const ErrorStatus = require('../utils/errorStatus');

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token 
        if (!token) throw new ErrorStatus('Kein Token', 401);

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await UserCollection.findById(decoded._id);
        if (!user) throw new ErrorStatus('Authentifizierung fehlgeschlagen', 401);

        req.user = user;
        next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).send('Ungültiger Token');
        }
        next(error);
    }
};

module.exports = { isAuthenticated };

