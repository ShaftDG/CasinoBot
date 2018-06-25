var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var CasinoBot = require('../models/CasinoBot.js');

/* GET ALL CASINOBOTS */
router.get('/', function(req, res, next) {
  CasinoBot.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE CASINOBOTS BY ID */
router.get('/:id', function(req, res, next) {
  CasinoBot.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE CASINOBOT */
router.post('/', function(req, res, next) {
  CasinoBot.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE CASINOBOT */
router.put('/:id', function(req, res, next) {
  CasinoBot.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE CASINOBOT */
router.delete('/:id', function(req, res, next) {
  CasinoBot.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
