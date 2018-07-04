'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _note = require('../controllers/note.controller');

var NoteController = _interopRequireWildcard(_note);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var router = new _express.Router();

// Get all Posts
router.route('/notes').get(NoteController.getNotes);

router.route('/notes').post(NoteController.addNote);

router.route('/notes/:id').put(NoteController.updateNote);

router.route('/notes/:id').delete(NoteController.deleteNote);

router.route('/notes/:id').get(NoteController.getNote);

exports.default = router;