const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust path as needed
const bcrypt = require('bcryptjs');
require('dotenv').config();

class AuthController {

    async signup(req, res) {
        try {
            const { name, email, password } = req.body.data;
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({ name, email, password: hashedPassword });

            const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, {
                expiresIn: '7d',
            });

            res.cookie('token', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });

            res.status(200).json({ user: { id: user._id, name: user.name, email: user.email } });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Server error' });
        }
    }

    
    async login(req, res) {
        try {
            const { email, password } = req.body;
            
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, {
                expiresIn: '7d',
            });

            res.cookie('token', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });

            res.status(200).json({ user: { id: user._id, name: user.name, email: user.email } });
        } catch (err) {
            res.status(500).json({ message: 'Server error' });
        }
    }
}

module.exports = new AuthController();