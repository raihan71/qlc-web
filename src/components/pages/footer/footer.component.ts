import { Component, Input } from '@angular/core';
import { aboutMe } from './../../../app/models/aboutMe';
import { PipesModule } from '../../../app/pipes/pipes.module';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [PipesModule],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  year: Date = new Date();
  @Input() about: aboutMe = {};
  @Input() socials: Array<any> = [];
  waMe:string = '//api.whatsapp.com/send?phone=';

}
