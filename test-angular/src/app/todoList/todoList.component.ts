import { Component } from '@angular/core';
import { TodoList } from "../app.model";

@Component({
  selector: 'app-todolist',
  templateUrl: './todoList.component.html',
  styleUrls: ['./todoList.component.less']
})
export class TodoListComponent {
  store: TodoList;

  constructor(todoList: TodoList) {
    this.store = todoList;
  }

  addTodo(value) {
    this.store.addTodo(value);
  }

  deleteTodo({ id }) {
    this.store.deleteTodo(id);
  }

  unlockTodo({ id }) {
    this.store.unlockTodo(id);
  }

  rewriteTodo({ id, title }) {
    this.store.rewriteTodo(id, title);
  }

  changeStatus({ id }) {
    this.store.changeStatus(id);
  }

  checkAll() {
    this.store.checkAll();
  }

  changeFilter({ target: { id }}) {
    this.store.changeFilter(id);
  }

  clearCompleted() {
    this.store.clearCompleted();
  }

}
