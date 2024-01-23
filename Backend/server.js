const express = require('express');
const Router = require('./routes/routes.js'); 
const connectDB = require('./db/connectDB.js');
const cookieParser = require('cookie-parser');
const app = express();
const port = process.env.PORT || 3000;

connectDB();

app.use(express.json());
app.use(cookieParser());

app.use('/', Router);

const server = app.listen(port, () => {
  console.log(`Server läuft auf Port ${port}`);
});
