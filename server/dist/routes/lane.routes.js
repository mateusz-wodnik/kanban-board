'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _lane = require('../controllers/lane.controller');

var LaneController = _interopRequireWildcard(_lane);

var _route = require('../_util/route.middleware');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var router = new _express.Router();

// Get all Posts
router.route('/lanes').get(LaneController.getLanes);

router.route('/lanes').post(LaneController.addLane);

router.route('/lanes/:id').put(LaneController.updateLane);

router.route('/lanes/:id').delete(LaneController.deleteLane);

router.route('/lanes/:id').get(LaneController.getLane);

exports.default = router;