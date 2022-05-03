import Task from './Task';
import type TaskObject from './TaskObjectType';

class TaskService {
  async create(task: TaskObject) {
    const lastTask: any = (
      await Task.find({}).sort({ $natural: -1 }).limit(1)
    )[0];
    if (!lastTask) {
      const createdTask = await Task.create(task);
      return createdTask;
    } else {
      task.neighbors.prev = lastTask._id.toString();
      const createdTask = await Task.create(task);
      lastTask.neighbors.next = createdTask._id.toString();
      await this.update(lastTask);

      return createdTask;
    }
  }

  async getOne(id: string) {
    if (!id) throw new Error(`No id provided`);
    const task = await Task.findById(id);
    return task;
  }

  async getAll() {
    const tasks = await Task.find();
    return tasks;
  }

  async update(task: TaskObject) {
    if (!task._id) throw new Error(`No id provided`);

    const updatedTask = await Task.findByIdAndUpdate(task._id, task, {
      new: true
    });
    return updatedTask;
  }

  async delete(id: string) {
    if (!id) throw new Error(`No id provided`);
    const deletedTask = await Task.findByIdAndDelete(id);
    return deletedTask;
  }

  async getPage(page: number, limit: number) {
    if (isNaN(page) || page < 1 || isNaN(limit) || limit < 1)
      return { error: 'page and limit must be positive numbers' };
    const pageContent = await Task.find()
      .skip((page - 1) * limit)
      .limit(limit);
    const collection = await this.getAll();
    const collectionLength = collection.length;
    return { collectionLength, pageContent };
  }

  async getNext(id: string) {
    const currentTask = await Task.findById(id);
    const nextTask = await Task.findById(currentTask.neighbors.next);

    return nextTask;
  }

  async getPrevious(id: string) {
    const currentTask = await Task.findById(id);
    const previousTask = await Task.findById(currentTask.neighbors.prev);

    return previousTask;
  }
}

export default new TaskService();
