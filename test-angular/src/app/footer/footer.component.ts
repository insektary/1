import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.less']
})
export class FooterComponent implements OnChanges {
  numberOfCompleted: number;

  @Input() list;

  @Output() clearCompleted: EventEmitter<any> = new EventEmitter();
  @Output() changeFilter: EventEmitter<any> = new EventEmitter();

  ngOnChanges() {
    this.numberOfCompleted = this.list.reduce((counter, { completed }) => {
      if (completed) {
        return counter + 1;
      } else {
        return counter;
      }
    }, 0);

  }

  onClearCompleted() {
    this.clearCompleted.emit();
  }

  onChangeFilter($event) {
    this.changeFilter.emit($event);
  }
}
