// ************ Require's ************
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride =  require('method-override'); // Pasar poder usar los métodos PUT y DELETE

// ************ express() ************
const app = express();

// ************ session() ************
const session = require('express-session');

// ************ Middlewares - (don't touch) ************
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(methodOverride('_method')); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE
app.use(express({secret:'Solo para nuestros ojos'}));


// ************ Template Engine - (don't touch) ************
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// ************ WRITE YOUR CODE FROM HERE ************
// ************ Route System require and use() ************
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const coursesRouter = require('./routes/courses');
const recipesRouter = require('./routes/recipes');

// ************ WRITE API ************
const apiProductsRouter = require('./routes/api/apiProducts')
const apiCoursesRouter = require('./routes/api/apiCourses')
const apiRecipesRouter = require('./routes/api/apiRecipes')
const apiNaranja = require('./request/apiNaranja')

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/courses', coursesRouter);
app.use('/recipes', recipesRouter);
app.use('/api/products', apiProductsRouter);
app.use('/api/courses', apiCoursesRouter);
app.use('/api/recipes', apiRecipesRouter);
app.use('/naranja', apiNaranja);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
