'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _user = require('../controllers/user.controller');

var UserController = _interopRequireWildcard(_user);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var router = new _express.Router();

// Get all Posts
router.route('/users/register').post(UserController.registerUser);
router.route('/users/login').post(UserController.loginUser);
router.route('/users/logout').get(UserController.logoutUser);
router.route('/users/:userId').delete(UserController.deleteUser);

exports.default = router;