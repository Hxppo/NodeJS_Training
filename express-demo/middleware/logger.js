function log(req, res, next) {
    console.log('Logging..');
    next();
}

function authenticate(req, res, next) {
    console.log('Authenticaing..');
    next();
}

module.exports.log = log;
module.exports.authenticate = authenticate;


