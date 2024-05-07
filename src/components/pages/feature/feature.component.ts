import { Component, Input } from '@angular/core';
import { PipesModule } from '../../../app/pipes/pipes.module';

@Component({
  selector: 'app-feature',
  standalone: true,
  imports: [PipesModule],
  templateUrl: './feature.component.html',
  styles: []
})
export class FeatureComponent {
  @Input() items:Array<any> = [];
  @Input() title:string = '';
  @Input() desc:string = '';
}
