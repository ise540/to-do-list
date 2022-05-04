import Router from 'express';
import TaskController from './TaskController';

const router = Router();

router.post('/create', TaskController.create);
router.get('/task/:id', TaskController.getOne);
router.put('/update', TaskController.update);
router.delete('/task/:id', TaskController.delete);
router.get('/pages', TaskController.getPagedTasks);

export default router;
