'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _model = require('./model/model');

var _model2 = _interopRequireDefault(_model);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

var cors = require('cors');

_mongoose2.default.connect('mongodb://localhost/quests');

app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());
app.use(cors());

app.post('/quests', function (req, res) {
    var data = req.body;
    var quest = new _model2.default({
        title: data.title,
        time: data.time,
        rating: data.rating,
        description: data.description,
        city: data.city,
        img: data.img
    });

    quest.save().then(function () {
        res.send({ status: 'ok' });
    });
});

app.get('/quests', function (req, res) {
    _model2.default.find().then(function (err, quests) {
        if (err) {
            return res.send(err);
        }
        res.json(quests);
    });
});

app.get('/quests/:id', function (req, res) {
    _model2.default.findById(req.params.id).then(function (err, quest) {
        if (err) {
            return res.send(err);
        }
        res.json(quest);
    });
});

app.delete('/quests/:id', function (req, res) {
    _model2.default.remove({
        _id: req.params.id
    }).then(function (quest) {
        if (quest) {
            res.json({ status: 'deleted' });
        } else {
            res.json({ status: 'error' });
        }
    });
});

app.put('/quests/:id', function (req, res) {
    _model2.default.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err) {
        if (err) {
            return res.send(err);
        }

        res.json({ status: 'updated' });
    });
});

app.listen(3333, function () {
    console.log('start server');
});