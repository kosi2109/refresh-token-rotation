const jwt = require('jsonwebtoken');


const veryfyJWT = (req,res,next) => {
    const header = req.headers['authorization'];
    if (!header) return res.sendStatus(401);

    const token = header.split(' ')[1];

    jwt.verify(
        token,
        'access secret',
        (err, decoded) => {
            if (err) return res.sendStatus(403);

            req.user = decoded.username;
            next();
        }
    )
}


module.exports = veryfyJWT;