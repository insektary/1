import {Component, DoCheck} from '@angular/core';
import { MetadataService } from "./metadata.service";
import { ShiftFormService } from "./shift-form/shift-form.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements DoCheck {
  store: MetadataService;
  editMode: boolean = true;
  subscription: any;

  constructor(private shiftFormService: ShiftFormService) {
    this.store = new MetadataService();
    this.subscription = this.shiftFormService.getNavChangeEmitter()
      .subscribe(item => this.deleteShift(item));
  }

  changeMode() {
    this.editMode = true;
  }

  closeEditForm() {
    this.editMode = false;
  }

  addShift() {
    this.store.addShift();
  }

  deleteShift(item) {
    this.store.deleteShift(item);
  }

  ngDoCheck() {
    this.store.checkCrossValid();
  }

}
