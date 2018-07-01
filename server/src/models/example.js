import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Example = new Schema({
	name: { type: 'String', required: true },
});

export default mongoose.model('Example', Example);
