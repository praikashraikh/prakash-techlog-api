/*
* Handler class for post
* v1.0
*  2018-11-1
@C 2018, Prakash Rai
*/

module.exports = function(uploadService){

    uploadHandler = function(req, res, next){
        // postService.connectMongoose();
        uploadService.upload(req.body)
                    .then(post => {
                        // postService.disConnectMongoose();
                        res.status(200).json(post);
                    }).catch(err => {
                        // postService.disConnectMongoose();
                        res.status(500).json({"message": err});
                    });
    };

    return { 
        uploadHandler: this.uploadHandler
     };
}