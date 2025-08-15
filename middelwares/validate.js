const jwt = require('jsonwebtoken');

function validate(req, res, next) {
    const cookie = req.headers.cookie.split("token=");
    const token = cookie[1];

    

    if (!token) {
        return res.status(401).json({ message: 'No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token.' });
    }
}

module.exports = {validate};