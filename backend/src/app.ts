import createError from "http-errors";
import express, { Request, Response, NextFunction } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";

const indexRouter = require('./routes/index');

const app = express();

// app.use(logger('dev'));
// フロント（localhost:3000）からのアクセス許可
app.use('/', (req, res, next) => {
  res.setHeader(
    'Access-Control-Allow-Origin', 
    'http://localhost:3000'
  );
  res.setHeader(
    'Access-Control-Allow-Methods', 
    'GET, POST, PUT, DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers', 
    'Content-Type, Authorization'
  );
  next();
});

// // エラーハンドリングのテスト
// app.get('/',(req, res) => {
//   throw new Error("test");
// })
app.get('/', (req, res) => res.send('Hello World!'));

// view engine setup
app.set('views', path.join('views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join('public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
// ルーティングで該当先が無かったら、404画面を表示するミドルウェア。
app.use(function(req, res, next) {
  next(createError(404));
});

interface ErrorWithStatus extends Error {
  status: number;
}

// error handler
app.use(function(
  err: ErrorWithStatus,
  req: Request,
  res: Response,
  ) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  req.app.get('env') === 'development' ? console.log(err) : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

