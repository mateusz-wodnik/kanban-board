import mongoose from 'mongoose';

const database = 'example-backbone'
mongoose.connect(`mongodb://localhost/${database}`);
