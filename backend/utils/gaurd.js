let jwt = require('jsonwebtoken');
let responses = require('./responses')


module.exports.verifyToken = (ResourceID) => async(req, res, next) => {
    try{
        const verify = jwt.verify(req.headers.token, process.env.JWT_SECRET);
        if(verify) {
            req.user = verify;
        }
        return responses.response(res, false, {}, 'en', 'UNAUTHORIZED USER', HTTP_STATUS.UNAUTHORIZED)
    } catch {
        return responses.response(res, false, {}, 'en', 'UNAUTHORIZED USER', HTTP_STATUS.UNAUTHORIZED)
    }
}

module.exports.createJWTToken = (payload) => {
    let token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn : process.env.JWT_EXPIRE });
    return token;
}

module.exports.createEmailVerificationToken = (payload) => {
    let token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn : process.env.EMAIL_VERIFICATION_EXPIRE_IN });
    let issueAt = jwt.decode(token);
    return {token:token, issueAt: issueAt.iat};
}

module.exports.verifyEmailToken = (token) => {
    try{
        let verify = jwt.verify(token, process.env.JWT_SECRET);
        if(verify) {
            let decoded = jwt.decode(token);
            return {success: true, decode:decoded};
        }
        return {success: false, decode:decoded};
    } catch {
        return { success: false }
    }
}

