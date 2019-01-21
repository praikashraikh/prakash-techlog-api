/*
* Handler class for token
* v1.0
*  2018-11-1
@C 2018, Prakash Rai
*/

module.exports = function(authService){
    tokenHandler = (req, res, next) => {
      authService.getAuthToken(req.body)
                .then((token) => {
                  res.status(200).json({"token": token});
                }).catch(err => {
                  res.status(500).json({"message": err});
                });
    };

    ensureTokenHandler = (req, res, next) => {
      const bearerHeader = req.headers['authorization'];

      if(bearerHeader) {
        const token = bearerHeader.split(" ")[1];
        req.token = token;
        next();
      } else {
        res.sendStatus(403);
      }
    };

    authorizationHandler = (req, res, next) => {
      authService.verifyAuthToken(req.token, (err, data) => {
        if(err) res.sendStatus(403);
        next();
      });
    };

    return { 
        tokenHandler: this.tokenHandler,
        ensureTokenHandler: this.ensureTokenHandler,
        authorizationHandler: this.authorizationHandler
     };
}