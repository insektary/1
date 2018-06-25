import {Component} from '@angular/core';
import { MetadataService } from './metadata.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  store: MetadataService;
  editMode = true;

  constructor() {
    this.store = new MetadataService();
  }

  changeMode() {
    this.editMode = true;
  }

  closeEditForm() {
    this.editMode = false;
  }

  submitChanges(localStore) {
    this.store.submitChanges(localStore);

    this.editMode = false;
  }

}
