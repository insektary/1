import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { EditComponent } from './edit/edit.component';
import { MetadataService } from './metadata.service';
import { UserCard } from './user-card/user-card.component';
import { ShiftForm } from './shift-form/shift-form.component';
import { NgMaskModule } from '@fagnerlima/ng-mask';
import { FormsModule } from '@angular/forms';
import {ShiftFormService} from './shift-form/shift-form.service';

@NgModule({
  declarations: [
    AppComponent,
    EditComponent,
    UserCard,
    ShiftForm
  ],
  imports: [
    BrowserModule,
    NgMaskModule,
    FormsModule
  ],
  providers: [MetadataService, ShiftFormService],
  bootstrap: [AppComponent]
})
export class AppModule { }
