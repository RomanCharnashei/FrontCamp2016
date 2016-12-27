var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var passport = require('passport');
var AuthVKStrategy = require('passport-vkontakte').Strategy;
var methodOverride = require('method-override');
var config = require('./config');

// Models
var User = require("./models/user");
var Article = require("./models/article");

require('./middlewares/auth')(passport, AuthVKStrategy, User);

var handlebars = require('express-handlebars').create({ 
  defaultLayout: 'main',
  helpers : {
    entityiseq: function(f_entity, s_entity, options) {
      if(f_entity.equals(s_entity)) {
        return options.fn(this);
      } else {
        return options.inverse(this);
      }
    }
  }
 });

var app = express();

var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } } };
mongoose.Promise = global.Promise;

// mongoose.set('debug', true);


mongoose.connect(config.MONGO_CONN, { 
  server: { 
    socketOptions: { 
      keepAlive: 300000, 
      connectTimeoutMS: 30000 
    } 
  } 
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(session({
  secret:'keyboard cat',
  cookie: { maxAge: 604800000 },
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('./middlewares/init'));
app.use(require('./middlewares/user_profile'));
app.use(require('./middlewares/check_json'));

app.use('/', require('./routes/index')(Article));
app.use('/article', require('./routes/article')(Article));
app.use('/articles', require('./routes/articles')(Article));
app.use('/auth', require('./routes/auth')(passport));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  if(err.status !== 404) console.error(err);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
