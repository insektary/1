import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.less']
})
export class FooterComponent {
  @Input() changeFilter;
  @Input() clearCompleted;
  @Input() listLength;
  @Input() numberOfCompleted;
  @Input() chosenFilter;
}
