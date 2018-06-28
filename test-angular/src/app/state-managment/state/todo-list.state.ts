export class Todo {
  public title: string;
  public id: string;
  public lock: boolean;
  public completed: boolean;

  private generateID(): string {
    return new Date().getTime().toString().substr(5);
  }

  constructor(
    title: string
  ) {
    this.title = title.trim();
    this.id = this.generateID();
    this.lock = true;
    this.completed = false;
  }
}

export interface TodoList {
  todoList: ReadonlyArray<Todo>;
}

export const initialTodoListState: TodoList = {
  todoList: [],
};
