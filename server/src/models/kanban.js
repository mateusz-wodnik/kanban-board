import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Kanban = new Schema({
	name: { type: 'String', default: 'New board'},
	lanes: [{ type: Schema.ObjectId, ref: 'Lane', required: true }],
	description: { type: 'String', default: '' },
	priority: { type: 'Mixed', default: {} },
	creationDate: { type: Date, default: Date.now },
	admins: [{ type: Schema.ObjectId, ref: 'User' }],
	users: [{ type: Schema.ObjectId, ref: 'User' }]
});


export default mongoose.model('Kanban', Kanban);
