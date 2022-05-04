import type express from 'express';
import TaskService from './TaskService';
class TaskController {
  async create(req: express.Request, res: express.Response) {
    try {
      const task = await TaskService.create(req.body);
      console.log(task);
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

  async getPagedTasks(req: express.Request, res: express.Response) {
    try {
      console.log(req.query);
      if (!req.query.page && !req.query.limit) {
        console.log('all');
        const tasks = await TaskService.getAll();
        res.send(tasks);
      } else {
        let page: number = 1;

        if (!isNaN(Number(req.query.page))) {
          page = Number(req.query.page);
        }

        let limit: number = 10;

        if (!isNaN(Number(req.query.limit))) {
          limit = Number(req.query.limit);
        }

        const { collectionCount, pageContent } = await TaskService.getPage(
          page,
          limit
        );
        res
          .header('X-Total-Count', collectionCount?.toString())
          .send(pageContent);
      }
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
}

export default new TaskController();
