import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [],
  templateUrl: './client.component.html',
  styles: [
    `.image-container {
      width: 100px;
      height: auto;
    }
    .image-container img {
      width: 100%;
      height: auto;
    }`
  ]
})
export class ClientComponent {
  @Input() img: string = 'https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png';
  @Input() title: string = 'github';
}
