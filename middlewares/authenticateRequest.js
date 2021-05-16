let jwt = require('jsonwebtoken');
require('dotenv').config();

class AuthenticateRequest {
  static authenticate(authoriseRole = '', isMandatory) {
    return async function (req, res, next) {
      let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
      if (token && token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
      }
      if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
          if (err) {
            return res.status(401).json({
              statusCode: 401,
              message: 'Invalid session, please login again'
            });
          } else {
            authoriseRole = typeof authoriseRole === 'string' ? authoriseRole.replace(/ /, '').split(',') : authoriseRole;
            let validRole = true;
            if (authoriseRole && authoriseRole.length > 0 && decoded.role != 1) {
              if (authoriseRole.indexOf('' + decoded.role) === -1) {
                validRole = false;
              }
            }
            // if (!validRole && !isMandatory) {
            //   return res.status(401).json({
            //     statusCode: 401,
            //     message: 'You are not authorised to access requested resource! Please contact administrator'
            //   });
            // }
            // let userInfo = await userModel.findOne({
            //   email: decoded.email
            // });
            // if (userInfo) {
            // req.headers.decoded = decoded;
            req.user = decoded;
            next();
            // } else {
            //   return res.status(401).json({
            //     statusCode: 401,
            //     message: 'Token is not valid'
            //   });
            // }
          }
        });
      } else {
        return res.status(401).json({
          statusCode: 401,
          message: 'Auth token is not supplied'
        });
      }
    };
  }
}

module.exports = AuthenticateRequest;
