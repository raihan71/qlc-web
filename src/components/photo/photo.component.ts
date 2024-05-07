import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-photo',
  standalone: true,
  imports: [],
  templateUrl: './photo.component.html'
})
export class PhotoComponent {
  @Input() styles:string = 'h-auto';
  @Input() img:string = '/assets/img/karyawan-logo.png';
  @Input() title:string = 'karyawan-mengaji';
}
