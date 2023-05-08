const jwt = require("jsonwebtoken");
require('dotenv').config()

const generateToken = (id) => {
    return jwt.sign({ id }, `${ process.env.JWT_SEED }`, { expiresIn: `${ process.env.JWT_EXPIRES_TIME }` });
}

const verifyToken = (req, res) => {
    if( !req.headers.authorization || !req.headers.authorization.startsWith('Bearer') || !req.headers.authorization.split(' ')[2]) {
        res.status(422).json({
            message: "Please provide the token",
        });
    }
    try {
        const theToken = req.headers.authorization.split(' ')[2];
        const decoded = jwt.verify(theToken, process.env.JWT_SEED);
        if (decoded.id) {
            return {
                tokenValid: true,
                userTokenId: decoded.id
            };
        } else {
            return {
                tokenValid: false,
                userTokenId: 0
            };
        }
    } catch (err) {
        res.status(422).json({
            message: "Please provide the token",
        });
        return {
            tokenValid: false,
            userTokenId: 0
        };
    }
};

module.exports = { 
    verifyToken,
    generateToken
}