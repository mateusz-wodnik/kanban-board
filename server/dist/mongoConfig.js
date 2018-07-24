'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var database = 'kanban';
_mongoose2.default.connect('mongodb://localhost/' + database);
// mongoose.connect(`mongodb://mateusz.wodnik:qwerty14@ds235711.mlab.com:35711/kanban`);