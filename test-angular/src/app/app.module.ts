import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TodoListComponent } from './todoList/todoList.component';
import { HeaderComponent } from './header/header.component';
import { TodoItemComponent } from './todoItem/todoItem.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from './todoList/filter.pipe';
import {StoreModule} from '@ngrx/store';
import {todoListReducer} from './state-managment/reducers/todo-list.reducer';
import {chosenFilterReducer} from './state-managment/reducers/chosen-filter.reducer';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    HeaderComponent,
    TodoItemComponent,
    FooterComponent,
    FilterPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    StoreModule.forRoot({'todo-list': todoListReducer, 'chosen-filter': chosenFilterReducer})
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
