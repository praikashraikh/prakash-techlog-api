/*
* Schema for Post
* v1.0
*  2018-11-1
@C 2018, Prakash Rai
*/

const express = require('express');

module.exports = function(handler, authHandler){
  const router = express.Router();

  /********* GET posts listing. *********/
  router.get('/', authHandler.ensureTokenHandler, authHandler.authorizationHandler, handler.readHandler);

  /********* GET post by id ********/
  router.get('/:id', authHandler.ensureTokenHandler, authHandler.authorizationHandler, handler.readByIdHandler);

  /********** ADD new post *********/
  router.post('/', authHandler.ensureTokenHandler, authHandler.authorizationHandler, handler.createHandler);

  /********* UPDATE new post **********/
  router.put('/:id', authHandler.ensureTokenHandler, authHandler.authorizationHandler, handler.updateHandler);

  /********** DELETE new post ************/
  router.delete('/:id', authHandler.ensureTokenHandler, authHandler.authorizationHandler, handler.deleteHandler);

  return router;
};


