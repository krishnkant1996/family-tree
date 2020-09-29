let _ = require('lodash');

exports.ResponseMsg = (code='DEFAULT', lang='en') => {
    let msgFile = _.defaults(require('./'+lang+'.json'));
    return msgFile[code]
}