export class Todo {
  constructor(
    public title: string,
    public id: string,
    public lock: boolean = true,
    public completed: boolean = false
  ) {}
}
