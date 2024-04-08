import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-photo',
  standalone: true,
  imports: [],
  templateUrl: './photo.component.html'
})
export class PhotoComponent {
  @Input() styles:string = 'h-auto';
  @Input() imgUrl:string = '/assets/img/karyawan-logo.png';
}
