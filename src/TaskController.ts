import Task from './Task';
import TaskService from './TaskService';

class TaskController {
  async create(req: any, res: any) {
    try {
      const task = await TaskService.create(req.body);
      res.send(task);
    } catch (e) {
      res.status(400).json(e);
    }
  }

  async getOne(req: any, res: any) {
    try {
      const { id } = req.params;
      const task = await TaskService.getOne(id);
      res.send(task);
    } catch (e) {
      console.log(e);
    }
  }

  async getAll(req: any, res: any) {
    try {
      const tasks = await TaskService.getAll();
      res.send(tasks);
    } catch (e) {
      console.log(e);
    }
  }

  async update(req: any, res: any) {
    try {
      const task = req.body;
      const updatetask = await TaskService.update(task);
      res.send(updatetask);
    } catch (e) {
      console.log(e);
    }
  }

  async delete(req: any, res: any) {
    try {
      const { id } = req.params;
      const deletedTask = await TaskService.delete(id);
      res.send(deletedTask);
    } catch (e) {
      console.log(e);
    }
  }

  async getPage(req: any, res: any) {
    try {
      const page = req.params.page || 1;
      const pageContent = await TaskService.getPage(page);
      res.send(pageContent);
    } catch (e) {
      console.log(e);
    }
  }

  async getNext(req: any, res: any) {
    try {
      const nextTask = await TaskService.getNext(req.params.id);
      res.send(nextTask);
    } catch (e) {
      console.log(e);
    }
  }

  async getPrevious(req: any, res: any) {
    try {
      const previousTask = await TaskService.getPrevious(req.params.id);
      res.send(previousTask);
    } catch (e) {
      console.log(e);
    }
  }
}

export default new TaskController();
