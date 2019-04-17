var express = require("express");
var app = express();
const router = express.Router();
var csv = require('csv-express');
var light = {
  state: false
};

const passport = require("passport");
const bodyParser = require("body-parser");
const session = require("express-session");
const LocalStrategy = require("passport-local").Strategy;
const fs = require("fs");
var flash = require('connect-flash');
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(session({
  secret: "bimat",
  saveUninitialized: true,
  resave: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(process.env.PORT || 80);

var mUser;

passport.use(new LocalStrategy(
  (username, password, done) => {
    mUser = username;
    console.log(username);
    fs.readFile("./userDB.json", (err, data) => {
      const db = JSON.parse(data);
      const userRecord = db.find(user => user.usr == username);
      if (userRecord && userRecord.pwd == password) {
        return done(null, userRecord);
      } else {
        return done(null, false, {
          message: "wrong pw or usr"
        });
      }
    })
  }
))

passport.serializeUser((user, done) => {
  done(null, user.usr)
})

passport.deserializeUser((username, done) => {
  fs.readFile("./userDB.json", (err, data) => {
    const db = JSON.parse(data);
    const userRecord = db.find(user => user.usr == username);
    if (userRecord) {
      return done(null, userRecord);
    } else {
      return done(null, false);
    }
  })
})

var maxt1 = 0;
var mint1 = 0;
var maxh1 = 0;
var minh1 = 0;
var maxp1 = 0;
var minp1 = 0;

var mongoose = require('mongoose');
var mongoDB = 'mongodb://admin123:admin123@ds135433.mlab.com:35433/heroku_k2jw0k2m';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var Schema = mongoose.Schema;
var thSchema = new Schema({
  temp: Number,
  humi: Number,
  ppm: Number,
  date: String,
  time: String
});

var thModel = mongoose.model('th', thSchema);

io.on("connection", function(socket) {
  console.log(socket.id + "da ket noi");
  socket.on("disconnect", function() {
    console.log(socket.id + "da ngat ket noi");
  });
  socket.on("atime", function(data) {
    console.log(data);
  });

//Điều khiển đèn

  socket.on('button', function(button){
    if (button.state) {
      light = {state: "true"};
    }
    if (!button.state) {
      light = {state: "false"};
    }
    socket.emit('light', light);
    io.sockets.emit('light', light);
  });
//   socket.on('toggle', function(state){
//     io.sockets.emit('toggle', state);
// });
//Thêm dữ liệu lên cơ sở dữ liệu
  socket.on("db", function(dbx) {
    console.log(dbx);
    var dateObj = new Date();
    var month = dateObj.getMonth() + 1;
    var day = dateObj.getDate();
    var year = dateObj.getFullYear();
    var m = dateObj.getMinutes();
    var h = dateObj.getHours();
    var s = dateObj.getSeconds();
    var time = h + ":" + m + ":" + s;
    var date = day + "/" + month + "/" + year;
    var newdate = JSON.parse("{\"temp\":" + dbx.temp + ", \"humi\":" + dbx.humi + ", \"ppm\":" + dbx.ppm + ",\"date\":" + "\"" + date + "\", \"time\":\"" + time + "\"}");
    console.log(newdate);
    var newDat = new thModel(newdate);
    newDat.save(function(err) {
      if (err) return handleError(err);
      console.log("them thanh cong");
    });

    thModel.findOne().where({
      date: date
    }).sort({
      "temp": -1
    }).exec(function(err, maxt) {
      if (err) return handleError(err);
      if (maxt != null) maxt1 = JSON.parse(maxt.temp);
    });

    thModel.findOne().where({
      date: date
    }).sort({
      "temp": +1
    }).exec(function(err, mint) {
      if (err) return handleError(err);
      if (mint != null) mint1 = JSON.parse(mint.temp);
    });

    thModel.findOne().where({
      date: date
    }).sort({
      "humi": -1
    }).exec(function(err, maxh) {
      if (err) return handleError(err);
      if (maxh != null) maxh1 = maxh.humi;
    });

    thModel.findOne().where({
      date: date
    }).sort({
      "humi": +1
    }).exec(function(err, minh) {
      if (err) return handleError(err);
      if (minh != null) minh1 = minh.humi;
    });

    thModel.findOne().where({
      date: date
    }).sort({
      "ppm": -1
    }).exec(function(err, maxp) {
      if (err) return handleError(err);
      if (maxp != null) maxp1 = maxp.ppm;
    });

    thModel.findOne().where({
      date: date
    }).sort({
      "ppm": +1
    }).exec(function(err, minp) {
      if (err) return handleError(err);
      if (minp != null) minp1 = minp.ppm;
    });

    var sendcircle = JSON.parse("{\"temp\":" + dbx.temp + ", \"humi\":" + dbx.humi + ",\"ppm\":" + dbx.ppm + ",\"maxt\":" + "\"" + maxt1 + "\", \"mint\":\"" + mint1 + "\"" + ",\"maxh\":" + "\"" + maxh1 + "\", \"minh\":\"" + minh1 + "\",\"maxp\":" + "\"" + maxp1 + "\", \"minp\":\"" + minp1 + "\"}");
    console.log(sendcircle);
    io.sockets.emit("send", sendcircle);
  });
});

app.get('/exporttocsv', function(req, res) {
  var THrecord = mongoose.model('th');
  var filename = "banghi.csv";
  var dataArray;
  THrecord.find().lean().exec({}, function(err, banghi) {
    if (err) res.send(err);
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader("Content-Disposition", 'attachment; filename=' + filename);
    res.csv(banghi, true);
  });
});



app.get('/', authen, function(req, res) {
    res.render("trangchu",{
      username: mUser
    });
});

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('login');
});


app.route("/login",authen)
  .get(function(req, res) {
    if (req.isAuthenticated()) {
      res.redirect('/');
    }
    res.render('login')
  })
  .post(passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
    successFlash: 'lmao'
  }));

function authen(req, res, next) {
  if (req.isAuthenticated()) {
    console.log("isAuthenticated");
    next();
  } else {
    console.log("notAuthenticated");
    res.redirect("/login");
  }
};
