'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _kanban = require('../controllers/kanban.controller');

var KanbanController = _interopRequireWildcard(_kanban);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var router = new _express.Router();

// Get all Posts
router.route('/kanbans').get(KanbanController.getKanbans);

router.route('/kanbans').post(KanbanController.addKanban);

router.route('/kanbans/:id').put(KanbanController.updateKanban);

router.route('/kanbans/:id').delete(KanbanController.deleteKanban);

router.route('/kanbans/:id').get(KanbanController.getKanban);

exports.default = router;