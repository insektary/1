import { EventEmitter } from '@angular/core';

export class ShiftFormService {
  event: EventEmitter<number> = new EventEmitter();

  emitNavChangeEvent(item) {
    this.event.emit(item);
  }

  getNavChangeEmitter() {
    return this.event;
  }

}
