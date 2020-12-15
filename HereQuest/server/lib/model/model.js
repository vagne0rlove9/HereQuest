'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var QuestSchema = new _mongoose.Schema({
    title: String,
    time: String,
    rating: Number,
    description: String,
    city: String,
    img: String
});

var Quest = _mongoose2.default.model('Quest', QuestSchema);

exports.default = Quest;