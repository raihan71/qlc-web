import { Component } from '@angular/core';
import { DisqusModule } from 'ngx-disqus';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [DisqusModule],
  templateUrl: './detail.component.html'
})
export class DetailComponent {

}
