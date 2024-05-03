import { Component } from '@angular/core';
import { FeatureComponent, CardlistComponent,
  ClientsComponent, FaqComponent
} from '../../components';
import { CarouselComponent } from '../../components/shared/carousel/carousel.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ClientsComponent, FeatureComponent, CardlistComponent,
  FaqComponent, CarouselComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  items:Array<any> = [1,2,3];
  galleryOptions:object = {
    loop: true,
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
    }
  };
  photoOptions:object = {
    loop: true,
    autoplay: true,
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
    }
  }
}
