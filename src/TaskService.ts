import Task from './Task';
import type TaskObject from './TaskInterface';

class TaskService {
  async create(task: TaskObject) {
    const createdTask = await Task.create(task);
    return createdTask;
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

  async getPage(page: number) {
    if (isNaN(page) || page<1)
        return { error: 'page must be a positive number' };
    const pageContent = await Task.find()
      .skip((page - 1) * 5)
      .limit(5);
    return pageContent;
  }

  async getNext(id: string) {
    const taskList = await Task.find();
    const taskIndex = taskList.findIndex((item) => item._id == id);
    return taskList[taskIndex + 1];
  }

  async getPrevious(id: string) {
    const taskList = await Task.find();
    const taskIndex = taskList.findIndex((item) => item._id == id);
    return taskList[taskIndex - 1];
  }
}

export default new TaskService();
