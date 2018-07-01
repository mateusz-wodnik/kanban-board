'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _example = require('../controllers/example.controller');

var ExampleController = _interopRequireWildcard(_example);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var router = new _express.Router();

// Get all Posts
router.route('/examples').get(ExampleController.getExamples);

router.route('/examples').post(ExampleController.addExample);

router.route('/examples/:id').put(ExampleController.updateExample);

router.route('/examples/:id').delete(ExampleController.deleteExample);

router.route('/examples/:id').get(ExampleController.getExample);

exports.default = router;