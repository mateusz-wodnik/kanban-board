import mongoose from 'mongoose';

const database = 'kanban';
mongoose.connect(`mongodb://localhost/${database}`);
