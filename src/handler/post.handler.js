/*
* Handler class for post
* v1.0
*  2018-11-1
@C 2018, Prakash Rai
*/

module.exports = function(postService){
    readHandler = function(req, res, next){
        postService.connectMongoose();
        postService.readPosts(req.query)
                .then((posts) => {
                  postService.disConnectMongoose();
                  const resObj = {
                      "data": posts[0],
                      "meta": {
                          "totalCount": posts[1]
                      }
                  };
                  res.status(200).json(resObj);
                }).catch(err => {
                  postService.disConnectMongoose();
                  res.status(500).json({"message": err});
                });
    };

    readByIdHandler = function(req, res, next){
        postService.connectMongoose();
        postService.readPostById(req.param('id'))
                    .then(post => {
                        postService.disConnectMongoose();
                        res.status(200).json(post);
                    }).catch(err => {
                        postService.disConnectMongoose();
                        res.status(500).json({"message": err});
                    });
    };

    createHandler = function(req, res, next){
        postService.createPost(req.body)
                    .then(post => {
                        postService.disConnectMongoose();
                        res.status(200).json(post);
                    }).catch(err => {
                        postService.disConnectMongoose();
                        res.status(500).json({"message": err});
                    });
    };

    updateHandler = function(req, res, next){
        postService.updatePost(req.param('id'), req.body)
                    .then(post => {
                        postService.disConnectMongoose();
                        res.status(200).json(post);
                    }).catch(err => {
                        postService.disConnectMongoose();
                        res.status(500).json({"message": err});
                    });
    };

    deleteHandler = function(req, res, next){
        postService.deletePost(req.param('id'))
                    .then(msg => {
                        postService.disConnectMongoose();
                        res.status(200).json(post);
                    }).catch(err => {
                        postService.disConnectMongoose();
                        res.status(500).json({"message": err});
                    });
    };

    return { 
        readByIdHandler: this.readByIdHandler, 
        readHandler: this.readHandler, 
        createHandler: this.createHandler,
        updateHandler: this.updateHandler,
        deleteHandler: this.deleteHandler
     };
}