var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/User.js');

var bcrypt = require('bcrypt');

var jwt = require('jwt-simple');

/!* GET ALL USERS *!/
router.get('/', function(req, res, next) {
  User.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/*

/!* GET SINGLE CASINOBOTS BY ID *!/
router.get('/:id', function(req, res, next) {
  CasinoBot.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});*/

/* SAVE USER */
router.post('/', function(req, res, next) {
  var password = req.body.password;
  bcrypt.hash(password, 10, function(err, hash){
    if (err){res.sendStatus(500)}
    else {
      req.body.password = hash;
      User.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
      });
    }
  })
});

/*/!* UPDATE CASINOBOT *!/
router.put('/:id', function(req, res, next) {
  CasinoBot.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});*/



/**
 * При поступлении запроса типа POST эта функция шифрует пароль
 * с помощью bcrypt и сохраняет результат в БД.
 * При любых ошибках выдает статус 500 - Internal Server Error
 * При удаче - возвращает 201
 */
/*router.post('/user', function (req, res, next){
  var user = new User;
  user.username = req.body.username;
  var password = req.body.password;
  bcrypt.hash(password, 10, function(err, hash){
    if (err){res.sendStatus(500)}
    else {
      user.password = hash;
      user.save(function (err) {
        if (err) { res.sendStatus(500)}
        else {
          res.sendStatus(201)
        }
      })
    }
  })
});*/

/**
 * При поступлении запроса типа GET эта функция
 * проверяет наличие заголовка типа x-auth, при его отсутствии
 * возвращает 401 - Unauthorized. При наличии расшифровывает токен,
 * содержащийся в заголовке с помощью jwt,
 * затем ищет пользователя с оным именем в базе данных.
 * При любых ошибках возвращает 500 - Internal Server Error
 * При успехе возвращает JSON объекта user (без пароля, естественно)
 */
/*router.get('/user', function (req, res, next) {
  if(!req.headers['x-auth']) {
    return res.sendStatus(401)
  }
  try {
    var auth = jwt.decode(req.headers['x-auth'], config.secretkey)
  } catch (err) {
    return res.sendStatus(401)
  }
  User.findOne({username: auth.username}, function(err, user) {
    if (err) {return res.sendStatus(500)}
    else {
      res.json(user)
    }
  })
})*/

module.exports = router;
