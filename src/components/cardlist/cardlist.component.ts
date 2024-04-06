import { Component, Input } from '@angular/core';
import { NotfoundComponent } from '../notfound/notfound.component';

@Component({
  selector: 'app-cardlist',
  standalone: true,
  imports: [NotfoundComponent],
  templateUrl: './cardlist.component.html'
})
export class CardlistComponent {
  @Input() ids:string = '';
  @Input() title:string = '';
  @Input() items:Array<any> = [];
}
