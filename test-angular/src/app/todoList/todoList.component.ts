import { Component } from '@angular/core';
import { TodoList } from "../app.model";

@Component({
  selector: 'app-todolist',
  templateUrl: './todoList.component.html',
  styleUrls: ['./todoList.component.less']
})
export class TodoListComponent {
  store: TodoList;
  inputValue: string;

  constructor(todoList: TodoList) {
    this.store = todoList;
    this.inputValue = '';

    this.clearCompleted = this.clearCompleted.bind(this);
    this.changeFilter = this.changeFilter.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
    this.rewriteTodo = this.rewriteTodo.bind(this);
    this.unlockTodo = this.unlockTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.checkAll = this.checkAll.bind(this);
    this.addTodo = this.addTodo.bind(this);
  }

  addTodo() {
    this.store.addTodo(this.inputValue);

    this.inputValue = '';
  }

  deleteTodo({ target: { parentNode: { id }}}) {
    this.store.deleteTodo(id);
  }

  unlockTodo({ target: { parentNode: { id }}}) {
    this.store.unlockTodo(id);
  }

  rewriteTodo({ type, key, target: { value, parentNode: { id }}}) {
    if (type === 'keypress' && key !== 'Enter') return;

    this.store.rewriteTodo(id, value);
  }

  changeStatus({ target: { parentNode: { id }}}) {
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
