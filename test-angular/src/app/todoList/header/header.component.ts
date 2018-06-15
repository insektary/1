import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent {
  @Input() numberOfCompleted;
  @Input() list;

  @Output() addTodo: EventEmitter<any> = new EventEmitter();
  @Output() checkAll: EventEmitter<any> = new EventEmitter();

  currentValue: string = '';

  onAddTodo() {
    if (this.currentValue.trim()) {
      this.addTodo.emit(this.currentValue);

      this.currentValue = '';
    }
  }

  onCheckAll() {
    this.checkAll.emit();
  }
}
