import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Lane = new Schema({
	name: { type: 'String', required: true },
	notes: [{ type: Schema.ObjectId, ref: 'Note', required: true }],
});

Lane.pre('find', function(next) {
	console.log('find')
	this.populate('notes')
	next()
});

Lane.pre('findOne', function(next) {
	this.populate('notes')
	next()
});

Lane.pre('remove', function(next) {
	this.notes.forEach(note => note.remove())
	next()
});



export default mongoose.model('Lane', Lane);

