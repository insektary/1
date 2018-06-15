import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-todoitem',
  templateUrl: './todoItem.component.html',
  styleUrls: ['./todoItem.component.less']
})

export class TodoItemComponent {
  @Input() item;

  @Output() deleteTodo: EventEmitter<any> = new EventEmitter();
  @Output() unlockTodo: EventEmitter<any> = new EventEmitter();
  @Output() rewriteTodo: EventEmitter<any> = new EventEmitter();
  @Output() changeStatus: EventEmitter<any> = new EventEmitter();

  onDeleteTodo() {
    this.deleteTodo.emit(this.item);
  }

  onUnlockTodo() {
    this.unlockTodo.emit(this.item);
  }

  onRewriteTodo() {
    this.rewriteTodo.emit(this.item);
  }

  onChangeStatus() {
    this.changeStatus.emit(this.item);
  }
}
