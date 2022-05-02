import type express from 'express';
import TaskService from './TaskService';

class TaskController {
  async create(req: express.Request, res: express.Response) {
    try {
      const task = await TaskService.create(req.body);
      res.send(task);
    } catch (e) {
      res.status(400).json(e);
    }
  }

  async getOne(req: express.Request, res: express.Response) {
    try {
      const { id } = req.params;
      const task = await TaskService.getOne(id);
      res.send(task);
    } catch (e) {
      console.log(e);
    }
  }

  async getAll(req: express.Request, res: express.Response) {
    try {
      const tasks = await TaskService.getAll();
      res.send(tasks);
    } catch (e) {
      console.log(e);
    }
  }

  async update(req: express.Request, res: express.Response) {
    try {
      const task = req.body;
      const updatetask = await TaskService.update(task);
      res.send(updatetask);
    } catch (e) {
      console.log(e);
    }
  }

  async delete(req: express.Request, res: express.Response) {
    try {
      const { id } = req.params;
      const deletedTask = await TaskService.delete(id);
      res.send(deletedTask);
    } catch (e) {
      console.log(e);
    }
  }

  async getPage(req: express.Request, res: express.Response) {
    try {
      const page: number = +req.params.page;
      const pageContent = await TaskService.getPage(page);
      res.send(pageContent);
    } catch (e) {
      console.log(e);
    }
  }

  async getNext(req: express.Request, res: express.Response) {
    try {
      const nextTask = await TaskService.getNext(req.params.id);
      res.send(nextTask);
    } catch (e) {
      console.log(e);
    }
  }

  async getPrevious(req: express.Request, res: express.Response) {
    try {
      const previousTask = await TaskService.getPrevious(req.params.id);
      res.send(previousTask);
    } catch (e) {
      console.log(e);
    }
  }
}

export default new TaskController();
