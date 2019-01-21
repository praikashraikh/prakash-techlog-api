/*
* Service class for Auth
* params: mongoDb connection url
* v1.0
*  2018-11-1
@C 2018, Prakash Rai
*/
const config = require('../config/app.config');
const jwt = require('jsonwebtoken');

module.exports = function() {
    class AuthService {
        getAuthToken(query) {
            const username = config.login.username;
            const password = config.login.password;
            let token = "NOT_VALID";

            if(query.username === username && query.password === password) {
                token = jwt.sign(query, config.login.private_key);
            } 

            this.verifyAuthToken(token);

            return new Promise((resolve, reject) => {
                resolve(token);
            });
        }

        verifyAuthToken(token, callback){
            jwt.verify(token, config.login.private_key, {}, callback);
        }

    }

    return new AuthService();
}