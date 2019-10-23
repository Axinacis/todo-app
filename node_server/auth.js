const jwt = require('jsonwebtoken');
const User = require('./models/user');
// const fs = require('fs')

// const privateKEY  = fs.readFileSync('./private.key', 'utf8');
// const publicKEY  = fs.readFileSync('./public.key', 'utf8');

// const signOptions = {
//     expiresIn:  "12h",
//     algorithm:  "RS256"
// };

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.privateKEY);
        const user = await User.findOne({_id: decoded._id, 'tokens.token': token});

        if (!user) {
            throw new Error()
        }

        req.token = token;
        req.user = user;
        next()

    } catch (e) {
        res.status(401).send({error: 'Please authenticate'})
    }
};

module.exports = auth;