import { Component } from '@angular/core';
import { FaqComponent } from '../../components';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [FaqComponent],
  templateUrl: './about.component.html'
})
export class AboutComponent {

}
