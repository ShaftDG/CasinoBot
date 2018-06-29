var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/User.js');

var bcrypt = require('bcrypt');

var jwt = require('jwt-simple');

var config = require('../config');
/**
 * Этот модуль имеет единственный метод. При получении запроса типа POST, в котором содержится логин и пароль,
 * эта функция ищет в БД пользователя с таким username, получает хеш его пароля и сверяет с помощью bcrypt с полученным
 * в запросе паролем. При ошибках обработки возвращает статус 500. При неправильных данных - 401 - Unauthorized.
 * При успехе возвращает токен.
 */

router.post ('/', function(req, res, next){
  // console.log(req.body);
    if (!req.body.username || !req.body.password) {
        return res.sendStatus(400) // если один или оба параметра запроса опущены, возвращаем 400 - Bad Request
    } else {
        var username = req.body.username
        var password = req.body.password
        User.findOne({username: username})
        .select('password') // указываем явно, что нам нужно значение поля password (ибо его выборка отключена в модели)
        .exec(function(err, user){
            if (err) {
                return res.sendStatus(500)
            }
            if (!user) {return res.sendStatus(401)}
            bcrypt.compare(password, user.password, function(err, valid){
                if (err) {
                    return res.sendStatus(500)
                }
                if (!valid){ return res.sendStatus(401)}
                var token = jwt.encode({username: username}, config.secretkey);


              let body = {
                token: token
              };
              //res.json(body);
                res.send(body)
            })
        })
    }
});

module.exports = router;
