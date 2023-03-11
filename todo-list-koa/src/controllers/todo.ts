import { Context } from 'koa';
import { getManager } from 'typeorm';
import { Todo } from '../entity/todo';
// import { v4 as uuidv4 } from 'uuid';

export default class TodoController {
  public static async listTodo(ctx: Context) {
    const todoRepository = getManager().getRepository(Todo);
    const todos = await todoRepository.find();
    ctx.status = 200;
    ctx.body = todos;
  }

  public static async addTodo(ctx: Context) {
    const todoRepository = getManager().getRepository(Todo);
    const todo = await todoRepository.save(ctx.request.body);
    ctx.status = 201;
    ctx.body = todo;
  }

  public static async updateTodo(ctx: Context) {
    const todoRepository = getManager().getRepository(Todo);
    await todoRepository.update(ctx.request.body.id,ctx.request.body);
    const updateTodo = await todoRepository.findOne(ctx.request.body.id)
    if(updateTodo){
      ctx.status = 200;
      ctx.body = updateTodo;
    } else {
      ctx.status = 404;
    }
  }

  public static async checkAllTodo(ctx: Context) {
    const todoRepository = getManager().getRepository(Todo);
    let updateTodo = null
    if(ctx.request.body.check){
      updateTodo = await todoRepository.update({ done: false }, { done: true });
    }else{
      updateTodo = await todoRepository.update({ done: true }, { done: false });
    }
    ctx.status = 204;
  }

  public static async deleteTodo(ctx: Context) {
    const todoRepository = getManager().getRepository(Todo);
    console.log('1',ctx.request.body);
    const todos = await todoRepository.delete(ctx.request.body.deleteArr);
    ctx.status = 204;
  }
}
