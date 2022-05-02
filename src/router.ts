import Router from 'express';
import TaskController from './TaskController'
import Task from './Task'

const router = Router();


router.post('/create', TaskController.create);
router.get('/task/:id', TaskController.getOne);
router.put('/update', TaskController.update);
router.delete('/task/:id', TaskController.delete);

router.get('/all', TaskController.getAll);
router.get('/pages/:page', TaskController.getPage);
router.get('/task/:id/next', TaskController.getNext)
router.get('/task/:id/previous', TaskController.getPrevious)

export default router;