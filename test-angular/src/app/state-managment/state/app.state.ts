import {TodoList} from './todo-list.state';
import {ChosenFilter} from './chosen-filter.state';

export interface AppState {
  todoList: TodoList;
  chosenFilter: ChosenFilter;
}
