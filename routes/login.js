// импортируем роутер
var router = require('express').Router();

// импортируем bcrypt,
// здесь он нужен для сверки пароля с хешем из БД
var bcrypt = require('bcrypt');

// импортируем jwt чтобы создавать web-token'ы
// для последующей отправки пользователю
var jwt = require('jwt-simple');

// импортируем файл конфигурации
var config = require('../config');

// импортируем модельку user
var User = require('./models/user');

/**
 * Этот модуль имеет единственный метод.
 * При получении запроса типа POST, в котором содержится логин и пароль,
 * эта функция ищет в БД пользователя с таким username,
 * получает хеш его пароля и сверяет с помощью bcrypt с полученным
 * в запросе паролем. При ошибках обработки возвращает статус 500.
 * При неправильных данных - 401 - Unauthorized.
 * При успехе возвращает токен.
 */

router.post ('/login', function(req, res, next){
  if (!req.body.username || !req.body.password) {
    // если один или оба параметра запроса опущены,
    // возвращаем 400 - Bad Request
    return res.sendStatus(400)
  } else {
    var username = req.body.username;
    var password = req.body.password;
    User.findOne({username: username})
    // указываем явно, что нам нужно значение поля password
    // (ибо его выборка отключена в модели)
      .select('password')
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
          res.send(token)
        })
      })
  }
});

module.exports = router;
