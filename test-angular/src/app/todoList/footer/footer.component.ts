import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.less']
})
export class FooterComponent {
  @Input() listLength;
  @Input() numberOfCompleted;

  @Output() clearCompleted: EventEmitter<any> = new EventEmitter();
  @Output() changeFilter: EventEmitter<any> = new EventEmitter();

  onClearCompleted() {
    this.clearCompleted.emit();
  }

  onChangeFilter($event) {
    this.changeFilter.emit($event);
  }
}
