const express = require('express');
const db = require('./utils/db');
const cors = require('cors');
const bodyparser = require('body-parser');
const { validate } = require('./middelwares/validate');
const session = require('express-session'); 
const passport = require('passport');
require('dotenv').config();
const passportConfig = require('./config/passport'); 
const app = express();

app.use(cors({
   origin: ['http://localhost:5173', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true 
}));


app.use(session({ 
  secret: process.env.SECRET_KEY,
  resave: false, 
  saveUninitialized: true 
}));

app.use(passport.initialize());
app.use(passport.session());

passportConfig(passport);

app.use(bodyparser.json());

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);

const userRoutes = require('./routes/userRoutes');
app.use('/user', validate, userRoutes);


const adminRoutes = require('./routes/adminRoutes');
app.use('/admin', validate, adminRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});