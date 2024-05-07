import { Component, Input } from '@angular/core';
import { CarouselComponent } from '../../shared/carousel/carousel.component';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CarouselComponent],
  templateUrl: './clients.component.html',
})
export class ClientsComponent {
  @Input() items:Array<any> = [];
}
