import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { GalleryComponent } from '../../gallery/gallery.component';
import { ClientComponent } from '../../client/client.component';
import { PhotoComponent } from '../../photo/photo.component';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [
    CarouselModule,
    CommonModule,
    GalleryComponent,
    ClientComponent,
    PhotoComponent,
  ],
  templateUrl: './carousel.component.html',
})
export class CarouselComponent {
  @Input() items: Array<any> = [1, 2, 3, 4, 5, 6];
  @Input() type: number = 0;
  @Input() styles: string = 'h-auto';
  @Input() imgUrl: string = '/assets/img/karyawan-logo.png';
  @Input() customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    center: true,
    dots: false,
    autoHeight: true,
    autoWidth: true,
    responsive: {
      0: {
        items: 2,
      },
      600: {
        items: 4,
      },
      1000: {
        items: 5,
      },
    },
  };
}
