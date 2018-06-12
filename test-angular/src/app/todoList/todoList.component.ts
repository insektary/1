import { Component } from '@angular/core';

@Component({
  selector: 'app-todolist',
  templateUrl: './todoList.component.html',
  styleUrls: ['./todoList.component.less']
})

export class TodoListComponent {

  list = [
    {
      title: 'title1',
      id: '1',
      completed: true,
      lock: true
    },
    {
      title: 'title2',
      id: '2',
      completed: true,
      lock: true
    },
    {
      title: 'title3',
      id: '3',
      completed: false,
      lock: true
    }
  ];

  generateID() {
    return new Date().getTime().toString().substr(5);
  }

  addTodo(event) {
    console.log(event);
  }

  deleteTodo() {
    console.log('deleted')
  }

  unlockTodo() {

  }

  rewriteTodo() {

  }

  changeStatus() {
    console.log('changed');
  }

  checkAll() {
    console.log('checked');
  }

  changeFilter() {
    console.log('filter');
  }

  clearCompleted() {
    console.log('cleared');
  }
}
