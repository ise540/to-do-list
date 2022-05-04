import Task from './Task';
import type { ITask } from './Task';

class TaskService {
  async create(task: ITask) {
    const lastTask: ITask = (
      await Task.find({}).sort({ $natural: -1 }).limit(1)
    )[0];
    if (!lastTask) {
      const createdTask = await Task.create(task);
      return createdTask;
    } else {
      task.neighbors.prev = lastTask._id;
      const createdTask = await Task.create(task);
      lastTask.neighbors.next = createdTask._id;
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

  async update(task: Partial<ITask>) {
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
    if (page < 1 || limit < 1)
      return { error: 'page and limit must be positive numbers' };
    const pageContent = await Task.find()
      .skip((page - 1) * limit)
      .limit(limit);
    const collectionCount = await Task.count();
    return { collectionCount, pageContent };
  }
}

export default new TaskService();
