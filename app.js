var createError  = require('http-errors');
var express      = require('express');
var session      = require('express-session')
var path         = require('path');
var cookieParser = require('cookie-parser');
var logger       = require('morgan');
var exphbs       = require('express-handlebars');
var passport     = require('passport')
var flash        = require('connect-flash');

var app = express();

// disable etag for better ajay-behavior
app.disable('etag');
app.enable('trust proxy');

// passport setup
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    proxy: true,
    cookie: { secure: true }
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
  extname: '.hbs',
  defaultLayout: 'layout',
  helpers: require("./helpers/handlebars"),
  partialsDir: 'views/partials'
}));
app.set('view engine', '.hbs');

app.use(logger('common'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/dbdesign', express.static(__dirname + 'public/dbdesign'));

// Models and Relations
var models = require("./models");
models.nodetype.belongsToMany(models.edgetype, {through: models.node2edge});
models.edgetype.belongsToMany(models.nodetype, {through: models.edge2node});

// Routes
var authRoute = require('./routes/auth.js')(app, passport, models.nodes, models.nodetype, models.edges, models.edgetype);
var userRoute = require('./routes/users.js')(app, models.user);
var nodesRoute = require('./routes/nodes')(app, models.nodes, models.nodetype);
var nodetypesRoute = require('./routes/nodetypes')(app, models.nodetype);
var node2edgeRoute = require('./routes/node2edge')(app, models.node2edge, models.nodetype, models.edgetype);
var edgesRoute = require('./routes/edges')(app, models.edges, models.node2edge, models.edgetype, models.nodes, models.nodetype);
var edgetypesRoute = require('./routes/edgetypes')(app, models.edgetype);
var edge2nodeRoute = require('./routes/edge2node')(app, models.edge2node, models.nodetype, models.edgetype);
var downloadRoute = require('./routes/download')(app, models.nodes, models.nodetype, models.node2edge, models.edges, models.edgetype, models.edge2node);
var graphRoute = require('./routes/graph')(app);
var graph2dRoute = require('./routes/graph2d')(app);
var graph3dRoute = require('./routes/graph3d')(app);
var graphModelRoute = require('./routes/graphmodel')(app);
var selectRoute = require('./routes/select')(app, models.nodes, models.node2edge, models.edgetype, models.edge2node, models.nodetype);

//load passport strategies
require('./helpers/passport.js')(passport, models.user);

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
