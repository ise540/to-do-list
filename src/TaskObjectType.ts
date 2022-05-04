import type mongoose from 'mongoose';

type TaskObject = {
  readonly _id: string;
  number: number;
  title: string;
  description?: string;
  isDone: boolean;
  neighbors: {
    next?: mongoose.Types.ObjectId;
    prev?: mongoose.Types.ObjectId;
  };
};

export default TaskObject;
