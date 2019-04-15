'use strict'
module.exports = function({cookieName, maxAge, defaultHost, isWildcard = true}) {
    return (req, res, next) => {
      let cookieValue = req.cookies[cookieName];
      if (cookieValue === undefined || cookieValue === null) {
        cookieValue = require('uuid/v4')();
      }
      const host = defaultHost || req.headers.host;
      res.cookie(cookieName || host, cookieValue, { maxAge: maxAge, httpOnly: true, domain: (isWildcard ? '.' : '') + host });
      next();
    };
}