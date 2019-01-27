/*
* Route for upload
* v1.0
*  2019-01-26
@C 2019, Prakash Rai
*/

const express = require('express');
const upload = require('../../service/file-upload.service')().upload();

module.exports = function(handler, authHandler){
  const router = express.Router();

  /********** ADD new file *********/
  router.post('/', authHandler.ensureTokenHandler, authHandler.authorizationHandler, function(req, res) {
    const singleUpload = upload.single('image');
    singleUpload(req, res, function(err) {
      if (err) {
        return res.status(422).send({errors: [{title: 'File Upload Error', detail: err.message}] });
      }
  
      return res.json({'imageUrl': req.file.location});
    });
  });

  return router;
};
