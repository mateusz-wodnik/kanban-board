import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Lane = new Schema({
	name: { type: 'String', default: 'New lane' },
	notes: [{ type: Schema.ObjectId, ref: 'Note', required: true }],
	color: { type: 'String', default: '#ffffff' },
	active: { type: 'Boolean', default: true },
	creationDate: { type: Date, default: Date.now },
	admins: [{ type: Schema.ObjectId, ref: 'User' }],
	users: [{ type: Schema.ObjectId, ref: 'User'}],
});

Lane.pre('findOne', function(next) {
	this.populate('notes');
	next();
});

Lane.pre('remove', function(next) {
	this.model('Kanban').update(
		{lanes: this._id},
		{$pull: { lanes: this._id }},
		err => console.log(err || "Removed Lane id from Kanban lanes arr")
	);
	this.notes.forEach(note => note.remove());
	next();
});



export default mongoose.model('Lane', Lane);

