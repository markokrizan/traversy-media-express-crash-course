const moment = require('moment');

//middleware example:
//runs uppon every request - like request filter in spring
const logger = (req, res, next) => {
    //log every hit url with the time from moment.js
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl} : ${moment().format()}`);
    next();
}

module.exports = logger;