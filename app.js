var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const {decodeToken} = require('./middlewares/auth');
const user = require('./routes/user.route');
const regionIndonesiaProv = require('./routes/provinsi.route');
const regionIndonesiaKota = require('./routes/kota.route');
const bidang = require('./routes/bidang.route');
const dataPegawai = require('./routes/dataPegawai.route');
const sertifikasiPegawai = require('./routes/sertifikasiPegawai.route');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(decodeToken())

app.use('/auth', user);
app.use('/api', regionIndonesiaProv);
app.use('/api', regionIndonesiaKota);
app.use('/api', bidang);
app.use('/api', dataPegawai);
app.use('/api', sertifikasiPegawai);

app.use('/',(req, res) => {
  res.render('index', {
    title: 'Study Case BE'
  })
});

app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;