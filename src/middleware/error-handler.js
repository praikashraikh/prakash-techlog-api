/*
* Error handler class
* v1.0
*  2018-11-1
@C 2018, Prakash Rai
*/

module.exports = function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500).send(err);
  };