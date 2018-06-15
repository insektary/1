import { Todo } from './todo.model';
import { NgModule } from "@angular/core";

@NgModule()
export class TodoList {
  list: Todo[];
  chosenFilter: string;
  numberOfCompleted: number;

  constructor() {
    this.list = [];
    this.chosenFilter = 'all';
    this.numberOfCompleted = 0;
  }

  addTodo(value) {
    this.list = [new Todo(value), ...this.list];
  }

  deleteTodo(id) {
    this.numberOfCompleted = (this.list.find((todo) => todo.id === id)).completed ?
      this.numberOfCompleted - 1 : this.numberOfCompleted;

    this.list = this.list.filter((todo) => todo.id !== id);
  }

  unlockTodo(id) {
    this.list = this.list.map((todo) => {
      if (todo.id === id) {
        todo.lock = false;
      }

      return todo;
    })

  }

  rewriteTodo(id, value) {
    this.list = this.list.map((todo) => {
      if (todo.id === id) {
        todo.title = value;
        todo.lock = true;
      }

      return todo;
    })
  }

  changeStatus(id) {
    this.list = this.list.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;

        this.numberOfCompleted = (todo.completed ? this.numberOfCompleted + 1 : this.numberOfCompleted - 1);
      }

      return todo;
    })
  }

  checkAll() {
    if (!this.list.length) return;

    const everyIsCompleted = (this.numberOfCompleted === this.list.length);

    this.list = this.list.map((todo) => {
      todo.completed = !everyIsCompleted;

      return todo;
    });

    this.numberOfCompleted = (everyIsCompleted ? 0 : this.list.length);

  }

  changeFilter(id) {
    this.chosenFilter = id;
  }

  clearCompleted() {
    this.list = this.list.filter((todo) => !todo.completed);

    this.numberOfCompleted = 0;
  }

}
