/*
* Route for token
* v1.0
*  2018-11-1
@C 2018, Prakash Rai
*/

const express = require('express');

module.exports = function(handler){
  const router = express.Router();

  /********* GET token. *********/
  router.post('/', handler.tokenHandler);

  router.get('/test', handler.ensureTokenHandler, handler.authorizationHandler, (req, res, next) => {
    res.send("Authorized");
  });

  return router;
}