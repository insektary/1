import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TodoListComponent } from './todoList/todoList.component';
import { HeaderComponent } from './todoList/header/header.component';
import { TodoItemComponent } from "./todoList/todoItem/todoItem.component";
import { FooterComponent } from "./todoList/footer/footer.component";
import { FormsModule } from "@angular/forms";
import { FilterPipe } from "./todoList/filter.pipe";
import { TodoList } from "./app.model";
import { Todo } from "./todo.model";

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
    FormsModule
  ],
  providers: [TodoList, Todo],
  bootstrap: [AppComponent]
})

export class AppModule { }
