import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Note = new Schema({
	name: { type: 'String', default: 'New note' },
	task: { type: 'String', default: 'New task' },
	priority: { type: 'String', default: 'normal' },
});

export default mongoose.model('Note', Note);
