//import mongoose from 'mongoose';
import mongoose from 'mongoose';

export interface ITask {
  _id: mongoose.Types.ObjectId;
  number: number;
  title: string;
  description?: string;
  isDone: boolean;
  neighbors: {
    next?: mongoose.Types.ObjectId;
    prev?: mongoose.Types.ObjectId;
  };
}

const Task = new mongoose.Schema<ITask>({
  number: { type: 'number', required: true },
  title: { type: 'string', required: true },
  description: { type: 'string', required: false },
  isDone: { type: 'boolean', required: true },
  neighbors: {
    next: { type: mongoose.Types.ObjectId, required: false },
    prev: { type: mongoose.Types.ObjectId, required: false }
  }
});

export default mongoose.model('Task', Task);
