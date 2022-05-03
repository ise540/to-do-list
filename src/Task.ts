import mongoose from 'mongoose';

const Task = new mongoose.Schema({
  number: { type: 'number', required: true },
  title: { type: 'string', required: true },
  description: { type: 'string', required: false },
  status: { type: 'boolean', required: true },
  neighbors: {
    next: { type: 'string', required: false },
    prev: { type: 'string', required: false }
  }
});

export default mongoose.model('Task', Task);
