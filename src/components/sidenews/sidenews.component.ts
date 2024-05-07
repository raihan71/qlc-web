import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PipesModule } from '../../app/pipes/pipes.module';

@Component({
  selector: 'app-sidenews',
  standalone: true,
  imports: [RouterLink, SidenewsComponent, PipesModule],
  templateUrl: './sidenews.component.html',
})
export class SidenewsComponent {
  @Input() title:string = '';
  @Input() items:Array<any> = [];
  @Input() linkDetail:string = '/news';
}
