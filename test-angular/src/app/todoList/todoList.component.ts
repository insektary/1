import { Component } from '@angular/core';
import { Todo } from './todo.module';

@Component({
  selector: 'app-todolist',
  templateUrl: './todoList.component.html',
  styleUrls: ['./todoList.component.less']
})

export class TodoListComponent {
  list: Todo[] = [];
  chosenFilter: string = 'all';
  inputValue: string = '';
  numberOfCompleted: number = 0;

  constructor() {
    this.clearCompleted = this.clearCompleted.bind(this);
    this.changeFilter = this.changeFilter.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
    this.rewriteTodo = this.rewriteTodo.bind(this);
    this.unlockTodo = this.unlockTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.checkAll = this.checkAll.bind(this);
    this.addTodo = this.addTodo.bind(this);
  }

  generateID(): string {
    return new Date().getTime().toString().substr(5);
  }

  addTodo({ key, target: { value }}) {
    if (key === 'Enter' && value.trim()) {
      this.list = [{
        title: value,
        id: this.generateID(),
        completed: false,
        lock: true
        }, ...this.list];

      this.inputValue = '';
    } else {
      this.inputValue = value;
    }
  }

  deleteTodo({ target: { parentNode: { id }}}) {
    this.numberOfCompleted = (this.list.find((todo) => todo.id === id)).completed ?
      this.numberOfCompleted - 1 : this.numberOfCompleted;

    this.list = this.list.filter((todo) => todo.id !== id);
  }

  unlockTodo({ target: { parentNode: { id }}}) {
    this.list = this.list.map((todo) => {
      if (todo.id === id) {
        todo.lock = false;
      }

      return todo;
    })

  }

  rewriteTodo({ type, key, target: { value, parentNode: { id }}}) {
    if (type === 'keypress' && key !== 'Enter') return;

    this.list = this.list.map((todo) => {
      if (todo.id === id) {
        todo.title = value;
        todo.lock = true;
      }

      return todo;
    })
  }

  changeStatus({ target: { parentNode: { id }}}) {
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

  changeFilter({ target: { id }}) {
    this.chosenFilter = id;
  }

  clearCompleted() {
    this.list = this.list.filter((todo) => !todo.completed);

    this.numberOfCompleted = 0;
  }
}
