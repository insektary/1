import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'filter'
})

export class FilterPipe implements PipeTransform {
  transform(list, chosenFilter) {
    return list.filter((todo) => {
      if (chosenFilter === 'completed' && todo.completed) return true;
      else if (chosenFilter === 'active' && !todo.completed) return true;
      else if (chosenFilter === 'all') return true;
    })
  }
}
