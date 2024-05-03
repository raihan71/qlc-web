import { Component } from '@angular/core';
import { NotfoundComponent } from '../../components/notfound/notfound.component';

@Component({
  selector: 'app-404',
  standalone: true,
  imports: [NotfoundComponent],
  templateUrl: './404.component.html',
})
export class NotFound404Component {

}
