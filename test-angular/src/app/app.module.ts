import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TodoListComponent } from './todoList/todoList.component';
import { HeaderComponent } from './todoList/header/header.component';
import { TodoItemComponent } from "./todoList/todoItem/todoItem.component";
import { FooterComponent } from "./todoList/footer/footer.component";

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    HeaderComponent,
    TodoItemComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
