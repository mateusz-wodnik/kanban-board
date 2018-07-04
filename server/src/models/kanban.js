import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Kanban = new Schema({
	name: { type: 'String', required: true },
	lanes: [{ type: Schema.ObjectId, ref: 'Lane', required: true }],
});

Kanban.pre('find', function(next) {
	this.populate('lanes')
	next()
});

Kanban.pre('findOne', function(next) {
	this.populate('lanes')
	next()
});


export default mongoose.model('Kanban', Kanban);
