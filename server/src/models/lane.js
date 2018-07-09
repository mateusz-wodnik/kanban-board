import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Lane = new Schema({
	name: { type: 'String', default: 'New lane' },
	notes: [{ type: Schema.ObjectId, ref: 'Note', required: true }],
	color: { type: 'String', default: '#ffffff' },
	active: { type: 'Boolean', default: true },
	creationDate: { type: Date, default: Date.now }
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

