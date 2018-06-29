import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { EditComponent } from './edit/edit.component';
import { UserCard } from './user-card/user-card.component';
import { ShiftForm } from './shift-form/shift-form.component';
import { NgMaskModule } from '@fagnerlima/ng-mask';
import { FormsModule } from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import {userReducer} from './state-managment/reducers/user.reducer';
import {editModeReducer} from "./state-managment/reducers/edit-mode.reducer";

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
    FormsModule,
    StoreModule.forRoot({'user': userReducer, 'edit-mode': editModeReducer})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
