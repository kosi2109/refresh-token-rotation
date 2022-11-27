const allowOrigins = require('./allowOrigins');

const corsOptions = {
    origin : (origin, callback) => {
        if (allowOrigins.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error('Not Allow By Cors'))
        }
    },
    optionsSuccessStatus : 200
}

module.exports = corsOptions;