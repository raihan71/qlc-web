import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NotfoundComponent } from '../../notfound/notfound.component';
import { PipesModule } from '../../../app/pipes/pipes.module';

@Component({
  selector: 'app-cardlist',
  standalone: true,
  imports: [NotfoundComponent, RouterLink, PipesModule],
  templateUrl: './cardlist.component.html'
})
export class CardlistComponent {
  @Input() ids:string = '';
  @Input() title:string = '';
  @Input() items:Array<any> = [];
  @Input() hideAllBtn:boolean = false;
}
