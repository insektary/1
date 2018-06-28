import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnChanges {
  allIsCompleted: boolean;

  @Input() list;

  @Output() addTodo: EventEmitter<any> = new EventEmitter();
  @Output() checkAll: EventEmitter<any> = new EventEmitter();

  currentValue = '';

  ngOnChanges() {
    this.allIsCompleted = this.list.every(({ completed }) => completed);
  }

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
