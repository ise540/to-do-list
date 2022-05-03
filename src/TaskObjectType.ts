type TaskObject = {
  readonly _id: string;
  number: number;
  title: string;
  description?: string;
  status: boolean;
  neighbors: {
    next?: string;
    prev?: string;
  };
};

export default TaskObject;
