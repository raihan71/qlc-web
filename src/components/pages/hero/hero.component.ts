import { Component } from '@angular/core';
import { CarouselComponent } from '../../shared/carousel/carousel.component';
@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CarouselComponent],
  templateUrl: './hero.component.html'
})
export class HeroComponent {
  options:object = {
    loop: false,
    autoplay: false,
    center: true,
    dots: true,
    autoHeight: true,
    autoWidth: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 1,
      },
    },
  };
}
