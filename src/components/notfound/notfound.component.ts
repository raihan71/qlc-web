import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-notfound',
  standalone: true,
  imports: [],
  templateUrl: './notfound.component.html',
})
export class NotfoundComponent {
  @Input() title:string = 'No vendor data available.';
  @Input() message:string = 'You can add new vendor data to display in this table.';
}
