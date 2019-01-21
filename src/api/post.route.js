/*
* Schema for Post
* v1.0
*  2018-11-1
@C 2018, Prakash Rai
*/

const express = require('express');

module.exports = function(handler){
  const router = express.Router();

  /********* GET posts listing. *********/
  router.get('/', handler.readHandler);

  /********* GET post by id ********/
  router.get('/:id', handler.readByIdHandler);

  return router;
};


