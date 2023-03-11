import Router from '@koa/router';

import TodoController from './controllers/todo';

const router = new Router();

// todo 相关的路由
router.get('/getTodoList', TodoController.listTodo);
router.post('/addTodo', TodoController.addTodo);
router.put('/updateTodo', TodoController.updateTodo);
router.put('/checkAllTodo', TodoController.checkAllTodo);
router.post('/deleteTodo', TodoController.deleteTodo);

export default router;
