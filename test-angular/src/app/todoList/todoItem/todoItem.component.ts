import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-todoitem',
  templateUrl: './todoItem.component.html',
  styleUrls: ['./todoItem.component.less']
})

export class TodoItemComponent {
  @Input() item;
  @Input() deleteTodo;
  @Input() unlockTodo;
  @Input() rewriteTodo;
  @Input() changeStatus;
}
