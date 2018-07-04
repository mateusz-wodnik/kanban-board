import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Note = new Schema({
	name: { type: 'String', required: true },
	task: { type: 'String', required: true },
	importance: { type: 'String', required: true },
});

export default mongoose.model('Note', Note);
