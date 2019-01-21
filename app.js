/*
* Express app module
* v1.0
*  2018-11-1
@C 2018, Prakash Rai
*/
const PORT = process.env.PORT || 3000;

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const lessMiddleware = require('less-middleware');
const logger = require('morgan');
const mongoose = require('mongoose');
const PostSchema = require('./src/schema/post.schema');

const postService = require('./src/service/post.service')(mongoose, PostSchema);
const postHandler = require('./src/handler/post.handler')(postService);
const authService = require('./src/service/auth.service')();
const authHandler = require('./src/handler/auth.handler')(authService);
const postsRouter = require('./src/api/post.route')(postHandler);
const authRouter = require('./src/api/admin/auth.route')(authHandler);
const postsAdminRouter = require('./src/api/admin/post.admin.route')(postHandler, authHandler);
const errorHandler = require('./src/middleware/error-handler');

const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/post', postsRouter);
app.use('/api/v1/admin/token', authRouter);
app.use('/api/v1/admin/post', postsAdminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(errorHandler);

module.exports = app;
